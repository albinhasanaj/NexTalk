import React from 'react';
import Searchbar from './Searchbar';
import Friends from './Friends';

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
                <Friends nickname='Alyisa Bravery' name="Peter" profilePic='/profile/moana.png' isOnline={true} hasIcon='' isPinned={true} newMessages={10} />
                <Friends nickname='Alyisa Bravery' name="Peter" profilePic='/profile/moana.png' isOnline={true} hasIcon='' isPinned={true} newMessages={10} />
                <Friends nickname='Alyisa Bravery' name="Peter" profilePic='/profile/moana.png' isOnline={true} hasIcon='' isPinned={true} newMessages={10} />
                <Friends nickname='Alyisa Bravery' name="Peter" profilePic='/profile/moana.png' isOnline={true} hasIcon='' isPinned={true} newMessages={10} />
                <Friends nickname='Alyisa Bravery' name="Peter" profilePic='/profile/moana.png' isOnline={true} hasIcon='' isPinned={true} newMessages={10} />
            </div>


            <div className="w-[400px] lg:w-[600px] h-[750px] flex-shrink-0 rounded-r-3xl rounded-tl-none rounded-bl-none rounded-tr-3xl border border-white/54 bg-white/7 backdrop-blur-[7.5px] flex items-center bg-[rgba(255,255,255,0.07)] flex-col text-white justify-between">
                {/* RIGHT SIDE */}
            </div >

        </div >
    )
}

export default ChatpageSidebar