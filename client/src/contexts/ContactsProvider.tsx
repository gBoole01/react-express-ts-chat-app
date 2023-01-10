import { createContext, ReactNode, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

type ContactsProviderProps = {
  children: ReactNode
}

type Contact = {
  id: string
  name: string
}

type ContactsContextProps = {
  contacts: Contact[]
  createContact: (id: string, name: string) => void
}

const ContactsContext = createContext<ContactsContextProps>(
  {} as ContactsContextProps,
)

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }: ContactsProviderProps) {
  const [contacts, setContacts] = useLocalStorage<Contact[]>('contacts', [])

  function createContact(id: string, name: string) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }]
    })
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  )
}
