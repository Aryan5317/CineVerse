function newActorValidation(actorDetails) {
    const errors = {}
    console.log("Actor details recived for validation: ", actorDetails)
    if (!actorDetails.actorName.trim()) {
        errors.actorName = "*Enter the actor name"
    }
    if (!actorDetails.actorGender.trim()) {
        errors.actorGender = "*Enter the actor gender"
    }
    return errors
}

export default newActorValidation