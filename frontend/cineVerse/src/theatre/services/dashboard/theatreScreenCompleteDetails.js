async function theatreScreenCompleteDetails(screenId, theatreId) {
    console.log("Theatre Id to send for the screen details is: ", theatreId)
    console.log("Screen id for fetchig the screen Details is: ", screenId)

    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/theatre/theatre-screen-conplete-details/${screenId}/${theatreId}`, {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()
        console.log("Data from backend is: ", data)
        if (!response.ok) {
            console.log("Error from backend while gettting theatre screen details is: ", data.message || data)
            throw new Error;
        }
        return data;
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}


export default theatreScreenCompleteDetails