import Image from 'next/image';
import { useState, useEffect, useRef, Fragment, ChangeEvent } from 'react';
import EmojiMenu from './EmojiMenu';
import "../app/chat.css";
import toast from 'react-hot-toast';
import { useChatSessionStore } from '@/store/useStore';
import ChatBubble from './ChatBubble';
import { io } from 'socket.io-client';
import { useEmojiEffect } from '@/hooks/useEmojiEffect';

const socket = io("http://localhost:3000");

const ChatSelected = () => {
    const [value, setValue] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const { friendId, userId, receiverUsername } = useChatSessionStore(state => ({
        friendId: state.friendId,
        userId: state.userId,
        receiverUsername: state.receiverUsername
    }));

    const { emojis,
        effect,
        showEmojiMenu,
        triggerEffect,
        createRandomEmojiStyles,
        setShowEmojiMenu
    } = useEmojiEffect();

    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSendReaction = (reaction: string) => {
        const reactionData = {
            senderId: userId,
            receiverId: friendId,
            reaction
        };
        socket.emit('reaction', reactionData);
    };


    // FIX THIS ERRROR WHEN BACK HOME
    // THE ERROR IS IN THIS USE EFFECT
    // SPECIFICALLY IN DEPENDENCY ARRAY
    // SINCE THE USERID AND RECEIVERUSERNAME ARE NOT CHANGING AS THEY ARE COMING FROM STORE
    // SO THE USE EFFECT WILL NOT RUN AGAIN
    // SO THE SOCKET WILL NOT LISTEN TO THE REACTION EVENT
    // which is bad :(

    // do you think these messages will be good for me when i get back?
    // a: yes
    // why?
    // a: because you will have the messages from the chat
    // 

    useEffect(() => {
        console.log("userId", userId)
        const handleReceiveReaction = (reactionData) => {
            console.log("reactionData", reactionData)
        };

        socket.on('reaction', handleReceiveReaction);

        return () => {
            socket.off('reaction', handleReceiveReaction);
        };
    }, [userId, receiverUsername]);

    useEffect(() => {
        const handleMessageReceive = (message: Message) => {
            setMessages(prevMessages => [...prevMessages, {
                ...message,
                isSender: message.senderId === userId,
                receiver: message.receiver,
                sender: message.sender,
                profilePic: message.sender ? message.sender.profilePic : '',
            }]);
        };

        socket.on('message', handleMessageReceive);

        return () => {
            socket.off('message', handleMessageReceive);
        };
    }, [userId]);

    const handleSend = () => {
        if (!value.trim()) return;

        // Emit the new message to the server
        const newMessage = {
            content: value,
            senderId: userId,
            receiverId: friendId,
        };
        socket.emit('new-message', newMessage);
        setValue('');
    };
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

        if (friendId) {
            fetchMessages();
        }

    }, [friendId]);

    return (
        <div className='flex flex-col w-full h-full justify-between relative overflow-hidden'>
            <div className="overflow-auto scrollbar px-6 mb-6">
                {messages.map((message: Message, index: number) => (
                    <Fragment key={index}>
                        <ChatBubble
                            username={message.isSender ? "You" : receiverUsername}
                            message={message.content}
                            isSender={message.isSender}
                            profilePic={message.sender ? message.sender.profilePic : ''}
                        />
                        <div ref={endOfMessagesRef} />
                    </Fragment>
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
                {showEmojiMenu && <EmojiMenu triggerEffect={triggerEffect} sendReaction={handleSendReaction} />}
            </div>
        </div>
    );
};

export default ChatSelected;
