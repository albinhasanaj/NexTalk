import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import EmojiMenu from './EmojiMenu';
import "../app/chat.css";
import toast from 'react-hot-toast';
import { useFriendStore } from '@/store/useStore';
import ChatBubble from './ChatBubble';

const ChatSelected = () => {
    const [effect, setEffect] = useState<string | null>(null);
    const [showEmojiMenu, setShowEmojiMenu] = useState<boolean>(false);
    const [emojis, setEmojis] = useState<string[]>([]);
    const [value, setValue] = useState<string>('');
    const { friendId } = useFriendStore(state => ({ friendId: state.friendId }));
    const [messages, setMessages] = useState([]);

    const triggerEffect = (effectName: string) => {
        setEffect(effectName);
        setShowEmojiMenu(false);

        const emojiMap: { [key: string]: string } = {
            freeze: '🥶',
            fire: '🔥',
            ufo: '👽',
            confetti: '🎉',
            mystery: '❓',
        };

        setEmojis(Array.from({ length: 50 }, () => emojiMap[effectName]));

        setTimeout(() => {
            setEffect(null);
            setEmojis([]);
        }, 3000); // Reset effect after 3 seconds
    };

    useEffect(() => {
        if (effect) {
            document.documentElement.style.setProperty('--effect-bg-color', getEffectBgColor(effect));
        }
    }, [effect]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`/api/friends/getMessages?friendId=${friendId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch messages");
                }

                const data = await response.json();
                setMessages(data.messages);
            } catch (error) {
                toast.error("Failed to fetch messages");
            }
        }

        fetchMessages();

    }, [friendId]);

    const getEffectBgColor = (effect: string) => {
        switch (effect) {
            case 'freeze':
                return 'rgba(0, 191, 255, 0.8)';
            case 'fire':
                return 'rgba(255, 69, 0, 0.8)';
            case 'ufo':
                return 'rgba(75, 0, 130, 0.8)';
            case 'confetti':
                return 'rgba(255, 215, 0, 0.8)';
            case 'mystery':
                return 'rgba(255, 20, 147, 0.8)';
            default:
                return 'transparent';
        }
    };

    const createRandomEmojiStyles = () => {
        const x = `${Math.random() * 200 - 100}vw`;
        const y = `${Math.random() * 200 - 100}vh`;
        const r = `${Math.random() * 720 - 360}deg`;
        return { '--x': x, '--y': y, '--r': r } as React.CSSProperties;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSend = async () => {
        const content = value;
        if (content.trim() === '') return;

        try {
            const response = await fetch("/api/friends/sendMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content, receiverId: friendId }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setValue('');

        } catch (error) {
            toast.error("Failed to send message");
        }
    }

    return (
        <div className='flex flex-col w-full h-full justify-between relative overflow-hidden'>
            <div className="overflow-auto scrollbar px-7">
                {messages.map((message, index) => (
                    <>
                        <ChatBubble
                            key={index}
                            username={message.senderId === friendId ? "Friend's Name" : "Your Name"}
                            message={message.content} // Use message.content instead of message
                            isSender={message.senderId !== friendId}
                            profilePic="http://localhost:3000/_next/image?url=https%3A%2F%2Favatar.iran.liara.run%2Fpublic%3Fusername%3Dalbinhasanaj&w=64&q=75"
                        />
                    </>
                ))}
            </div>
            <div className={`effect show ${effect}`}></div>
            {emojis.map((emoji, index) => (
                <div key={index} className="emoji absolute top-[50%] right-[50%]" style={createRandomEmojiStyles()}>{emoji}</div>
            ))}
            <div className='flex w-full justify-center relative'>
                <input type="text" placeholder='Send a message' className='w-[85%] h-11 mb-4 rounded-[10px] bg-[#424141] border-[1px] border-solid border-[#353434] pl-3 placeholder-[rgba(255,255,255,0.50)] text-[0.8rem]'
                    value={value}
                    onChange={handleChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Image src='/icons/send-message.svg' width={24} height={24} alt='send' className='absolute left-[82%] top-[18%] cursor-pointer'
                    onClick={handleSend}
                />
                <Image
                    src='/icons/party-popper.svg'
                    width={24}
                    height={24}
                    alt='party-popper'
                    className='absolute left-[76%] top-[18%] cursor-pointer hover:-translate-y-0.5 transition-all'
                    onClick={() => setShowEmojiMenu(!showEmojiMenu)}
                />
                {showEmojiMenu && <EmojiMenu triggerEffect={triggerEffect} />}
            </div>
        </div>
    );
};

export default ChatSelected;
