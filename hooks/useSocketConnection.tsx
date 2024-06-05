import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useChatSessionStore } from '@/store/useStore';

// Create a singleton socket instance outside the hook

const socket = io("http://localhost:3000", {
    withCredentials: true,
    transports: ["websocket", "polling"],
});
const useSocketConnection = () => {
    const userId = useChatSessionStore(state => state.userId);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        socket.on('connect', () => {
            setIsConnected(true);
            if (userId) {
                socket.emit('register', { userId });
            }
        });


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

    return { socket, isConnected }
};

export default useSocketConnection;
