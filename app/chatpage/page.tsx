"use client";
import React, { useState } from 'react'
import MainComponent from '@/components/MainComponent'
import MainComponentSidebar from '@/components/MainComponentSidebar';

// this has to be a protected route
const ChatPage = () => {
    const [view, setView] = useState('NoChatSelected');

    return (
        <div
            className="w-full h-[100vh] flex justify-center items-center bg-cover bg-no-repeat"
            style={{ backgroundImage: "url('/images/chatpagebg.png')" }}
        >
            <MainComponentSidebar
                view={view}
                setView={setView}
            />
            <MainComponent
                view={view}
            />
        </div>
    )
}

export default ChatPage