async function registerService(userDetails) {
    console.log("User data received for backend process: ", userDetails)
    const dataToSend = {
        name: userDetails.fullname,
        email: userDetails.email,
        password: userDetails.password,
        phoneNumber: userDetails.mobileNumber
    }

    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(dataToSend)
        })
        const data = await response.json();
        console.log("Response from backend is: ", data);
        if(!response.ok){
            console.log("Register failed ", data.message || data)
            throw new Error(data.message || "Authentication Failed")
        }
        return data.message
    } catch (error) {
        console.log("Error from backend in register service: ", error)
        throw error
    }
}

export default registerService