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
        <div className="backdrop-blur-3xl w-full h-full flex items-center justify-center">
            <div className="bg-[#26252A] py-8 px-16 rounded-3xl space-y-4">
                <p className="text-center font-bold text-[20px]">Are you sure you want <br /> to log out?</p>
                <div className="flex gap-12 w-full">
                    <button className="py-2 w-[120px] font-bold bg-[#2AB906] rounded-md"
                        onClick={() => window.location.href = "/chatpage"}
                    >Stay</button>
                    <button className="py-2 w-[120px] font-bold bg-[#D83C3E] rounded-md"
                        onClick={handleLogout}
                    >Log Out</button>
                </div>
            </div>
        </div>
    )
}

export default Logout