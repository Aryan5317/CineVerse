async function logOutService() {
    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/admin/logout", {
            method: "POST",
            credentials: "include",
        })
        const data = await response.json()
        console.log("Data from backend is: ", data)
        if (!response.ok) {
            console.log("Error from admin logout backend is: ", data.message || data)
            throw new Error(data.message || "Admin LogOut Error")
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}

export default logOutService