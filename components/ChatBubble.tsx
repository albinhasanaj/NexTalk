"use client";
import Image from 'next/image'
import { Fragment } from 'react'
import { useState } from 'react'

const ChatBubble = ({ message, isSender, profilePic, username }: ChatBubbleProps) => {
    const [imgSrc, setImgSrc] = useState<string>(profilePic || '/images/nickname.png');

    return (
        <Fragment>
            {isSender ? (
                <Fragment>
                    <div className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <Image
                                    alt="Chat bubble"
                                    src={imgSrc}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                    onError={() => setImgSrc('/images/nickname.png')}
                                />
                            </div>
                        </div>
                        <div className="chat-header">
                            {username}
                            {/* <time className="text-xs opacity-50">12:46</time> */}
                        </div>
                        <div className="chat-bubble bg-blue-500 text-white break-words text-start"
                        >{message}</div>
                    </div>
                </Fragment>
            ) : (
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <Image
                                alt="Chat bubble"
                                src={imgSrc}
                                width={40}
                                height={40}
                                className="rounded-full"
                                onError={() => setImgSrc('/images/nickname.png')}
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
        </Fragment>
    )
}

export default ChatBubble