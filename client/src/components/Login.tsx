import { FormEvent, useRef } from 'react'
import { Button, Container, Form, Row, Stack } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'

type LoginProps = {
  onIdSubmit: (id: string) => void
}

export default function Login({ onIdSubmit }: LoginProps) {
  const idRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    onIdSubmit(idRef.current!.value)
  }

  function createNewId() {
    onIdSubmit(uuidV4())
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: '100vh' }}
    >
      <Form onSubmit={handleSubmit} className="w-100 d-flex flex-column gap-2">
        <Row>
          <Form.Group>
            <Form.Label>Enter Your Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
        </Row>
        <Row className="align-self-end">
          <Stack direction="horizontal" gap={2}>
            <Button type="submit" variant="primary">
              Login
            </Button>
            <Button onClick={createNewId} type="button" variant="secondary">
              Create A New Id
            </Button>
          </Stack>
        </Row>
      </Form>
    </Container>
  )
}
