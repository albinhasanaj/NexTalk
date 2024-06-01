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
        <div>
            <h1>Are you sure you want to logout?</h1>
            <button onClick={handleLogout}>Yes</button>
            <button>No</button>
        </div>
    )
}

export default Logout