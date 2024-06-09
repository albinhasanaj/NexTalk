import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/useStore';

// Create a singleton socket connection instance outside the hook
const socket = io(process.env.NEXT_PUBLIC_BASE_URL || "localhost:5000", {
    withCredentials: true,
    transports: ["websocket", "polling"],
});

const useSocketConnection = () => {
    const userId = useUserStore(state => state.userId);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {

        // Set the socket instance in the store
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
            socket.off("connect");
            socket.off("connect_error");
            socket.off("reconnect_attempt");
            socket.disconnect();
        };
    }, [userId]);

    return { socket, isConnected }
};

export default useSocketConnection;
