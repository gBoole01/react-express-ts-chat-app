import { useState } from 'react'
import { Nav, Tab } from 'react-bootstrap'
import { Contacts } from './Contacts'
import { Conversations } from './Conversations'

type SidebarProps = {
  id: string
}

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

export function Sidebar({ id }: SidebarProps) {
  const [activeKey, setActiveKey] = useState<string>(CONVERSATIONS_KEY)

  return (
    <div style={{ width: '250px' }} className="d-flex flex-column">
      <Tab.Container
        activeKey={activeKey}
        onSelect={(key) => {
          if (key) setActiveKey(key)
        }}
      >
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-end overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  )
}
