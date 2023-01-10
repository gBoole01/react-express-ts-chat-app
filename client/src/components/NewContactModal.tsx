import { FormEvent, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'

type NewContactModalProps = {
  closeModal: () => void
}

export function NewContactModal({ closeModal }: NewContactModalProps) {
  const idRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const { createContact } = useContacts()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    createContact(idRef.current!.value, nameRef.current!.value)
    closeModal()
  }

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
