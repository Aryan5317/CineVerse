async function theatrePendingRequest(statusValue) {
    console.log("Status value to send to backend is: ", statusValue)
    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/admin/pending-request?theatreStatus=${statusValue}`, {
            method: "GET",
            credentials: "include",
        })
        const data = await response.json()
        console.log("Data from backend is: ", data)
        if (!response.ok) {
            console.log("Error from backend while fetching the pending theatre request is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error
    }
}

export default theatrePendingRequest