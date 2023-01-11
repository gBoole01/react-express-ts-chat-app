import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { io, Socket } from 'socket.io-client'

type SocketProviderProps = {
  id: string
  children: ReactNode
}

type SocketContextProps = {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps,
)

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      auth: { id },
      withCredentials: true,
    })

    if (newSocket) {
      setSocket(newSocket)
      console.log('connected')
    }

    return () => {
      socket?.disconnect()
      setSocket(null)
    }
  }, [id])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
