import React from 'react'

const ChatBubble = ({ message, isSender, profilePic, username }: ChatBubbleProps) => {
    return (
        <>
            {isSender ? (
                <>
                    <div className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS chat bubble component" src={profilePic} />
                            </div>
                        </div>
                        <div className="chat-header">
                            {username}
                            {/* <time className="text-xs opacity-50">12:46</time> */}
                        </div>
                        <div className="chat-bubble bg-blue-500 text-white">{message}</div>
                    </div>
                </>
            ) : (
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
                        </div>
                    </div>
                    <div className="chat-header">
                        {username}
                        {/* <time className="text-xs opacity-50">12:45</time> */}
                    </div>
                    <div className="chat-bubble text-white">{message}</div>
                </div>
            )}
        </>
    )
}

export default ChatBubble