async function deactivateAdmin(adminDetailsIdRoute) {
    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/admin/${adminDetailsIdRoute}/deactivate`, {
            method: "PATCH",
            credentials: "include",
        })

        const data = await response.json()
        console.log("Data from deactivate backend is: ", data);
        if(!response.ok){
            console.log("Error from deactivate backend is: ", data.message || data)
            throw new Error(data.message || "Updataion Failed")
        }
        return data
    } catch (error) {

        console.log("Error from backend is: ", error)
        throw error;
    }
}

export default deactivateAdmin