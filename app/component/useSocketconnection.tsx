// utils/useSocketConnection.ts
import { useEffect } from 'react';
import { socket } from '../utils/socket'; // adjust path if needed

export default function useSocketConnection(userId: string) {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      console.log('✅ Connected to server:', socket.id);
      socket.emit('setUser', { userId });
      console.log('📤 Sent user ID:', userId);
    };

    const handleDisconnect = () => {
      console.log('❌ Disconnected from server');
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [userId]);
}
