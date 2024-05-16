import Image from 'next/image'

const AuthProviderButton = ({ provider }: { provider: "google" | "github" }) => {
    return (
        <button className="flex justify-center items-center py-2 px-4  gap-2 bg-[#D9D9D9] bg-opacity-5 border-[1px] border-white rounded-[5px]">
            <Image src={`/icons/${provider}.svg`}
                alt={`${provider} icon`}
                width={48}
                height={48}
            />
            <span className="text-[14px]">Continue with Google</span>
        </button>
    )
}

export default AuthProviderButton