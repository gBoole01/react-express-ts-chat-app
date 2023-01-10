import { createContext, ReactNode, useContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Contact, useContacts } from './ContactsProvider'

type ConversationsProviderProps = {
  id: string
  children: ReactNode
}

type Conversation = {
  recipients: string[]
  messages: Message[]
}

type Message = {
  text: string
  sender: string
}

type FormattedConversation = {
  recipients: Contact[]
  messages: Message[]
  selected: boolean
}

type ConversationsContextProps = {
  conversations: FormattedConversation[]
  selectedConversation: FormattedConversation
  selectConversationIndex: (index: number) => void
  createConversation: (recipients: string[]) => void
  sendMessage: (recipients: string[], text: string) => void
}

const ConversationsContext = createContext<ConversationsContextProps>(
  {} as ConversationsContextProps,
)

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({
  id,
  children,
}: ConversationsProviderProps) {
  const [conversations, setConversations] = useLocalStorage<Conversation[]>(
    'conversations',
    [],
  )
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)

  const { contacts } = useContacts()

  function createConversation(recipients: string[]) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  function addMessageToConversation({
    recipients,
    text,
    sender,
  }: {
    recipients: string[]
    text: string
    sender: string
  }) {
    setConversations((prevConversations) => {
      let madeChange = false
      const newMessage = { sender, text }

      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          }
        }

        return conversation
      })

      if (madeChange) {
        return newConversations
      } else {
        return [...prevConversations, { recipients, messages: [newMessage] }]
      }
    })
  }

  function sendMessage(recipients: string[], text: string) {
    addMessageToConversation({ recipients, text, sender: id })
  }

  function selectConversationIndex(index: number) {
    setSelectedConversationIndex(index)
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })
    const selected = index === selectedConversationIndex
    return { ...conversation, recipients, selected }
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex,
    createConversation,
    sendMessage,
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

function arrayEquality(a: any[], b: any[]) {
  if (a.length !== b.length) return false
  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}
