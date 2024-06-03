import io from 'socket.io-client';
import { useEffect } from 'react';
import { useChatSessionStore } from '@/store/useStore';

// Create a singleton socket instance outside the hook

const socket = io("http://localhost:3000", {
    withCredentials: true,
    transports: ["websocket", "polling"],
});
const useSocketConnection = () => {
    const userId = useChatSessionStore(state => state.userId);

    useEffect(() => {
        // Ensure the socket connects only if it isn't already connected
        if (!socket.connected) {
            socket.connect();
        }

        if (userId) {
            socket.emit('register', { userId });
        }

        // Setup error handling
        socket.on('connect_error', (error) => {
            console.error('Connection Error:', error);
        });

        return () => {
            if (userId) {
                socket.emit('user-logout', { userId });
            }
            // Remove error handler and disconnect on cleanup
            socket.off('connect_error');
            socket.disconnect();
        };
    }, [userId]);

    return socket;
};

export default useSocketConnection;
