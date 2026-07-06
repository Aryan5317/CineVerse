async function forgetPassword(userDetails) {
    console.log("Email for forget password is: ", userDetails)
    const dataToSend = {
        email: userDetails.email
    }
    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/users/forget-password", {
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
            console.log("Error from backend for forget password is: ", data.message || data)
            throw new Error(data.message || "Forget Password Authentication Failed");
        }
        return data.message;
    } catch (error) {
        console.log("Error fron backend is: ", error)
        throw error;

    }
}

export default forgetPassword