import React from "react"
import { useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import addNewScreen from "../context/theatreUser/addNewScreenValidation.js"
import addNewScreenService from "../services/dashboard/addNewScreenService.js"
import { theatrePropContext } from "../context/TheatreContextProvider/theatreContextApi.js"

function AddNewScreen() {

    const navigate = useNavigate()

    const { theatreId } = useParams();

    console.log("Theatre ID:", theatreId);

    const { selectedTheatre } = useContext(theatrePropContext)


    const [screenDetails, setScreenDetails] = useState({
        screenNumber: "",
        screenName: "",
        screenStatus: "",
        seatCategories: [],
        screenFormat: "",
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)

    const SetScreenNumber = (e) => {
        const { name, value } = e.target
        setScreenDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetScreenName = (e) => {
        const { name, value } = e.target
        setScreenDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetScreenStatus = (e) => {
        const { name, value } = e.target
        console.log("value is:", value)
        console.log("Name is: ", name)
        setScreenDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetScreenDetails = (e) => {
        const { name, value, checked } = e.target
        console.log("name : ", name)
        console.log("checked is: ", checked)


        setScreenDetails((prev) => {
            if (checked) {
                return {
                    ...prev,
                    seatCategories: [
                        ...prev.seatCategories,
                        {
                            seatType: value,
                            rows: "",
                            columns: "",
                        }
                    ]
                }
            }
            return {
                ...prev,
                seatCategories: prev.seatCategories.filter((category) => category.seatType !== value)
            }
        })
    }

    const SetSeatRows = (e, type) => {
        const { name, value } = e.target;
        console.log("Name is: ", name)
        console.log("value is: ", value)
        console.log("Type is: ", type)

        setScreenDetails((prev) => ({
            ...prev,
            seatCategories: prev.seatCategories.map((category, i) => category.seatType === type ? { ...category, rows: value } : category)
        }))
    }

    const SetSeatColumn = (e, type) => {
        const { name, value } = e.target

        setScreenDetails((prev) => ({
            ...prev,
            seatCategories: prev.seatCategories.map((category) => category.seatType === type ? { ...category, columns: value } : category)
        }))
    }

    const SetScreenFormat = (e) => {
        const { name, value } = e.target
        setScreenDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const CancelButtonWork = () => {
        console.log("Cancel button is clicked")
        navigate(-1)
    }

    const AddScreenButton = async () => {
        console.log("Add screen button clicked")
        setLoading(true)
        const addNewScreenValidationResponse = addNewScreen(screenDetails)
        console.log("Add new screen validation response are: ", addNewScreenValidationResponse)
        if (Object.keys(addNewScreenValidationResponse).length !== 0) {
            setErrors(addNewScreenValidationResponse)
            setLoading(false)
            return
        }
        setErrors({})
        try {
            const newScreenServiceResponse = await addNewScreenService(screenDetails, theatreId)
            console.log("Response from add new Screen service: ", newScreenServiceResponse)
            if (newScreenServiceResponse) {
                setLoading(false)
                setMessage(true)
                setTimeout(() => {
                    setMessage(false)
                    navigate(-1)
                }, 2000);
            }
        } catch (error) {
            console.log("Error from backend is: ", error)
            setErrors((prev) => ({
                ...prev,
                "message": error.message
            }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="min-h-screen w-full max-w-md mx-auto bg-slate-50 border-x border-slate-200 px-4 pb-8">

                <div className="pt-6 pb-5">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Add Screen
                    </h1>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                        Add and configure a new screen for your theatre.
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Theatre
                    </p>

                    <div className="mt-2 flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-lg">
                            🏢
                        </div>

                        <div className="min-w-0 flex-1">

                            <h1 className="truncate text-sm font-bold text-slate-900">
                                {selectedTheatre.theatreName}
                            </h1>

                            <div className="mt-1.5 flex min-w-0 items-center gap-2">

                                <span className="truncate text-xs font-medium text-slate-500">
                                    {selectedTheatre.theatreAddress?.theatreCity}
                                </span>

                                <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300" />

                                <span
                                    className={`shrink-0 text-[11px] font-semibold ${selectedTheatre.theatreAvailability
                                        ? "text-emerald-600"
                                        : "text-red-500"
                                        }`}
                                >
                                    {selectedTheatre.theatreAvailability ? "Active" : "Inactive"}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="border-b border-slate-100 pb-4">

                        <h2 className="text-lg font-bold text-slate-900">
                            Screen Details
                        </h2>

                        <p className="mt-1 text-sm leading-5 text-slate-500">
                            Provide the basic configuration for this screen.
                        </p>

                    </div>

                    <div className="mt-5 space-y-6">

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Screen Number
                            </label>

                            <input
                                type="number"
                                name="screenNumber"
                                placeholder="e.g. 1"
                                value={screenDetails.screenNumber}
                                onChange={SetScreenNumber}
                                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                            {errors.screenNumber &&
                                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium leading-5 text-red-500">
                                    <span>{errors.screenNumber}</span>
                                </p>
                            }
                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Screen Name
                            </label>

                            <input
                                type="text"
                                name="screenName"
                                placeholder="ABC.."
                                value={screenDetails.screenName}
                                onChange={SetScreenName}
                                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />

                            {errors.screenName &&
                                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium leading-5 text-red-500">
                                    <span>{errors.screenName}</span>
                                </p>
                            }
                        </div>

                        <div>

                            <label className="mb-3 block text-sm font-semibold text-slate-700">
                                Screen Status
                            </label>

                            <div className="space-y-2">

                                {["Available", "Closed", "Maintenance"].map((status) => (

                                    <label
                                        key={status}
                                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-slate-300 hover:bg-slate-100"
                                    >

                                        <input
                                            type="radio"
                                            value={status}
                                            name="screenStatus"
                                            checked={screenDetails.screenStatus === status}
                                            onChange={SetScreenStatus}
                                            className="h-4 w-4 shrink-0"
                                        />

                                        <span className="text-sm font-medium text-slate-700">
                                            {status}
                                        </span>

                                    </label>

                                ))}

                                {errors.screenStatus && <p className="mt-2 flex items-center gap-1.5 text-xs font-medium leading-5 text-red-500">
                                    <span>{errors.screenStatus}</span>
                                </p>}

                            </div>

                        </div>

                        <div>

                            <h1 className="mb-3 block text-sm font-semibold text-slate-700">
                                Seat Type
                            </h1>

                            <div className="space-y-2">

                                {["Normal", "Premium", "Recliner"].map((type) => (

                                    <label
                                        key={type}
                                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-slate-300 hover:bg-slate-100"
                                    >

                                        <input
                                            type="checkbox"
                                            name="seatType"
                                            value={type}
                                            checked={screenDetails.seatCategories.some((category) => category.seatType === type)}
                                            onChange={SetScreenDetails}
                                            className="h-4 w-4 shrink-0 rounded"
                                        />

                                        <span className="text-sm font-medium text-slate-700">
                                            {type}
                                        </span>

                                    </label>

                                ))}

                            </div>
                            {typeof errors.seatCategories === "string" && (
                                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium leading-5 text-red-500">
                                    <span>{errors.seatCategories}</span>
                                </p>
                            )}

                        </div>

                        {screenDetails.seatCategories.length !== 0 && (

                            <div className="space-y-3">

                                <div>
                                    <h3 className="text-sm font-semibold text-slate-700">
                                        Seat Layout
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Configure the number of rows and columns for each selected seat type.
                                    </p>
                                </div>

                                <div className="space-y-3">

                                    {screenDetails.seatCategories.map((type, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                                        >
                                            <h4 className="text-sm font-semibold text-slate-800">
                                                {type.seatType}
                                            </h4>

                                            <div className="mt-3 grid grid-cols-2 gap-3">

                                                <div>
                                                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                                        Rows
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="1"
                                                        placeholder="e.g. 10"
                                                        name="rows"
                                                        value={type.rows}
                                                        onChange={(e) => SetSeatRows(e, type.seatType)}
                                                        className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                                    />

                                                    {errors.seatCategories?.[index]?.rows && (
                                                        <p className="mt-2 text-xs font-medium leading-5 text-red-500">
                                                            {errors.seatCategories[index].rows}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                                        Columns
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="1"
                                                        name="columns"
                                                        placeholder="e.g. 12"
                                                        value={type.columns}
                                                        onChange={(e) => SetSeatColumn(e, type.seatType)}
                                                        className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                                    />

                                                    {errors.seatCategories?.[index]?.columns && (
                                                        <p className="mt-2 text-xs font-medium leading-5 text-red-500">
                                                            {errors.seatCategories[index].columns}
                                                        </p>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>

                        )}

                        <div>

                            <label className="mb-3 block text-sm font-semibold text-slate-700">
                                Screen Type
                            </label>

                            <div className="space-y-2">

                                {["Standard", "IMAX", "3D", "4DX"].map((type) => (

                                    <label
                                        key={type}
                                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-slate-300 hover:bg-slate-100"
                                    >

                                        <input
                                            type="radio"
                                            value={type}
                                            name="screenFormat"
                                            checked={screenDetails.screenFormat === type}
                                            onChange={SetScreenFormat}
                                            className="h-4 w-4 shrink-0"
                                        />

                                        <span className="text-sm font-medium text-slate-700">
                                            {type}
                                        </span>

                                    </label>

                                ))}

                            </div>

                            {errors.screenFormat && <p className="mt-2 flex items-center gap-1.5 text-xs font-medium leading-5 text-red-500">
                                <span>{errors.screenFormat}</span>
                            </p>
                            }

                        </div>

                    </div>

                </div>

                <div className="mt-5 flex gap-3">

                    <button
                        onClick={CancelButtonWork}
                        type="button"
                        className="h-12 flex-1 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98]"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={AddScreenButton}
                        className="h-12 flex-1 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                    >
                        {loading ? "Adding Screen.." : "Add Screen"}
                    </button>

                </div>

                {message && (<p className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-green-100 bg-green-50 px-3 py-2.5 text-sm font-semibold text-green-600">
                    <span>✅</span>
                    <span>Screen Added Successfully</span>
                </p>)}

                {errors.message && (<p className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600">
                    <span>{errors.message}</span>
                </p>)}

            </div>
        </>
    )
}

export default AddNewScreen