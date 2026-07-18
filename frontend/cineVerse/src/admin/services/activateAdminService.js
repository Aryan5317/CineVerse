async function activateAdmin(adminDetailsIdRoute) {
    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/admin/${adminDetailsIdRoute}/activate`, {
            method: "PATCH",
            credentials: "include",
        })

        const data = await response.json()
        console.log("Data from activate backend is: ", data);
        if (!response.ok) {
            console.log("Error from activate admin backend is: ", data.message || data)
            throw new Error(data.message || "Updataion Failed")
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}

export default activateAdmin