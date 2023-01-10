import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export function Conversations() {
  const { conversations, selectConversationIndex } = useConversations()

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroupItem
          key={index}
          action
          active={conversation.selected}
          onClick={() => selectConversationIndex(index)}
        >
          {conversation.recipients
            .map((recipient) => recipient.name)
            .join(', ')}
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}
