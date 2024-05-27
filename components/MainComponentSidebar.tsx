"use client";
import Searchbar from './Searchbar'
import Friends from './Friends'
import { friends } from '@/constants/friendList';
import Image from 'next/image';


const MainComponentSidebar = ({ view, setView }: MainComponentSidebarProps) => {
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
    return (
        <div className="
            hidden md:flex w-[300px] lg:w-[350px] h-[600px] lg:h-[750px] rounded-l-3xl rounded-tr-none rounded-br-none rounded-bl-3xl
            flex-shrink-0 border border-white/54 bg-white/7 backdrop-blur-[7.5px] flex-col justify-between bg-[rgba(255,255,255,0.07)] gap-10"
        >
            <Searchbar />
            {/* LEFT SIDE */}
            <div className='flex flex-col gap-10 overflow-auto scrollbar'>
                {friends.map((friend, index) => (
                    <Friends
                        key={index}
                        name={friend.name}
                        nickname={friend.nickname}
                        profilePic={friend.profilePic}
                        isOnline={friend.isOnline}
                        hasIcon={friend.hasIcon}
                        isPinned={friend.isPinned}
                        newMessages={friend.newMessages}
                        handleClick={handleChatSelected}
                    />
                ))}
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
        </div>
    )
}

export default MainComponentSidebar