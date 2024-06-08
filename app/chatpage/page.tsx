"use client";
import { useEffect, useState } from 'react'
import MainComponent from '@/components/MainComponent'
import MainComponentSidebar from '@/components/MainComponentSidebar';
import useSocketConnection from '@/hooks/useSocketConnection';
import ChatNavbar from '@/components/ChatNavbar';

// this has to be a protected route
const ChatPage = () => {
    const [view, setView] = useState('NoChatSelected');
    const { socket, isConnected } = useSocketConnection();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="w-full flex flex-col bg-cover bg-no-repeat"
        >
            <ChatNavbar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <main className="flex h-[calc(100vh-180px)] md:h-screen w-full items-center justify-center">
                <MainComponentSidebar
                    socket={socket}
                    view={view}
                    setView={setView}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
                <MainComponent
                    socket={socket}
                    isConnected={isConnected}
                    view={view}
                    isOpen={isOpen}
                />
            </main>
        </div>
    )
}

export default ChatPage