async function createAdminService(newAdminDetails) {
    console.log("New Admin Details is: ", newAdminDetails)

    const dataToSend = {
        fullName: newAdminDetails.fullname,
        email: newAdminDetails.email,
        password: newAdminDetails.password,
        joiningdate: newAdminDetails.date
    }
    console.log("Data to send is: ", dataToSend)

    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/admin/create-admin", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })

        const data = await response.json()

        console.log("Data from backend is: ", data)

        if (!response.ok) {
            console.log("Error from backend is: ", data.message || data)
            throw new Error(data.message || "Create Admin Failed")
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }

}

export default createAdminService