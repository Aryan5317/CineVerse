async function getAllAdmindetails (){
    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/admin/get-all-admins", {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()
        console.log("Data from get all admin backend is: ", data)
        if(!response.ok){
            console.log("Error from backend from all admin details: ", data || data.message)
            throw new Error(data.message || "Admin Details Failed");
        }
        return data;
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}

export default getAllAdmindetails