import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export function Conversations() {
  const { conversations } = useConversations()

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroupItem key={index}>
          {conversation.recipients.map((recipient, index) => (
            <span key={index}>{recipient.name}, </span>
          ))}
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}
