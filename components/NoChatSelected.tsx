import React from 'react'
import Image from 'next/image';

const NoChatSelected = () => {
    return (
        <div className='h-full flex justify-center items-center flex-col gap-8'>
            <h1 className='text-white text-[24px] md:text-[40px] not-italic  tracking-[2px] font-bold text-center leading-tight'>SELECT A CHAT <br /> TO START <br /> CHATTING! </h1>
            <Image src='/images/authillustration.png' width={275} height={275} alt='authillustration' />
        </div>
    )
}

export default NoChatSelected