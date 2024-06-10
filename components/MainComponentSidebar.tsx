"use client";
import Searchbar from './Searchbar'
import Account from './Account'
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { useUserStore, useSelectedFriendStore } from '@/store/useStore';
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast';

const MainComponentSidebar = ({ view, setView, isOpen, setIsOpen, socket }: MainComponentSidebarProps) => {
    const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [friends, setFriends] = useState<AccountProps[]>([]);
    const [selectedFriend, setSelectedFriend] = useState("");

    const classNames = isOpen ? "flex rounded-3xl" : "hidden";

    const { userId, setUserId, setIsGithubUser, setUserProfilePic } = useUserStore();
    const { setFriendId, setReceiverUsername } = useSelectedFriendStore();

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
        socket.on("fetch-friends", fetchFriends);

        const handleSeenNewMessage = ({ hasSeenMessage, senderId }: { hasSeenMessage: number, senderId: string }) => {

            // Update the newMessages count for the sender
            setFriends(currentFriends => currentFriends.map(friend => {
                if (friend.id === senderId) {
                    return { ...friend, newMessages: hasSeenMessage };
                }
                return friend;
            }));
        };

        socket.on("seen-new-message-all", handleSeenNewMessage);

        return () => {
            socket.off('friend-status-changed', handleStatusChange);
            socket.off("fetch-friends", fetchFriends);
            socket.off("seen-new-message-all", handleSeenNewMessage);
        };
    }, [userId, socket]);


    const settingsSelected = () => {
        setIsOpen(prev => !prev);
        if (view === 'Settings') {
            setView('NoChatSelected');
        } else {
            setView('Settings');
        }
    };

    const handleChatSelected = (friendId: string, receiverUsername: string) => {
        setIsOpen(prev => !prev);
        if (view === 'ChatSelected' && selectedFriend === friendId) {
            setView('NoChatSelected');
            setSelectedFriend('');
        } else {
            setView('ChatSelected');
            setSelectedFriend(friendId);
            setFriendId(friendId);
            setReceiverUsername(receiverUsername);
            // 
            // call socket to update the leave chat
            socket.emit('leave-chat', { userId });
            socket.emit("view-chat", { friendId, userId })
        }
    };

    const handleLogoutSelected = () => {
        setIsOpen(prev => !prev);
        if (view === 'Logout') {
            setView('NoChatSelected');
        } else {
            setView('Logout');
        }
    };

    const fetchFriends = async () => {
        const response = await fetch('/api/friends/getFriends');
        const data = await response.json();
        console.log(data)
        const filteredData = data.data.slice(1)
        console.log('Friends:', filteredData)

        setIsGithubUser(data.data[0].isGithubUser);
        setUserProfilePic(data.data[0].profilePic);
        setUserId(data.data[0].id);
        setFriends(filteredData);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery) {
                try {
                    const response = await fetch(`/api/friends/search?query=${encodeURIComponent(searchQuery)}`);
                    const data = await response.json();
                    setSearchResults(data.data);
                } catch (error) {
                    toast.error('Failed to fetch search results');
                }
            } else {
                setSearchResults([]);
                if (!friends.length) { // Fetch friends only if not already fetched or under specific conditions
                    fetchFriends();
                }
            }
        };

        // Debounce the fetch function to avoid making too many requests
        const debouncedFetch = debounce(fetchSearchResults, 300);
        debouncedFetch();

        // Cleanup the debounced function to avoid memory leaks
        return () => {
            debouncedFetch.cancel();
        };

    }, [searchQuery, friends.length]);




    const refreshFriends = () => {
        fetchFriends();
    };

    return (
        <div className={`${classNames} w-[300px] sm:w-[350px] h-[500px] sm:h-[600px] md:flex lg:w-[350px] md:h-[600px] lg:h-[750px] rounded-l-3xl md:rounded-tr-none md:rounded-br-none rounded-bl-3xl flex-shrink-0 border border-white/54 bg-white/7 backdrop-blur-[7.5px] flex-col justify-between bg-[rgba(255,255,255,0.07)] gap-10`}
        >
            <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {/* LEFT SIDE */}
            <div className='flex flex-col h-full gap-10 scrollbar mb-auto overflow-x-hidden overflow-y-auto'>
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
                                socket={socket}
                                username={friend.username}
                                nickname={friend.nickname}
                                profilePic={friend.profilePic}
                                isOnline={friend.isOnline}
                                hasIcon=''
                                isPinned={friend.isPinned}
                                newMessages={friend.newMessages}
                                handleClick={() => {
                                    handleChatSelected(friend.id, friend.nickname ? friend.nickname : friend.username);
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