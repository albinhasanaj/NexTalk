import Image from 'next/image'
import React from 'react'

const Friends = ({ name, nickname, profilePic, isOnline, hasIcon, isPinned, newMessages }: FriendProps) => {
    return (
        <div className='h-auto flex w-full items-center justify-center flex-col'>
            {/* ONLINE-STATUS, PROFILE PICTURE */}

            <div>
                <div className='flex justify-around items-center'>
                    <div className="flex items-center gap-[1rem]">
                        <div className='relative flex items-center'>
                            <Image src={profilePic} alt="profile" width={50} height={50} className="rounded-full" />
                            {isOnline && <span className="bg-green-500 rounded-full h-3 w-3 inline-block absolute z-30 left-[75%] top-[70%]"></span>}
                        </div>

                        {/* NAME, PINNED */}
                        <div className='flex flex-col'>
                            <span className='text-white'>
                                {isPinned ? "📌" : ""}
                                {nickname ? nickname : name}
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
                </div>
            </div>
            <div className='w-[70%] h-[1px] bg-[#939393] mt-10 ' />
        </div>
    )
}

export default Friends  