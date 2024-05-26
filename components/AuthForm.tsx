"use client";
import AuthSidebar from "./AuthSidebar";
import InputField from "./InputField";
import AuthProviderButtons from "./AuthProviderButtons";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AuthForm = ({ isLogin }: AuthFormProps) => {
    const router = useRouter();

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLogin) {
            try {
                const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                });

                if (response.ok) {
                    alert("Logged in successfully");
                    router.push("/chatpage");
                }
            } catch (error) {
                console.log(error);
            }

        } else {
            try {
                // fetch to backend
                const response = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(values)
                });
                if (response.ok) {
                    alert("User created successfully");
                    router.push("/chatpage");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <AuthSidebar href={isLogin ? "/signup" : "/login"} />
            {/* RIGHT SIDE */}
            <div className="w-[300px] md:w-[500px] md:h-[600px] lg:w-[600px] h-auto lg:h-[750px] md:rounded-r-3xl md:rounded-tl-none md:rounded-bl-none md:rounded-tr-3xl border border-white border-opacity-50 bg-white/7 backdrop-blur-[7.5px] bg-[rgba(255,255,255,0.07)] text-white flex flex-col items-center py-8 gap-8 rounded-3xl">
                <h1 className="text-white text-[24px] md:text-[40px] not-italic font-bold leading-[normal] tracking-[2px]">
                    {isLogin ? "Log In here" : "Register here"}</h1>
                <form onSubmit={onFormSubmit} className='flex flex-col items-center w-2/3 gap-2 lg:gap-6 my-auto'>
                    <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
                        {isLogin ? (
                            <InputField label="Username or Email Address*" placeholder="JohnDoe" customClasses="w-full" type="text"
                                handleChange={handleChange}
                                name="usermail"
                            />
                        ) : (
                            <InputField label="Username*" placeholder="JohnDoe" customClasses="w-full" type="text"
                                name="username" handleChange={handleChange}
                            />
                        )}
                    </div>
                    {isLogin ? (
                        <InputField label="Password*" placeholder="******" customClasses="w-full" type="password"
                            name="password" handleChange={handleChange}
                        />
                    ) : (
                        <>
                            <InputField label="Email Address*" placeholder="johndoe@gmail.com" customClasses="w-full" type="email"
                                name="email" handleChange={handleChange}
                            />
                            <InputField label="Password*" placeholder="******" customClasses="w-full" type="password"
                                name="password" handleChange={handleChange}
                            />
                        </>
                    )}
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex gap-2 justify-center items-center">
                            <input name="rememberMe" type="checkbox" className="appearance-none w-3 h-3 lg:w-5 lg:h-5 border-2 border-white rounded bg-transparent cursor-pointer" />
                            <label htmlFor="rememberMe" className="text-[14px] font-normal">Remember Me</label>
                        </div>

                        <button type="submit" className="text-black bg-white py-2 w-2/3 rounded-[36px] text-[14px] font-semibold lg:text-[20px]">
                            {isLogin ? "Sign In" : "Sign Up"}
                        </button>
                        {/* remember me checkbox */}
                        <AuthProviderButtons />
                        <div className="flex md:hidden">
                            <Link
                                href={isLogin ? "/signup" : "/login"}
                                className="text-[14px] text-[#7f4bf8]">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                            </Link>
                        </div>
                    </div>

                </form >
            </div>
        </>


    )
}

export default AuthForm