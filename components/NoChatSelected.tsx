"use client";
import React, { useEffect } from 'react'
import Image from 'next/image';
import { useChatSessionStore } from '@/store/useStore';

const NoChatSelected = ({ socket }: NoChatSelectedProps) => {
    const { userId } = useChatSessionStore(state => ({
        userId: state.userId
    }));

    useEffect(() => {
        if (userId) {
            socket.emit('leave-chat', { userId });
        }

    }, [userId]);

    return (
        <div className='h-full flex justify-center items-center flex-col gap-8'>
            <h1 className='text-white text-[24px] md:text-[40px] not-italic  tracking-[2px] font-bold text-center leading-tight'>SELECT A CHAT <br /> TO START <br /> CHATTING! </h1>
            <Image src='/images/authillustration.png' alt="Auth Illustration"
                className="w-[275px] h-auto object-contain" height={300} width={300}
            />
        </div>
    )
}

export default NoChatSelected