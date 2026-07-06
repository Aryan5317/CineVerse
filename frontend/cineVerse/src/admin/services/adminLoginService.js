async function loginService(loginDetails) {
    console.log("Login Details in service: ", loginDetails)

    const dataToSend = {
        email: loginDetails.email,
        password: loginDetails.password
    }

    console.log("Data to send to backend: ", dataToSend)

    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/admin/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })

        const data = await response.json()
        console.log("Data recived from backend is: ", data)
        if (!response.ok) {
            console.log("Error from backend login is: ", data.message || data)
            throw new Error(data.message || "Login Error")
        }
        return data;
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error
    }
}

export default loginService