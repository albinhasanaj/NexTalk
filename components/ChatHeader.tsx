import { useEffect, useState } from 'react'
import { useChatSessionStore } from '@/store/useStore'

const ChatHeader = () => {
    const { username } = useChatSessionStore(state => ({ username: state.receiverUsername }))
    // get date and time in 5/23/2024 format and 01:52 format

    const [dateTime, setDateTime] = useState({
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }),
        time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }),
    });


    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime({
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                }),
                time: new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }),
            });
        }, 1000);
        return () => clearInterval(interval);
    }
        , []);

    return (
        <header className='py-4 px-4 text-[14px] md:text-[16px] bg-[#424141] w-full md:rounded-tl-none rounded-bl-none rounded-tr-3xl flex justify-between items-center rounded-tl-3xl space-x-2'>
            <span>{dateTime.date}</span>
            <span className='text-[#C0C0C0] font-bold overflow-hidden whitespace-nowrap overflow-ellipsis'>Talking to: {username}</span>
            <span>{dateTime.time}</span>
        </header>
    )
}

export default ChatHeader