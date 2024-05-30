"use client";
import Searchbar from './Searchbar'
import Account from './Account'
import Image from 'next/image';
import { useEffect, useState } from 'react';

const MainComponentSidebar = ({ view, setView }: MainComponentSidebarProps) => {
    const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [friends, setFriends] = useState<AccountProps[]>([]);

    useEffect(() => {
        const fetchFriends = async () => {
            const response = await fetch('/api/friends/getFriends');
            const data = await response.json();
            console.log(data)
            setFriends(data.data);
        };

        fetchFriends();
    }, []);

    const settingsSelected = () => {
        if (view === 'Settings') {
            setView('NoChatSelected');
        } else {
            setView('Settings');
        }
    };

    const handleChatSelected = () => {
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

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery) {
                const response = await fetch(`/api/friends/search?query=${encodeURIComponent(searchQuery)}`);
                const data = await response.json();
                setSearchResults(data.data);
            } else {
                setSearchResults([]);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);

    return (
        <div className="hidden md:flex w-[300px] lg:w-[350px] h-[600px] lg:h-[750px] rounded-l-3xl rounded-tr-none rounded-br-none rounded-bl-3xl flex-shrink-0 border border-white/54 bg-white/7 backdrop-blur-[7.5px] flex-col justify-between bg-[rgba(255,255,255,0.07)] gap-10"
        >
            <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {/* LEFT SIDE */}
            <div className='flex flex-col h-full gap-10 scrollbar mb-auto overflow-auto'>
                {/* if searching, display searched only, else display your Account */}
                {searchResults.length > 0 ? (
                    <>
                        {searchResults.map((result) => (
                            <Account
                                key={result.id}
                                username={result.username}
                                profilePic={result.profilePic}
                                handleClick={() => { }}
                                isFriend={false}
                                id={result.id}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        {friends.map((friend) => (
                            <Account
                                key={friend.id}
                                username={friend.username}
                                profilePic={friend.profilePic}
                                isOnline={true}
                                hasIcon=''
                                isPinned={false}
                                newMessages={0}
                                handleClick={handleChatSelected}
                                isFriend={true}
                                id={friend.id}
                            />
                        ))}
                    </>
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