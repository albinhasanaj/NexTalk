import Image from 'next/image';
import { useState, useEffect, useRef, Fragment, ChangeEvent } from 'react';
import EmojiMenu from './EmojiMenu';
import "../app/chat.css";
import toast from 'react-hot-toast';
import { useFriendsListStore, useSelectedFriendStore, useUserStore } from '@/store/useStore';
import ChatBubble from './ChatBubble';
import { useEmojiEffect } from '@/hooks/useEmojiEffect';


const ChatSelected = ({ socket, isConnected }: ChatSelectedProps) => {
    const [value, setValue] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const { friendId, receiverUsername } = useSelectedFriendStore(state => ({
        receiverNickname: state.receiverNickname,
        friendId: state.friendId,
        receiverUsername: state.receiverUsername,
    }));

    const { friends } = useFriendsListStore(state => ({
        friends: state.friends,
    }));

    const { userId } = useUserStore(state => ({
        userId: state.userId,
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

    useEffect(() => {
        console.log("isConnected", isConnected)
        if (isConnected) {
            const handleReceiveReaction = (reactionData: { senderId: string, reaction: string }) => {
                triggerEffect(reactionData.reaction);
            };

            socket.on('reaction', handleReceiveReaction);

            return () => {
                socket.off('reaction', handleReceiveReaction);
            };
        }

    }, [isConnected, socket]);

    useEffect(() => {
        const handleMessageReceive = (message: Message) => {
            setMessages(prevMessages => [...prevMessages, {
                ...message,
                isSender: message.senderId === userId,
                receiver: message.receiverId,
                sender: message.sender,
                profilePic: message.sender ? message.sender.profilePic : '',
            }]);
        };

        socket.emit('view-chat', { userId, friendId });
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
                const response = await fetch(`/api/messages/getMessages?friendId=${friendId}`);
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
            <div className="overflow-x-hidden scrollbar px-6 mb-6">
                {messages.map((message: Message, index: number) => (
                    <Fragment key={index}>
                        <ChatBubble
                            username={message.isSender ? "You" : friends.get(message.senderId) || receiverUsername}
                            message={message.content}
                            isSender={message.isSender}
                            profilePic={message.sender ? message.sender.profilePic : ''}
                        />
                        <div ref={endOfMessagesRef} />
                    </Fragment>
                ))}
            </div>
            <div className={`effect show ${effect}`} />
            {emojis.map((emoji, index) => (
                <div key={index} className="emoji absolute top-[50%] right-[50%]" style={createRandomEmojiStyles()}>{emoji}</div>
            ))}

            <div className='flex w-full justify-center relative'>
                <label className="input bg-[#424141] flex items-center gap-2 w-[90%] md:w-[80%] mb-4">
                    <input type="text" className="grow text-[12px] md:text-[14px]" placeholder="Send a message"
                        value={value}
                        onChange={handleChange}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <div className="flex gap-4">
                        <Image
                            src='/icons/party-popper.svg'
                            width={24}
                            height={24}
                            alt='party-popper'
                            className='cursor-pointer hover:-translate-y-0.5 transition-all'
                            onClick={() => setShowEmojiMenu(!showEmojiMenu)}
                        />
                        <Image src='/icons/send-message.svg' width={24} height={24} alt='send' className='cursor-pointer hover:-translate-y-0.5 transition-all'
                            onClick={handleSend}
                        />
                    </div>
                </label>
                {showEmojiMenu && <EmojiMenu triggerEffect={triggerEffect} sendReaction={handleSendReaction} />}
            </div>
        </div>
    );
};

export default ChatSelected;
