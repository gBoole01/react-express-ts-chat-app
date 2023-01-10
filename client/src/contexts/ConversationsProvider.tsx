import { createContext, ReactNode, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Contact, useContacts } from './ContactsProvider'

type ConversationsProviderProps = {
  children: ReactNode
}

type Conversation = {
  recipients: string[]
  messages: string[]
}

type FormattedConversation = {
  recipients: Contact[]
  messages: string[]
}

type ConversationsContextProps = {
  conversations: FormattedConversation[]
  createConversation: (recipients: string[]) => void
}

const ConversationsContext = createContext<ConversationsContextProps>(
  {} as ConversationsContextProps,
)

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({
  children,
}: ConversationsProviderProps) {
  const [conversations, setConversations] = useLocalStorage<Conversation[]>(
    'conversations',
    [],
  )
  const { contacts } = useContacts()

  function createConversation(recipients: string[]) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  const formattedConversations = conversations.map((conversation) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })
    return { ...conversation, recipients }
  })

  const value = {
    conversations: formattedConversations,
    createConversation,
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}
