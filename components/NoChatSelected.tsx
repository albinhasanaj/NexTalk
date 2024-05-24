import React from 'react'
import Image from 'next/image';

const NoChatSelected = () => {
    return (
        <>
            <h1 className='text-[3rem] font-bold text-center mt-[7rem] mb-12 leading-tight'>SELECT A CHAT <br /> TO START <br /> CHATTING! </h1>
            <Image src='/images/authillustration.png' width={275} height={275} alt='authillustration' />
        </>
    )
}

export default NoChatSelected