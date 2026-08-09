async function loginDetailsService(theatreLoginDetails) {
    console.log("Theatre Owner login credentials to send to backend is: ", theatreLoginDetails)

    const dataToSend = {
        email: theatreLoginDetails.email,
        password: theatreLoginDetails.password,
    }

    console.log("Login credential to send is: ", dataToSend)

    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/theatre/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })

        const data = await response.json()
        console.log("Data recived from backend is: ", data)
        if(!response.ok){
            console.log("Error from backend while login theatre is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error
    }

}

export default loginDetailsService