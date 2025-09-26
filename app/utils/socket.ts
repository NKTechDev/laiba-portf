import { io } from 'socket.io-client';

// Replace with your server IP/URL
const SOCKET_URL = 'https://api.s3rhub.com'; 

export const socket = io(SOCKET_URL, {
  transports: ['websocket'], // important for RN
  autoConnect: false, // we'll manually connect
});