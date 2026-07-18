async function adminDetails(adminDetailsIdRoute) {
    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/admin/admin-detail/${adminDetailsIdRoute}`, {
            method: "Get",
            credentials: "include"
        })

        const data = await response.json()
        console.log("Response data is: ", data)
        
        if (!response.ok) {
            console.log("Error from backend during admin details is: ", data.message || data)
            throw new Error(data.message || "Fetching Error")
        }

        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}

export default adminDetails