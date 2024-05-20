import React from 'react'

const Searchbar = () => {
    return (
        <form action="">
            <input
                type="search"
                placeholder='Search profile'
                autoComplete='off'
                className="w-[20rem] h-[3rem] rounded-[1rem] bg-[#424141] outline-none placeholder-[rgba(255,255,255,0.5)] text-white text-[0.75rem] font-normal tracking-[0.0375rem] pl-[1rem] mt-[1rem] ring-1 ring-transparent focus:ring-white/50 transition duration-200 ease-in-out"
            />
        </form>
    )
}

export default Searchbar