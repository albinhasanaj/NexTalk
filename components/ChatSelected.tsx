import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import EmojiMenu from './EmojiMenu';
import "../app/chat.css";

const ChatSelected = () => {
    const [effect, setEffect] = useState<string | null>(null);
    const [showEmojiMenu, setShowEmojiMenu] = useState<boolean>(false);
    const [emojis, setEmojis] = useState<string[]>([]);

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

    return (
        <div className='flex flex-col w-full px-7 h-full justify-between relative overflow-hidden'>
            <div>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <div className="chat-header">
                        Obi-Wan Kenobi
                        <time className="text-xs opacity-50">12:45</time>
                    </div>
                    <div className="chat-bubble text-white">You were the Chosen One!</div>
                    <div className="chat-footer opacity-50">
                        Delivered
                    </div>
                </div>

                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <div className="chat-header">
                        Anakin
                        <time className="text-xs opacity-50">12:46</time>
                    </div>
                    <div className="chat-bubble bg-blue-500 text-white">I hate you!</div>
                    <div className="chat-footer opacity-50">
                        Seen at 12:46
                    </div>
                </div>
            </div>
            <div className={`effect show ${effect}`}></div>
            {emojis.map((emoji, index) => (
                <div key={index} className="emoji absolute top-[50%] right-[50%]" style={createRandomEmojiStyles()}>{emoji}</div>
            ))}
            <div className='flex w-full justify-center relative'>
                <input type="text" placeholder='Send a message' className='w-[85%] h-11 mb-4 rounded-[10px] bg-[#424141] border-[1px] border-solid border-[#353434] pl-3 placeholder-[rgba(255,255,255,0.50)] text-[0.8rem]' />
                <Image src='/icons/send-message.svg' width={24} height={24} alt='send' className='absolute left-[82%] top-[18%] cursor-pointer' />
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
