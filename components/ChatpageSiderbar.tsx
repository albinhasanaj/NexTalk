"use client";
import React, { useState } from 'react';
import Searchbar from './Searchbar';
import Friends from './Friends';

import { friends } from '@/constants/friendList';

import Navbar from './Navbar';
import NoChatSelected from './NoChatSelected';
import Settings from './Settings';
import Image from 'next/image';
import ChatSelected from './ChatSelected';

const ChatpageSidebar = () => {
    const [view, setView] = useState('NoChatSelected');

    const handleToggleView = () => {
        setView((prevView) => (prevView === 'NoChatSelected' ? 'Settings' : 'NoChatSelected'));
    };

    const toggleView = (view: string) => {
        switch (view) {
            case 'NoChatSelected':
                return <NoChatSelected />;
            case 'Settings':
                return <Settings />;
            case 'ChatSelected':
                return <ChatSelected />;
            default:
                return <NoChatSelected />;
        }
    };

    return (
        <div
            className="w-full h-[100vh] flex justify-center items-center bg-cover bg-no-repeat"
            style={{ backgroundImage: "url('/images/chatpagebg.png')" }}
        >

            <div className="w-[350px] h-[750px] flex-shrink-0 rounded-l-3xl rounded-tr-none rounded-br-none rounded-bl-3xl border border-white/54 bg-white/7 backdrop-blur-[7.5px] flex flex-col justify-between bg-[rgba(255,255,255,0.07)] gap-10"
            >
                <Searchbar />
                {/* LEFT SIDE */}
                <div className='flex flex-col gap-10'>
                    {friends.map((friend, index) => (
                        <Friends
                            key={index}
                            name={friend.name}
                            nickname={friend.nickname}
                            profilePic={friend.profilePic}
                            isOnline={friend.isOnline}
                            hasIcon={friend.hasIcon}
                            isPinned={friend.isPinned}
                            newMessages={friend.newMessages}
                        />
                    ))}
                </div>
                <div className='flex justify-between mx-10 my-5'>
                    <Image
                        src='/icons/settings.svg'
                        width={40}
                        height={40}
                        alt='Settings Icon'
                        className='cursor-pointer'
                        onClick={handleToggleView}
                    />
                    <Image
                        src='/icons/logout.svg'
                        width={40}
                        height={40}
                        alt='Logout Icon'
                        className='cursor-pointer'
                    />
                </div>
            </div>

            <div className="w-[400px] lg:w-[600px] h-[750px] flex-shrink-0 rounded-r-3xl rounded-tl-none rounded-bl-none rounded-tr-3xl border border-white/54 bg-white/7 backdrop-blur-[30px] flex items-center bg-[rgba(255,255,255,0.1)] flex-col text-white">
                {/* RIGHT SIDE */}
                <Navbar />

                {/* TYPES OF VIEWS */}
                {toggleView(view)}
            </div>
        </div>
    );
};

export default ChatpageSidebar;
