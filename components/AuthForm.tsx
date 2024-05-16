import Image from "next/image";
import AuthSidebar from "./AuthSidebar";
import InputField from "./InputField";
import AuthProviderButtons from "./AuthProviderButtons";

const AuthForm = ({ isLogin }: AuthFormProps) => {
    return (
        <>
            {/* LEFT SIDE */}
            <AuthSidebar />
            {/* RIGHT SIDE */}
            {!isLogin ? (
                <div className="w-[400px] lg:w-[600px] h-[750px] rounded-r-3xl rounded-tl-none rounded-bl-none rounded-tr-3xl border border-white border-opacity-50 bg-white/7 backdrop-blur-[7.5px] bg-[rgba(255,255,255,0.07)] text-white flex flex-col items-center">
                    {/* RIGHT SIDE */}
                    <h1 className="text-white text-[40px] not-italic font-bold leading-[normal] tracking-[2px] mb-10 mt-[3.5rem]">
                        Register here</h1>
                    <form className='flex flex-col items-center w-2/3 gap-6'>
                        <div className="w-full flex justify-between gap-4">
                            <InputField label="Username*" placeholder="JohnDoe" customClasses="w-[180px]" type="text" />
                            <InputField label="Nickname" placeholder="Johnny" customClasses="w-[180px]" type="text" />
                        </div>
                        <InputField label="Email Address*" placeholder="johndoe@gmail.com" customClasses="w-full" type="email" />
                        <InputField label="Password*" placeholder="******" customClasses="w-full" type="password" />
                        <InputField label="Confirm Password*" placeholder="******" customClasses="w-full" type="password" />
                        <button type="submit" className="text-black bg-white py-2 w-2/3 rounded-[36px] text-[20px]">
                            Sign Up
                        </button>
                        {/* remember me checkbox */}
                        <div className="flex gap-2 justify-center">
                            <input name="rememberMe" type="checkbox" className="appearance-none w-5 h-5 border-2 border-white rounded bg-transparent cursor-pointer" />
                            <label htmlFor="rememberMe" className="text-[14px] font-normal">Remember Me</label>
                        </div>
                        <AuthProviderButtons />

                    </form >
                </div>
            ) : (
                <div className="w-[400px] lg:w-[600px] h-[750px] rounded-r-3xl rounded-tl-none rounded-bl-none rounded-tr-3xl border border-white border-opacity-50 bg-white/7 backdrop-blur-[7.5px] bg-[rgba(255,255,255,0.07)] text-white flex flex-col items-center">
                    {/* RIGHT SIDE */}
                    <h1 className="text-white text-[40px] not-italic font-bold leading-[normal] tracking-[2px] mb-10 mt-[3.5rem]">
                        Register here</h1>
                    <form className='flex flex-col h-2/3 justify-center items-center w-2/3 gap-6'>
                        <div className="w-full flex justify-between gap-4">
                            <InputField label="Username or Email Address*" placeholder="JohnDoe" customClasses="w-full" type="text" />
                        </div>
                        <InputField label="Password*" placeholder="******" customClasses="w-full" type="password" />
                        <button type="submit" className="text-black bg-white py-2 w-2/3 rounded-[36px] text-[20px]">
                            Sign Up
                        </button>
                        {/* remember me checkbox */}
                        <div className="flex gap-2 justify-center">
                            <input name="rememberMe" type="checkbox" className="appearance-none w-5 h-5 border-2 border-white rounded bg-transparent cursor-pointer" />
                            <label htmlFor="rememberMe" className="text-[14px] font-normal">Remember Me</label>
                        </div>
                        <AuthProviderButtons />

                    </form >
                </div>
            )}

        </>


    )
}

export default AuthForm