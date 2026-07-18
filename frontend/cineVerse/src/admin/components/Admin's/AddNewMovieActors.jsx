import React, { useEffect } from "react"
import { useState } from "react"
import newActorValidation from "../../context/Admin/addNewActorDetailsValidation.js"
function AddNewMovieActors({ setAddActor, setMovieDetails, setAddCastMessage }) {

    const [castMemberNumber, setCastMemberNumber] = useState(1)
    const initalActorDetails = {
        actorName: "",
        actorGender: "",
    }
    const [actorDetails, setNewActorDetails] = useState(initalActorDetails)
    const [errors, setErrors] = useState({})

    const SetActorName = (e) => {
        const { name, value } = e.target

        setNewActorDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetActorGender = (e) => {
        const { name, value } = e.target;
        setNewActorDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const AddAnotherCast = () => {
        const actorValidationResponse = newActorValidation(actorDetails)
        console.log("Actor validation response before adding new actor: ", actorValidationResponse)
        if (Object.keys(actorValidationResponse).length !== 0) {
            setErrors(actorValidationResponse)
            return;
        }
        setErrors({})
        setAddActor(true)
        setCastMemberNumber((prev) => prev + 1)
        setMovieDetails((prev) => ({
            ...prev,
            movieActors: [...prev.movieActors, actorDetails]
        }))
        setNewActorDetails(initalActorDetails)
    }

    const AddCompleteDetails = () => {
        const actorValidationResponse = newActorValidation(actorDetails)
        console.log("Actor validation response is: ", actorValidationResponse)
        if (Object.keys(actorValidationResponse).length !== 0) {
            setErrors(actorValidationResponse)
            return;
        }
        setErrors({})
        setMovieDetails((prev) => ({
            ...prev,
            movieActors: [...prev.movieActors, actorDetails]
        }))
        setAddCastMessage(true)
        setAddActor((prev) => !prev)
    }

    const RemoveAddNewActorComponent = (e) => {
        console.log("Remove add new actor component button is clicked")
        setAddActor(false)
    }



    return (
        <>
            <div className="w-full space-y-6">

                <div className="border-b border-slate-200 pb-4">

                    <h1 className="text-2xl font-bold text-slate-900">
                        Add Cast Member
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Enter actor details below.
                    </p>

                </div>

                <div>

                    <h1 className="mb-2 font-semibold text-slate-700">
                        Cast Member {castMemberNumber}
                    </h1>

                    <input
                        type="text"
                        name="actorName"
                        value={actorDetails.actorName}
                        onChange={SetActorName}
                        placeholder="Enter actor name"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                    />

                    {errors.actorName && (

                        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                            {errors.actorName}

                        </p>

                    )}

                </div>

                <div>

                    <h1 className="mb-3 font-semibold text-slate-700">
                        Gender
                    </h1>

                    <div className="space-y-3">

                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">

                            <input
                                type="radio"
                                name="actorGender"
                                value="Male"
                                checked={actorDetails.actorGender === "Male"}
                                onChange={SetActorGender}
                                className="h-5 w-5 accent-blue-600"
                            />

                            <span className="font-medium text-slate-700">
                                Male
                            </span>

                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">

                            <input
                                type="radio"
                                name="actorGender"
                                value="Female"
                                checked={actorDetails.actorGender === "Female"}
                                onChange={SetActorGender}
                                className="h-5 w-5 accent-blue-600"
                            />

                            <span className="font-medium text-slate-700">
                                Female
                            </span>

                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50">

                            <input
                                type="radio"
                                name="actorGender"
                                value="Others"
                                checked={actorDetails.actorGender === "Others"}
                                onChange={SetActorGender}
                                className="h-5 w-5 accent-blue-600"
                            />

                            <span className="font-medium text-slate-700">
                                Others
                            </span>

                        </label>

                    </div>

                    {errors.actorGender && (

                        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">

                            {errors.actorGender}

                        </p>

                    )}

                </div>

                <div className="space-y-3 border-t border-slate-200 pt-5">

                    <button
                        onClick={AddAnotherCast}
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 active:scale-95"
                    >
                        + Add Another
                    </button>

                    <button
                        onClick={AddCompleteDetails}
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 active:scale-95"
                    >
                        Add Cast
                    </button>

                    <button
                        onClick={RemoveAddNewActorComponent}
                        className="w-full rounded-xl border border-red-300 bg-red-50 py-3 font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 active:scale-95"
                    >
                        Back
                    </button>

                </div>

            </div>
        </>
    )
}

export default AddNewMovieActors