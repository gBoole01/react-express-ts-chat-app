import { FormEvent, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'

type NewConversationModalProps = {
  closeModal: () => void
}

export function NewConversationModal({
  closeModal,
}: NewConversationModalProps) {
  const { createConversation } = useConversations()
  const { contacts } = useContacts()
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    createConversation(selectedContactIds)
    closeModal()
  }

  function handleCheckboxChange(contactId: string) {
    setSelectedContactIds((prevSelectedContactsIds) => {
      if (prevSelectedContactsIds.includes(contactId)) {
        return prevSelectedContactsIds.filter((prevId) => {
          return contactId !== prevId
        })
      } else {
        return [...prevSelectedContactsIds, contactId]
      }
    })
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
