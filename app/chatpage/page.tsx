"use client";
import { useState } from 'react'
import MainComponent from '@/components/MainComponent'
import MainComponentSidebar from '@/components/MainComponentSidebar';
import useSocketConnection from '@/hooks/useSocketConnection';

// this has to be a protected route
const ChatPage = () => {
    const [view, setView] = useState('NoChatSelected');
    const { socket, isConnected } = useSocketConnection();

    return (
        <div
            className="w-full h-[100vh] flex justify-center items-center bg-cover bg-no-repeat"
            style={{ backgroundImage: "url('/images/chatpagebg.png')" }}
        >
            <MainComponentSidebar
                socket={socket}
                view={view}
                setView={setView}
            />
            <MainComponent
                socket={socket}
                isConnected={isConnected}
                view={view}
            />
        </div>
    )
}

export default ChatPage