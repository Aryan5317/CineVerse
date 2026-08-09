async function adminDashBoardDetails() {
    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/admin/admin-dashboard/details", {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json()
        console.log("Data recived from backend for admin dashboard is: ", data)
        if (!response.ok) {
            console.log("Error from backend for admin dashboard details is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error
    }
}

export default adminDashBoardDetails