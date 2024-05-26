import Image from 'next/image'
import React from 'react'
import '../app/chat.css'

const Friends = ({ name, nickname, profilePic, isOnline, hasIcon, isPinned, newMessages, handleClick }: FriendProps) => {
    return (
        <div onClick={handleClick} className='h-auto flex w-full items-center justify-center flex-col relative group'>
            {/* ONLINE-STATUS, PROFILE PICTURE */}

            <div className="w-[70%] ">
                <div className='flex items-center w-full'>
                    <div className="flex items-center w-[70%] justify-between">
                        <div className='relative flex items-center'>
                            <Image src={profilePic} alt="profile" width={50} height={50} className="rounded-full" />
                            {isOnline && <span className="bg-green-500 rounded-full h-3 w-3 inline-block absolute z-30 left-[75%] top-[70%]"></span>}
                        </div>

                        {/* NAME, PINNED */}
                        <div className='flex flex-col w-full'>
                            <span className='text-white'>
                                {nickname ? nickname : name}
                                <sup>{isPinned ? "📌" : ""}</sup>
                            </span>
                            {newMessages > 0 && (
                                <span className='text-blue-500 absolute mt-[1.5rem] font-[700]'>New chat</span>
                            )}
                        </div>
                    </div>

                    <div>
                        {/* MESSAGE NOTIFICATION */}
                        {newMessages > 0 && (
                            <span className="bg-blue-500 rounded-full h-3 w-3 inline-block absolute ml-[2rem]"></span>
                        )}
                    </div>
                    <div>
                        <Image
                            src='/icons/gear.svg'
                            width={35}
                            height={35}
                            alt='Gear Icon'
                            className='gear-icon opacity-0 hover:opacity-100 cursor-pointer rounded-full absolute left-[85%] top-[10%]'
                        />
                    </div>
                </div>
            </div>
            <div className='w-[70%] h-[1px] bg-[#939393] mt-10 ' />
        </div>
    )
}

export default Friends  