import { signIn } from 'next-auth/react';
import Image from 'next/image'

const AuthProviderButton = ({ provider }: { provider: "github" | "google" }) => {

    const handleClick = async () => {
        try {
            await signIn(provider, { redirect: false, callbackUrl: "/chatpage" });
        } catch (error) {
            console.error("Error signing in with ", error);
        }
    }

    return (
        <button className="flex justify-center items-center py-2 px-4 gap-2 bg-[#D9D9D9] bg-opacity-5 border-[1px] border-white rounded-[5px]"
            onClick={handleClick}
            type="button"
        >
            <Image src={`/icons/${provider}.svg`}
                alt={`${provider} icon`}
                width={32}
                height={32}
                className='object-contain'
            />
            <span className="hidden md:block text-[14px]">Continue with {provider[0].toUpperCase() + provider.slice(1)}</span>
        </button>
    )
}

export default AuthProviderButton