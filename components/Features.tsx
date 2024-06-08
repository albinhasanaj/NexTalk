import Image from 'next/image'
import React from 'react'

const Features = () => {
    return (
        <div>
            {/* DESKTOP */}
            <div className="hidden md2:flex w-[55rem] h-auto py-10 bg-[#222] rounded-[10px] flex-col justify-center items-center gap-[1rem] shadow-[rgba(120,120,120,50)]">
                <div className="flex gap-[5rem]">
                    <div className="flex items-center gap-[0.5rem] transition duration-300 ease-in-out hover:scale-[1.05]">
                        <Image src="/images/live.png" alt="feature1" width={48} height={48} />
                        <span className="text-[1.5rem] text-white">Real-time chats</span>
                    </div>

                    <div className="flex items-center gap-[0.5rem] transition duration-300 ease-in-out hover:scale-[1.05]">
                        <Image src="/images/customize-profile.png" alt="feature1" width={48} height={48} />
                        <span className="text-[1.5rem] text-white">Customize Profile</span>
                    </div>

                    <div className="flex items-center gap-[0.5rem] transition duration-300 ease-in-out hover:scale-[1.05]">
                        <Image src="/images/nickname.png" alt="feature1" width={48} height={48} />
                        <span className="text-[1.5rem] text-white">Nicknames</span>
                    </div>
                </div>

                <div className="flex gap-[5rem]">
                    <div className="flex items-center gap-[0.5rem] transition duration-300 ease-in-out hover:scale-[1.05]">
                        <Image src="/images/pin-friends.png" alt="feature1" width={48} height={48} />
                        <span className="text-[1.5rem] text-white">Pin Friends</span>
                    </div>

                    <div className="flex items-center gap-[0.5rem] transition duration-300 ease-in-out hover:scale-[1.05]">
                        <Image src="/images/reaction.png" alt="feature1" width={48} height={48} />
                        <span className="text-[1.5rem] text-white">Reactions</span>
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            <div className='my-2 flex md2:hidden bg-[#222] w-[17rem] h-auto py-7 gap-6 flex-col pl-5 rounded-[10px]'>
                <div className="flex items-center gap-[0.5rem] transition duration-300 ease-in-out hover:scale-[1.05]">
                    <Image src="/images/live.png" alt="feature1" width={36} height={36} />
                    <span className="text-[1rem] text-white">Real-time chats</span>
                </div>

                <div className="flex items-center gap-[0.5rem] transition duration-300 ease-in-out hover:scale-[1.05]">
                    <Image src="/images/customize-profile.png" alt="feature1" width={36} height={36} />
                    <span className="text-[1rem] text-white">Customize Profile</span>
                </div>

                <div className="flex items-center gap-[0.5rem] transition duration-300 ease-in-out hover:scale-[1.05]">
                    <Image src="/images/nickname.png" alt="feature1" width={36} height={36} />
                    <span className="text-[1rem] text-white">Nicknames</span>
                </div>

                <div className="flex items-center gap-[0.5rem] transition duration-300 ease-in-out hover:scale-[1.05]">
                    <Image src="/images/pin-friends.png" alt="feature1" width={36} height={36} />
                    <span className="text-[1rem] text-white">Pin Friends</span>
                </div>

                <div className="flex items-center gap-[0.5rem] transition duration-300 ease-in-out hover:scale-[1.05]">
                    <Image src="/images/reaction.png" alt="feature1" width={36} height={36} />
                    <span className="text-[1rem] text-white">Reactions</span>
                </div>
            </div>
        </div>
    )
}

export default Features