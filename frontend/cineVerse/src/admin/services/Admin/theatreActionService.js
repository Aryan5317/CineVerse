async function theatreAction(id, status, reason) {
    console.log("Id to send is: ", id)
    console.log("Status to send is: ", status)
    console.log("Reason to send is: ", reason)

    const dataToSend = {
        status: status,
        reason: reason
    }

    console.log("Data to send is: ", dataToSend)

    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/admin/theatre-action/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })
        const data = await response.json()
        console.log("Data recived from backend while editing status : ", data)
        if (!response.ok) {
            console.log("Error from backend while updating the status is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}

export default theatreAction