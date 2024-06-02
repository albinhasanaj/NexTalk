// useSocketConnection.js
import io from 'socket.io-client';
import { useEffect } from 'react';
import { useChatSessionStore } from '@/store/useStore';

const useSocketConnection = () => {
    const userId = useChatSessionStore(state => state.userId);
    const socket = io(process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'http://localhost:5000');

    useEffect(() => {
        if (userId) {
            socket.emit('register', { userId });
        }

        return () => {
            // Optionally emit an event when the component unmounts
            if (userId) {
                socket.emit('user-logout', { userId });
            }
        };
    }, [userId]);

    return socket;
};

export default useSocketConnection;
