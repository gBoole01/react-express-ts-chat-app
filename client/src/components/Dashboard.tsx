import { useConversations } from '../contexts/ConversationsProvider'
import { OpenConversation } from './OpenConversation'
import { Sidebar } from './Sidebar'

type DashboardProps = {
  id: string
}

export function Dashboard({ id }: DashboardProps) {
  const { selectedConversation } = useConversations()

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  )
}
