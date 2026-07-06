async function refreshToken() {
    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/users/refresh-token", {
            method: "POST",
            credentials: "include",
        })

        const data = await response.json();
        console.log("Data recived for updation of token is: ", data)
        if (!response.ok) {
            console.log("Error from backend while token updation is: ", data.message || data)
            throw new Error(data.message || "Token updation failed")
        }
        return data.message
    } catch (error) {
        console.log("Error while token updation is: ", error)
        throw error;
    }

}

export default refreshToken