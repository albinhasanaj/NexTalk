import React from 'react';
import Searchbar from './Searchbar';
import Friends from './Friends';

import { friends } from '@/constants/friendList';

const ChatpageSidebar = () => {
    return (
        <div
            className="w-full h-[100vh] flex justify-center items-center bg-cover bg-no-repeat"
            style={{ backgroundImage: "url('/images/chatpagebg.png')" }}
        >

            <div className="w-[350px] h-[750px] flex-shrink-0 rounded-l-3xl rounded-tr-none rounded-br-none rounded-bl-3xl border border-white/54 bg-white/7 backdrop-blur-[7.5px] flex flex-col justify-center bg-[rgba(255,255,255,0.07)] gap-10"
            >
                {/* LEFT SIDE */}
                {/* <Searchbar /> */}
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
                    />
                ))}
            </div>


            <div className="w-[400px] lg:w-[600px] h-[750px] flex-shrink-0 rounded-r-3xl rounded-tl-none rounded-bl-none rounded-tr-3xl border border-white/54 bg-white/7 backdrop-blur-[7.5px] flex items-center bg-[rgba(255,255,255,0.07)] flex-col text-white justify-between">
                {/* RIGHT SIDE */}
            </div >

        </div >
    )
}

export default ChatpageSidebar