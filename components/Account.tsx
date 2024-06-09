"use client";
import Image from 'next/image'
import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import '../app/chat.css'
import { GrUserAdd } from "react-icons/gr";
import { GoGear } from "react-icons/go";
import toast from 'react-hot-toast';
import { useSelectedFriendStore, useUserStore, useFriendsListStore } from '@/store/useStore';

const Account = ({ username, nickname, profilePic, isOnline, hasIcon, isPinned, newMessages, handleClick, isFriend, id, refreshFriends, socket }: AccountProps) => {
    const [imgSrc, setImgSrc] = useState<string>(profilePic || '/images/nickname.png');

    const { userId } = useUserStore(state => ({
        userId: state.userId,
    }));
    const { receiverNickname, setReceiverNickname, setReceiverUsername } = useSelectedFriendStore(state => ({
        receiverNickname: state.receiverNickname,
        setReceiverNickname: state.setReceiverNickname,
        setReceiverUsername: state.setReceiverUsername,
    }));

    const { setFriends } = useFriendsListStore(state => ({
        setFriends: state.setFriends,
    }));

    const [nickNameSocket, setNickNameSocket] = useState<string | null>('');
    const [isPinnedSocket, setIsPinnedSocket] = useState<boolean>(isPinned || false);
    const friendId = id;

    const [values, setValues] = useState({
        nickname: nickname || ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleAddFriend = async () => {
        try {
            const response = await fetch('/api/friends/addFriend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ friendId }),
            });

            if (!response.ok) {
                throw new Error('Failed to add friend');
            }

            toast.success('Friend added successfully');
        } catch (error) {
            toast.error((error as Error).message);
            console.error(error);
        }
    };

    const handleUnfriend = async () => {
        try {
            const response = await fetch('/api/friends/removeFriend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ friendId }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove friend');
            }

            toast.success('Friend removed successfully');
            if (refreshFriends) {
                refreshFriends();
            }

        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.on('updated-nickname', (data: { friendId: string, nickname: string }) => {
            if (data.friendId === id) {
                if (data.nickname === "") {
                    setReceiverUsername(username);
                    setNickNameSocket(username);
                    setReceiverNickname(new Map([[data.friendId, username]]));
                    setFriends({ friendId: data.friendId, nickname: username });
                } else {
                    setReceiverUsername(data.nickname);
                    setNickNameSocket(data.nickname);
                    setReceiverNickname(new Map([[data.friendId, data.nickname]]));
                    setFriends({ friendId: data.friendId, nickname: data.nickname });
                }
            }
        });

        return () => {
            if (socket) {
                socket.off('updated-nickname');
            };

        }
    }, [socket]);

    const handleUpdatenickname = async () => {
        const { nickname } = values;

        if (nickname.length > 20) {
            toast.error('Nickname must be less than 20 characters');
            return;
        }

        try {
            socket.emit('update-nickname', userId, friendId, nickname);
        } catch (error) {
            console.error(error);
            toast.error('Failed to update nickname');

        }
    }

    const togglePin = async () => {
        const newPinState = !isPinnedSocket;
        setIsPinnedSocket(newPinState);
        try {
            socket.emit('update-pin', userId, friendId, !isPinned);
        } catch (error) {
            console.error(error);
            toast.error('Failed to update pin');
            setIsPinnedSocket(!newPinState);
        }
    };

    return (
        <div className='flex flex-col items-center w-full gap-4'>
            {/* ONLINE-STATUS, PROFILE PICTURE */}
            <div className="flex justify-between items-center w-[90%]" >
                <div onClick={handleClick} className='flex items-center hover:bg-white hover:bg-opacity-10 hover:rounded-full w-full cursor-pointer'>
                    <div className='relative mr-3'>
                        <Image src={imgSrc} alt="profile" width={50} height={50} className="rounded-full"
                            onError={() => setImgSrc('/images/nickname.png')}
                        />
                        {isFriend && (
                            <Fragment>
                                {isOnline ? (
                                    <span className="bg-green-500 rounded-full h-3 w-3 absolute bottom-0 right-0" />
                                ) : (
                                    <span className="bg-gray-500 rounded-full h-3 w-3 absolute bottom-0 right-0" />
                                )}
                            </Fragment>

                        )}
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex items-center text-white text-nowrap relative'>
                            <span>
                                {nickNameSocket ? nickNameSocket : receiverNickname.get(friendId) ? receiverNickname.get(friendId) : nickname ? nickname : username}
                            </span>
                            {isPinnedSocket && (
                                <sup className="absolute left-[100%] top-[10%]">📌</sup>
                            )}

                        </div>
                        {isFriend && (
                            <span className={`text-sm ${newMessages! ? 'text-blue-500' : 'text-gray-500'}`}>
                                {newMessages! ? 'New chat' : 'Tap to chat'}
                            </span>
                        )
                        }
                    </div>
                </div>
                {isFriend && newMessages! && (
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>

                )}
                <div className='flex items-center'>
                    <div className="dropdown">
                        <label tabIndex={0} className='btn m-1 bg-transparent border-none hover:bg-transparent'>
                            {isFriend ? (
                                <GoGear className='cursor-pointer opacity-50 hover:opacity-100 w-[25px] h-auto' />
                            ) : (
                                <GrUserAdd className='cursor-pointer opacity-50 hover:opacity-100 w-[25px] h-auto' />
                            )}
                        </label>
                        {isFriend ? (
                            <Fragment>
                                <ul tabIndex={0} className="menu bg-base-200 rounded-box dropdown-content z-[1] right-1 w-[150px]">
                                    <li>
                                        <input type="text" placeholder='Set nickname'
                                            className='w-full py-2 rounded-md text-white bg-base-200 hover:cursor-text'
                                            name="nickname"
                                            value={values.nickname}
                                            onChange={handleChange}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleUpdatenickname();
                                                }
                                            }}
                                        />
                                    </li>
                                    <li><a onClick={togglePin}>{isPinnedSocket ? 'Unpin' : 'Pin chat📌'}</a></li>
                                    <li className="mt-4"><a
                                        onClick={handleUnfriend}
                                    >Unfriend</a></li>
                                </ul>
                            </Fragment>
                        )
                            : (
                                <Fragment>

                                    <ul tabIndex={0} className="menu bg-base-200 rounded-box dropdown-content z-[1] right-1 w-[150px]">
                                        <li><a
                                            onClick={handleAddFriend}
                                        >Add friend</a></li>
                                    </ul>
                                </Fragment>
                            )}
                    </div>
                </div>
            </div>
            <div className='w-[70%] h-px bg-gray-600' />
        </div>
    )
}

export default Account