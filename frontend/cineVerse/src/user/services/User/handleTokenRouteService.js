async function handleToken (){
    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/users/current-user", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await response.json();
        console.log("Data recived from the current user route is: ", data)
        if(!response.ok){
            console.log("Error from backend current route: ", data.message || data)
            throw new Error(data.message || "Authentication Failed")
        }
        return data;
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}

export default handleToken