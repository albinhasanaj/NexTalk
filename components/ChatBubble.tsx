import Image from 'next/image'

const ChatBubble = ({ message, isSender, profilePic, username }: ChatBubbleProps) => {

    return (
        <>
            {isSender ? (
                <>
                    <div className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <Image
                                    alt="Chat bubble"
                                    src={profilePic}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                        <div className="chat-header">
                            {username}
                            {/* <time className="text-xs opacity-50">12:46</time> */}
                        </div>
                        <div className="chat-bubble bg-blue-500 text-white break-all"
                        >{message}</div>
                    </div>
                </>
            ) : (
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <Image
                                alt="Chat bubble"
                                src={profilePic}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <div className="chat-header">
                        {username}
                        {/* <time className="text-xs opacity-50">12:45</time> */}
                    </div>
                    <div className="chat-bubble text-white break-all">{message}</div>
                </div>
            )}
        </>
    )
}

export default ChatBubble