import Image from 'next/image'
import React from 'react'

interface ChatNavbarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatNavbar = ({ isOpen, setIsOpen }: ChatNavbarProps) => {
    return (
        // <Image src={isOpen ? "/icons/cross.svg" : "/icons/burger-menu.svg"}
        <nav className="w-full flex justify-end p-8 md:hidden">
            <Image
                src={isOpen ? "/icons/cross.svg" : "/icons/burger-menu.svg"}
                alt="Hamburger Menu"
                width={64}
                height={64}
                className="cursor-pointer"
                onClick={() => setIsOpen(prev => !prev)}
            />
        </nav>
    )
}

export default ChatNavbar