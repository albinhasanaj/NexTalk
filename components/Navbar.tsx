import React from 'react'

const Navbar = () => {
    return (
        <header className='h-[4rem] bg-[#424141] w-full rounded-tl-none rounded-bl-none rounded-tr-3xl flex justify-between items-center px-4'>
            <span>5/23/2024</span>
            <span className='text-[#C0C0C0] font-bold'>Talking to: John Doe</span>
            <span>01:52</span>
        </header>
    )
}

export default Navbar