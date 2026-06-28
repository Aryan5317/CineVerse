async function logOutService() {
    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/users/logout", {
            method: "POST",
            credentials: "include",
        })

        const data = await response.json();
        console.log("Data recived from bacekend while logOut is: ", data)
        if(!response.ok){
            console.log("Error from backend is: ", data.message || data)
            throw new Error(data.message || "LogOut failed")
        }
        return data.message
    } catch (error) {
        console.log("Error from backend while logOut is: ", error)
        throw error;
    }
}

export default logOutService