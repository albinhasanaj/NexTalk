import { ReactNode } from 'react'

const ChatLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full h-screen bg-nasa bg-cover bg-no-repeat">
            {children}
        </div>
    )
}

export default ChatLayout