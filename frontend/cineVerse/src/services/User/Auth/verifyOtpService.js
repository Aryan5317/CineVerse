async function verifyOtp(otpDetails) {

    console.log("Otp details is: ", otpDetails)
    const dataToSend = {
        email: otpDetails.email.trim(),
        otp: otpDetails.otp.trim()
    }

    console.log("Data to send for otp match is: ", dataToSend)

    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/users/verify-otp", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })

        const data = await response.json()
        console.log("Data recived from backend while verifying otp is: ", data)
        if(!response.ok){
            console.log("Error from backend while verifying otp is: ", data.message || data)
            throw new Error(data.message || "OTP not matched")
        }
        return data.message
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error
    }
}

export default verifyOtp