"use client";
import Searchbar from './Searchbar'
import Accounts from './Accounts'
import Image from 'next/image';
import { useEffect, useState } from 'react';

const MainComponentSidebar = ({ view, setView }: MainComponentSidebarProps) => {
    const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

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
                console.log(data.data);
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
            <div className='flex flex-col gap-10 overflow-auto scrollbar mb-auto'>
                {/* if searching, display searched only, else display your Accounts */}
                {searchResults.length > 0 ? (
                    <>
                        {searchResults.map((result, index) => (
                            <Accounts
                                key={index}
                                name={result.username}
                                nickname=""
                                profilePic={result.profilePic}
                                isOnline={result.isOnline}
                                hasIcon=''
                                isPinned={false}
                                newMessages={0}
                                handleClick={() => { }}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <Accounts
                            name='John Doe'
                            nickname='JD'
                            profilePic="https://avatar.iran.liara.run/public?username=test"
                            isOnline={true}
                            hasIcon='📌'
                            isPinned={true}
                            newMessages={1}
                            handleClick={handleChatSelected}
                        />
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