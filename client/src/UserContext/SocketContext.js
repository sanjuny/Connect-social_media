import { createContext } from "react"
import { io } from "socket.io-client"

export const socket = io('https://connectgram.website',{path:"/socket/socket.io"})


export const SocketContext = createContext()