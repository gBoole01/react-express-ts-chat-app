import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { io, Socket } from 'socket.io-client'

type SocketContextProps = {
  socketClient: any
}

const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps,
)

export function useSocket() {
  return useContext(SocketContext)
}

type SocketProviderProps = {
  id: string
  children: ReactNode
}

export function SocketProvider({ id, children }: SocketProviderProps) {
  const socketClient = useRef<Socket>()

  useEffect(() => {
    socketClient.current = io('http://localhost:5000', {
      auth: { id },
      withCredentials: true,
    })

    if (socketClient.current) {
      console.log('connected')
    }

    return () => {
      socketClient.current?.disconnect()
      socketClient.current = undefined
    }
  }, [id])

  const value = {
    socketClient,
  }

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  )
}
