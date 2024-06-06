"use client";
import Image from 'next/image'
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useChatSessionStore } from '@/store/useStore';
import toast from 'react-hot-toast';

const Settings = () => {
    const { userProfilePic, setUserProfilePic } = useChatSessionStore(state => ({
        userProfilePic: state.userProfilePic,
        setUserProfilePic: state.setUserProfilePic

    }));

    const [imgSrc, setImgSrc] = useState<string>(userProfilePic || '/images/nickname.png');

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const fileInputRef = useRef(null);

    const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append("file", file);

            // Upload the file to your server or directly to the storage service
            try {
                const response = await fetch("/api/profile/update-profile-pic", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Failed to upload image");
                }

                const data = await response.json();
                // Assume the server returns the URL of the stored image
                setImgSrc(data.imageUrl);
                setUserProfilePic(data.imageUrl);
                toast.success('Image uploaded successfully');
            } catch (error) {
                toast.error('Failed to upload image');
                console.error(error);
            }
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            (fileInputRef.current as any).click();
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // check if confirmPassword is included

            const response = await fetch('/api/profile/update-profile-credentials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }

    };

    return (
        <div className='flex flex-col items-center gap-4 h-full justify-center'>
            <div className="relative w-[100px] h-[100px] mb-6">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChangeImage}
                    style={{ display: 'none' }}
                    accept="image/*"
                />
                <Image
                    src={imgSrc}
                    layout="fill"  // This makes the image fill the container
                    objectFit="cover"  // This ensures the image covers the area without distorting aspect ratio
                    alt='Profile Picture'
                    className='rounded-full cursor-pointer'
                    onError={() => setImgSrc('/images/nickname.png')}
                    onClick={handleImageClick}
                />
                <div className="absolute w-[100px] h-[100px] flex justify-center items-center rounded-full bg-black bg-opacity-0 hover:bg-opacity-60">
                    <Image
                        src='/icons/edit.svg'
                        width={100}
                        height={100}
                        alt='Edit Icon'
                        className='opacity-0 hover:opacity-100 p-6 cursor-pointer rounded-full'
                        onClick={handleImageClick}
                    />
                </div>
            </div>

            <div className='flex flex-col'>
                <label htmlFor="ChangeUsername">Change Username</label>
                <input id='ChangeUsername' type="text" placeholder='johndoe' className="py-2 px-4 rounded-[5px] bg-[#424242] bg-opacity-10 border-[1px] border-white/50 placeholder:text-[14px] text-[14px] outline-none w-[300px]"
                    name='username'
                    onChange={handleChange}
                />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
                <div className='flex flex-col'>
                    <label htmlFor="ChangeEmailAddress">Change Email Address</label>
                    <input id='ChangeEmailAddress' type="email" placeholder='johndoe@gmail.com' className="py-2 px-4 rounded-[5px] bg-[#424242] bg-opacity-10 border-[1px] border-white/50 placeholder:text-[14px] text-[14px] outline-none w-[300px]"
                        name='email'
                        onChange={handleChange}
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="ChangePassword">Change Password</label>
                    <input id='ChangePassword' type="password" placeholder='******' className="py-2 px-4 rounded-[5px] bg-[#424242] bg-opacity-10 border-[1px] border-white/50 placeholder:text-[14px] text-[14px] outline-none w-[300px]"
                        name='password'
                        onChange={handleChange}
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="ConfirmPassword">Confirm Password*</label>
                    <input id='ConfirmPassword' type="password" placeholder='******' className="py-2 px-4 rounded-[5px] bg-[#424242] bg-opacity-10 border-[1px] border-white/50 placeholder:text-[14px] text-[14px] outline-none w-[300px]"
                        name='confirmPassword'
                        onChange={handleChange}
                    />
                </div>
                <button className='bg-[#4D4D4D] w-[20rem] h-[3rem] rounded-[1rem] outline-none placeholder-[rgba(255,255,255,0.5)] text-white text-[0.75rem] font-normal tracking-[0.0375rem] pl-[1rem] mt-[1rem] ring-1 ring-transparent hover:ring-white/50 hover:bg-[#585858] transition-all duration-200 ease-in-out'>Submit Changes</button>
            </form>
        </div>
    )
}

export default Settings