import TryForFreeBtn from "./TryForFreeBtn";

const Logout = () => {

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                window.location.href = "/login";
            }
        } catch (error) {

        }

    }

    return (
        <div className="size-full">
            {/* DESKTOP */}
            <div className="md:flex hidden backdrop-blur-3xl w-full h-full items-center justify-center">
                <div className="bg-[#ffffff] bg-opacity-[5%] py-8 px-8 md:px-16 rounded-3xl space-y-4">
                    <p className="text-center font-bold text-[16px] md:text-[20px]">Are you sure you want <br /> to log out?</p>
                    <div className="flex gap-12 w-full">
                        <button className="py-1 md:py-2 w-[64px] sm:w-[84px] md:w-[100px] lg:w-[120px] font-bold border-[rgba(0,255,240,0.5)] border-[3px] border-solid rounded-md text-[12px] md:text-[16px] hover:bg-[rgba(0,255,240,0.5)]"
                            onClick={() => window.location.href = "/chatpage"}
                        >Stay</button>
                        <button className="py-1 md:py-2 w-[64px] sm:w-[84px] md:w-[100px] lg:w-[120px] font-bold border-[#D83C3E] border-[3px] rounded-md text-[12px] md:text-[16px] hover:bg-[#D83C3E] hover:text-black"
                            onClick={handleLogout}
                        >Log Out</button>
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            <div className="md:hidden w-full h-full flex flex-col items-center justify-center">
                <div className="bg-[#fff] bg-opacity-[5%] flex flex-col w-[75%] py-8 px-8 md:px-16 rounded-3xl space-y-4">
                    <p className="text-center font-bold text-[16px] md:text-[20px]">Are you sure you want <br /> to log out?</p>
                    <div className="flex gap-3 w-full flex-col items-center">
                        <button className="py-1 w-[95%]  font-bold border-[rgba(0,255,240,)] border-[3px] border-solid rounded-md text-[12px] md:text-[16px] hover:bg-[#00FFF0] hover:text-black"
                            onClick={() => window.location.href = "/chatpage"}
                        >Stay</button>
                        <button className="py-1 w-[95%]  font-bold border-[#D83C3E] border-[3px] rounded-md text-[12px] md:text-[16px] hover:bg-[#D83C3E] hover:text-black"
                            onClick={handleLogout}
                        >Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logout