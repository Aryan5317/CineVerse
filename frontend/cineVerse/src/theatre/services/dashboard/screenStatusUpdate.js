async function screenStatusUpdate(screenId, theatreId, screenStatus) {
    console.log("Screen id is: ", screenId)
    console.log("Theatre Id is: ", theatreId)
    console.log("Screen Status is: ", screenStatus)

    const dataToSend = {
        screenStatus: screenStatus
    }

    console.log("Data to send is: ", dataToSend)

    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/theatre/screen-status-update/${screenId}/${theatreId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })

        const data = await response.json()
        console.log("Data recived is: ", data)

        if (!response.ok) {
            console.log("Error from backend while updating the screen status is: ", data.message || data)
            throw new Error(data.message || data)
        }

        return data;
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error
    }
}


export default screenStatusUpdate