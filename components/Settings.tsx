import Image from 'next/image'
import React from 'react'

const Settings = () => {
    return (
        <div className='flex flex-col items-center gap-4'>
            <div className="relative w-[100px] h-[100px]">
                <Image
                    src='/profile/moana.png'
                    width={100}
                    height={100}
                    alt='Profile Picture'
                    className='rounded-full my-6'
                />
                <div className="absolute w-[100px] h-[100px] top-6 flex justify-center items-center rounded-full bg-black bg-opacity-0 hover:bg-opacity-60">
                    <Image
                        src='/icons/edit.svg'
                        width={100}
                        height={100}
                        alt='Edit Icon'
                        className='opacity-0 hover:opacity-100 p-6 cursor-pointer rounded-full'
                    />
                </div>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="ChangeNickname" className='mt-10'>Change Nickname</label>
                <input id='ChangeNickname' type="text" placeholder='John Doe' className="py-2 px-4 rounded-[5px] bg-[#424242] bg-opacity-10 border-[1px] border-white/50 placeholder:text-[14px] text-[14px] outline-none w-[300px]" />
            </div>

            <div className='flex flex-col'>
                <label htmlFor="ChangeUsername">Change Username</label>
                <input id='ChangeUsername' type="text" placeholder='johndoe' className="py-2 px-4 rounded-[5px] bg-[#424242] bg-opacity-10 border-[1px] border-white/50 placeholder:text-[14px] text-[14px] outline-none w-[300px]" />
            </div>

            <div className='flex flex-col'>
                <label htmlFor="ChangeEmailAddress">Change Email Address</label>
                <input id='ChangeEmailAddress' type="email" placeholder='johndoe@gmail.com' className="py-2 px-4 rounded-[5px] bg-[#424242] bg-opacity-10 border-[1px] border-white/50 placeholder:text-[14px] text-[14px] outline-none w-[300px]" />
            </div>

            <div className='flex flex-col'>
                <label htmlFor="ChangePassword">Change Password</label>
                <input id='ChangePassword' type="password" placeholder='******' className="py-2 px-4 rounded-[5px] bg-[#424242] bg-opacity-10 border-[1px] border-white/50 placeholder:text-[14px] text-[14px] outline-none w-[300px]" />
            </div>

            <div className='flex flex-col'>
                <label htmlFor="ConfirmPassword">Confirm Password*</label>
                <input id='ConfirmPassword' type="password" placeholder='******' className="py-2 px-4 rounded-[5px] bg-[#424242] bg-opacity-10 border-[1px] border-white/50 placeholder:text-[14px] text-[14px] outline-none w-[300px]" />
            </div>
            <button className='bg-[#4D4D4D] w-[20rem] h-[3rem] rounded-[1rem] outline-none placeholder-[rgba(255,255,255,0.5)] text-white text-[0.75rem] font-normal tracking-[0.0375rem] pl-[1rem] mt-[1rem] ring-1 ring-transparent hover:ring-white/50 hover:bg-[#585858] transition-all duration-200 ease-in-out'>Submit Changes</button>
        </div>
    )
}

export default Settings