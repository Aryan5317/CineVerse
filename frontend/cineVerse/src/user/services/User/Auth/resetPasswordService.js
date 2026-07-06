async function resetPassword(passwordDetails) {

    console.log("Password details in reset service is: ", passwordDetails)
    const dataToSend = {
        newPassword: passwordDetails.newPassword.trim(),
        confirmPassword: passwordDetails.confirmPassword.trim()
    }
    console.log("Data to send is for password reset:  ", dataToSend)
    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/users/reset-password", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })

        const data = await response.json()
        console.log("Data recived from backend for password reset is: ", data)
        if (!response.ok) {
            console.log("Error from backend while password reset is: ", data.message || data)
            throw new Error(data.message || "Reset Password Error")
        }
        return data.message
    } catch (error) {
        console.log("Error from backend is:  ", error)
        throw error
    }
}

export default resetPassword