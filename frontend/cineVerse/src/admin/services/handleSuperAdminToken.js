async function handleSuperAdminToken (){
    console.log("Handle super admin token")
    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/admin/current-admin", {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()
        console.log("Data from super admin token response is: ", data)
        if(!response.ok){
            console.log("Error from handle super admin token is: ", data.message || data);
            throw new Error(data.message || "Token Error")
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}

export default handleSuperAdminToken