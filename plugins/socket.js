import { io } from 'socket.io-client'

export default function (context, inject) {

  const { $config } = context
  const socketURL = $config.socketURL || 'http://localhost:3001'

  const socket = io(socketURL, {
    transports: [ 'websocket', 'polling' ],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5,
    timeout: 10000,
    autoConnect: false,
    path: '/socket.io/',
    withCredentials: true,
    forceNew: true,
    multiplex: false
  })

  socket.on('connect', () => {
    // console.log('[Socket] Connected with ID:', socket.id)
  })

  socket.on('disconnect', (reason) => {
    // console.warn('[Socket] Disconnected:', reason)

    if (reason === 'io server disconnect') {
      socket.connect()
    }
  })

  socket.on('connect_error', (err) => {
    console.error('[Socket] Connection Error:', err.message)
    const delay = Math.min(socket.io.reconnectionDelayMax, socket.io.reconnectionDelay * 1.5)
    console.log(`[Socket] Next reconnection attempt in ${delay}ms`)
  })

  socket.on('reconnect', (attemptNumber) => {
    console.log(`[Socket] Reconnected after ${attemptNumber} attempts`)
  })

  socket.on('reconnect_attempt', (attemptNumber) => {
    console.log(`[Socket] Reconnection attempt #${attemptNumber}`)
  })

  socket.on('reconnect_error', (err) => {
    console.error('[Socket] Reconnection error:', err.message)
  })

  socket.on('reconnect_failed', () => {
    console.error(`[Socket] Reconnection failed permanently`)
  })

  if (process.client) {
    let hideTimer
    let wasConnected = false

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        wasConnected = socket.connected
        
        hideTimer = setTimeout(() => {
          if (socket.connected) {
            socket.disconnect()
          }
        }, 60000)
      } else {
        clearTimeout(hideTimer)
        
        if (wasConnected && !socket.connected) {
          socket.connect()
        }
      }
    })

    window.addEventListener('pagehide', () => {
      if (socket.connected) {
        socket.disconnect()
      }
    })

    window.addEventListener('pageshow', (event) => {
      if (event.persisted && !socket.connected) {
        socket.connect()
      }
    })
  }

  inject('socket', socket)

  if (context.app) {
    context.app.$socket = socket
  }

  if (process.client) {

    setTimeout(() => {
      socket.connect()
    }, 100)
  }
}