async function updateAdminDetails(adminDetails, adminDetailsIdRoute) {
    console.log("Admin details to update reach the service page", adminDetails)

    const dataToSend = {
        fullName: adminDetails.fullName,
        mobileNumber: adminDetails.mobileNumber,
        joiningdate: adminDetails.joiningdate,
    }

    console.log("Data to send is: ", dataToSend)

    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/admin/update-admin/${adminDetailsIdRoute}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })

        const data = await response.json()

        if (!response.ok) {
            console.log("Error from update admin backend is: ", data.message || data)
            throw new Error(data.message || "Update failed")
        }

        return data;

    } catch (error) {
        console.log("Error from the backend is: ", error)
        throw error;
    }
}


export default updateAdminDetails