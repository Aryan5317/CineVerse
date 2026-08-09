async function theatreRequestCompleteDetails(id, status) {
    console.log("Id recived to send is: ", id)
    console.log("Status recived is: ", status)
    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/admin/theatre-details/${id}?status=${status}`, {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json()
        console.log("Data from backend while fetching theatre details is: ", data)
        if (!response.ok) {
            console.log("Data recived from backend while fetching details is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error
    }
}

export default theatreRequestCompleteDetails