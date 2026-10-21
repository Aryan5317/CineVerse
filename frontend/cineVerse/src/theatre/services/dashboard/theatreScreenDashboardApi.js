async function screenDashboard(theatreId) {

    console.log("Theatre id is: ", theatreId)
    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/theatre/theatre-screen-dashboard/${theatreId}`, {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()
        console.log("Data recived is: ", data)

        if (!response.ok) {
            console.log("Error from backend while getting the theatre dashboard api is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data;
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}

export default screenDashboard