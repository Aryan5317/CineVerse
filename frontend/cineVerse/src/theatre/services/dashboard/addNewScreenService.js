async function addNewScreenService(screenData, theatreId) {
    console.log("Screen Data is: ", screenData)
    console.log("Theatre: ", screenData.seatCategories)
    const dataToSend = {
        screenNumber: screenData.screenNumber,
        screenName: screenData.screenName,
        screenStatus: screenData.screenStatus,
        screenFormat: screenData.screenFormat,
        seatCategories: screenData.seatCategories
    }

    console.log("Data to send is: ", dataToSend)

    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/theatre/add-theatre-screen/${theatreId}`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()
        console.log("Data recived from backend is: ", data)
        if (!response.ok) {
            console.log("Error recived from the backend while adding screen is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}


export default addNewScreenService