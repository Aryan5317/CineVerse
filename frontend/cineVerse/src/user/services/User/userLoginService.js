async function loginService(userDetails) {
    console.log("Login user details recived in service is: ", userDetails)
    const dataToSend = {
        email: userDetails.email,
        password: userDetails.password
    }
    console.log("Data to send: ", dataToSend)
    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(dataToSend),
        })

        const data = await response.json()
        console.log("Response from backend is: ", data)
        if(!response.ok){
            console.log("Login failed: ", data.message || data)
            throw new Error(data.message || "Authentication Failed")
        }
        return data.message
        
    } catch (error) {
        console.log("Error while sending data to backend", error)
        throw error
    }
}

export default loginService