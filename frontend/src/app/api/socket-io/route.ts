// pages/api/socket.ts
import type { Server as HTTPServer } from "http"
import type { Socket as NetSocket } from "net"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from 'next/server'
import type { Server as IOServer } from "socket.io"
import { Server } from "socket.io"

const PORT: any = Number(process.env.PORT) + 1 || 3001;

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}
export function GET() {

  const res = new NextResponse() as any
  if (res?.io) {
    return NextResponse.json({ success: true, message: "Socket is already running", socket: `:${PORT}` }, { status: 200 })
    
  } 

  console.log("Starting Socket.IO server on port:", PORT)
  
  const io = new Server({ path: "/api/socket", addTrailingSlash: false, cors: { origin: ['http://localhost:3000'] } }).listen(PORT)

  io.on("connect", socket => {
    const _socket = socket
    console.log("socket connect", socket.id)
    _socket.broadcast.emit("welcome", `Welcome ${_socket.id}`)

    const createdMessage = (msg: any) => {
      console.log("New message", msg);
      socket.broadcast.emit("newIncomingMessage", msg);
    };
  
    socket.on("createdMessage", createdMessage);

    socket.on("disconnect", async () => {
      console.log("socket disconnect")
    })
  })
  
  res.io = io
  return NextResponse.json({ success: true, message: "Socket is started", socket: `:${PORT}` }, { status: 201 })
}