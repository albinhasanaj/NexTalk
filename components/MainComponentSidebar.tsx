"use client";
import Searchbar from './Searchbar'
import Account from './Account'
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { useChatSessionStore } from '@/store/useStore';
import useSocketConnection from '@/hooks/useSocketConnection';

const MainComponentSidebar = ({ view, setView }: MainComponentSidebarProps) => {
    const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [friends, setFriends] = useState<AccountProps[]>([]);
    const socket = useSocketConnection();

    const { setFriendId, setReceiverUsername, setUserId, userId } = useChatSessionStore(state => ({
        setFriendId: state.setFriendId,
        setReceiverUsername: state.setReceiverUsername,
        setUserId: state.setUserId,
        userId: state.userId
    }));

    useEffect(() => {
        if (userId) {
            socket.emit('register', { userId });
        }

        const handleStatusChange = ({ userId, isOnline }: { userId: string, isOnline: boolean }) => {
            console.log('Friend status changed:', userId, isOnline);
            setFriends(currentFriends => currentFriends.map(friend => {
                if (friend.id === userId) {
                    return { ...friend, isOnline };
                }
                return friend;
            }));
        };

        socket.on('friend-status-changed', handleStatusChange);

        return () => {
            socket.off('friend-status-changed', handleStatusChange);
        };
    }, [userId, socket]);


    const settingsSelected = () => {
        if (view === 'Settings') {
            setView('NoChatSelected');
        } else {
            setView('Settings');
        }
    };

    const handleChatSelected = (friendId: string, receiverUsername: string) => {
        setFriendId(friendId);
        setReceiverUsername(receiverUsername);

        if (view === 'ChatSelected') {
            setView('NoChatSelected');
        } else {
            setView('ChatSelected');
        }
    };

    const handleLogoutSelected = () => {
        if (view === 'Logout') {
            setView('NoChatSelected');
        } else {
            setView('Logout');
        }
    };

    const fetchFriends = async () => {
        const response = await fetch('/api/friends/getFriends');
        const data = await response.json();
        const filteredData = data.data.slice(1)

        setUserId(data.data[0].id);
        setFriends(filteredData);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery) {
                const response = await fetch(`/api/friends/search?query=${encodeURIComponent(searchQuery)}`);
                const data = await response.json();
                setSearchResults(data.data);
            } else {
                setSearchResults([]);
                if (!friends.length) { // Fetch friends only if not already fetched or under specific conditions
                    fetchFriends();
                }
            }
        };

        fetchSearchResults();
    }, [searchQuery, friends.length]);


    const refreshFriends = () => {
        fetchFriends();
    };

    return (
        <div className="hidden md:flex w-[300px] lg:w-[350px] h-[600px] lg:h-[750px] rounded-l-3xl rounded-tr-none rounded-br-none rounded-bl-3xl flex-shrink-0 border border-white/54 bg-white/7 backdrop-blur-[7.5px] flex-col justify-between bg-[rgba(255,255,255,0.07)] gap-10"
        >
            <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {/* LEFT SIDE */}
            <div className='flex flex-col h-full gap-10 scrollbar mb-auto overflow-auto'>
                {/* if searching, display searched only, else display your Account */}
                {searchResults.length > 0 ? (
                    <Fragment>
                        {searchResults.map((result) => (
                            <Account
                                key={result.id}
                                username={result.username}
                                profilePic={result.profilePic}
                                isFriend={false}
                                id={result.id}
                            />
                        ))}
                    </Fragment>
                ) : (
                    <Fragment>
                        {friends.map((friend) => (
                            <Account
                                key={friend.id}
                                username={friend.username}
                                profilePic={friend.profilePic}
                                isOnline={friend.isOnline}
                                hasIcon=''
                                isPinned={false}
                                newMessages={0}
                                handleClick={() => {
                                    handleChatSelected(friend.id, friend.username);
                                }}
                                isFriend={true}
                                id={friend.id}
                                refreshFriends={refreshFriends}
                            />
                        ))}
                    </Fragment>
                )}

            </div>
            <div className='flex justify-between mx-10 my-5'>
                <Image
                    src='/icons/settings.svg'
                    width={40}
                    height={40}
                    alt='Settings Icon'
                    className='cursor-pointer'
                    onClick={settingsSelected}
                />
                <Image
                    src='/icons/logout.svg'
                    width={40}
                    height={40}
                    alt='Logout Icon'
                    className='cursor-pointer'
                    onClick={handleLogoutSelected}
                />
            </div>
        </div >
    )
}

export default MainComponentSidebar