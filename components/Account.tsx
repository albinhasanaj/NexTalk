import Image from 'next/image'
import React, { useState } from 'react'
import '../app/chat.css'
import { GrUserAdd } from "react-icons/gr";
import { GoGear } from "react-icons/go";


const Account = ({ name, nickname, profilePic, isOnline, hasIcon, isPinned: initialIsPinned, newMessages, handleClick, isFriend }: AccountProps) => {
    const [isPinned, setIsPinned] = useState(initialIsPinned);

    const togglePin = () => {
        setIsPinned(!isPinned);
    };

    return (
        <div className='flex flex-col items-center w-full gap-4'>
            {/* ONLINE-STATUS, PROFILE PICTURE */}
            <div className="flex justify-between items-center w-[90%]" >
                <div onClick={handleClick} className='flex items-center hover:bg-white hover:bg-opacity-10 hover:rounded-full w-full cursor-pointer'>
                    <div className='relative mr-3'>
                        <Image src={profilePic} alt="profile" width={50} height={50} className="rounded-full" />
                        {isOnline && <span className="bg-green-500 rounded-full h-3 w-3 absolute bottom-0 right-0" />}
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex items-center text-white text-nowrap relative'>
                            <span>{nickname ? nickname : name}</span>
                            {isPinned && <sup className="absolute left-[100%] top-[10%]">📌</sup>}
                        </div>
                        {isFriend && (
                            <span className={`text-sm ${newMessages! > 0 ? 'text-blue-500' : 'text-gray-500'}`}>
                                {newMessages! > 0 ? 'New chat' : 'Tap to chat'}
                            </span>
                        )
                        }
                    </div>
                </div>
                {isFriend && newMessages! > 0 && (
                    <span className="bg-blue-500 rounded-full h-3 w-3 ml-2" />

                )}
                <div className='flex items-center'>
                    <div className="dropdown">
                        <label tabIndex={0} className='btn m-1 bg-transparent border-none hover:bg-transparent'>
                            {isFriend ? (
                                <GoGear className='cursor-pointer opacity-50 hover:opacity-100 w-[25px] h-auto' />
                            ) : (
                                <GrUserAdd className='cursor-pointer opacity-50 hover:opacity-100 w-[25px] h-auto' />
                            )}
                        </label>
                        {isFriend ? (
                            <>
                                <ul tabIndex={0} className="menu bg-base-200 rounded-box dropdown-content z-[1] right-1 w-[150px]">
                                    <li><a>Set nickname</a></li>
                                    <li><a onClick={togglePin}>{isPinned ? 'Unpin chat' : 'Pin chat📌'}</a></li>
                                    <li>
                                        <details open>
                                            <summary>EMOJI</summary>
                                            <ul>
                                                <li><a>1</a></li>
                                                <li><a>2</a></li>
                                                <li><a>3</a></li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li><a>Unfriend</a></li>
                                </ul>
                            </>
                        )
                            : (
                                <>
                                    <ul tabIndex={0} className="menu bg-base-200 rounded-box dropdown-content z-[1] right-1 w-[150px]">
                                        <li><a>Add friend</a></li>
                                        <li><a>Block</a></li>
                                        <li><a>Report</a></li>
                                    </ul>
                                </>
                            )}
                    </div>
                </div>
            </div>
            <div className='w-[70%] h-px bg-gray-600' />
        </div>
    )
}

export default Account