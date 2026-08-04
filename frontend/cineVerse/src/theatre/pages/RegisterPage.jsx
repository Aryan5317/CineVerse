import React from "react"
import { useState, useEffect } from "react"
import { FiCircle } from "react-icons/fi"
import { FaCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import RegisterComponent1 from "../components/Auth/RegisterComponent1.jsx"
import RegisterComponent2 from "../components/Auth/RegisterComponent2.jsx"
import RegisterComponent3 from "../components/Auth/RegisterComponent3.jsx"
import RegisterComponent4 from "../components/Auth/RegisterComponent4.jsx"
import RegisterComponent5 from "../components/Auth/RegisterComponent5.jsx"
import RegisterComponent6 from "../components/Auth/RegisterComponent6.jsx"

function RegisterPage() {

    const navigate = useNavigate()

    const [stepCount, setStepCount] = useState(1)
    const [theatreDetails, setTheatreDetails] = useState({
        fullname: "",
        email: "",
        mobileNumber: "",
        optionalMobileNumber: "",
        country: "",
        state: "",
        district: "",
        city: "",
        town: "",
        landmark: "",
        pincode: "",
        aadharNumber: "",
        panNumber: "",
        ownerPhoto: "",
        theatreName: "",
        theatreDescription: "",
        theatreContactNo: "",
        theatreIsBookingAvailable: false,
        theatreGSTNumber: "",
        theatreImages: [],
        theatreCountry: "",
        theatreState: "",
        theatreDistrict: "",
        theatrePinCode: "",
        theatreCity: "",
        theatreLandMark: "",
    })

    const BackButtonWork = () => {
        console.log("Back button is clicked")
        navigate(-1)
    }

    useEffect(() => {
        console.log("Theater details are: ", theatreDetails)
    }, [stepCount])

    return (
        <>
            <div className="min-h-screen w-full max-w-md mx-auto bg-white shadow-xl border-x border-gray-200">
                {stepCount < 6 && <div className="px-5 py-5">
                    <div>
                        <button
                            onClick={BackButtonWork}
                            className="flex items-center gap-2 text-gray-600 text-sm font-medium hover:text-blue-600 transition">
                            <span className="text-lg">←</span>
                            <span>Back</span>
                        </button>
                    </div>

                    <div className="mt-6">
                        <h1 className="text-3xl font-extrabold text-blue-600">
                            CineVerse
                        </h1>

                        <div className="mt-3">
                            <h2 className="text-2xl font-bold text-gray-900 leading-snug">
                                Become a Theatre Partner
                            </h2>
                        </div>

                        <div className="mt-2">
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Start your partnership journey by providing your owner details.
                            </p>
                        </div>
                    </div>
                </div>}
                {stepCount < 6 && <div className="px-5 -mt-4">
                    <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-4">

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-500">
                                    Registration Progress
                                </p>

                                <div className="flex items-center gap-2 mt-1">

                                    <span className="text-gray-500">Step</span>

                                    <span className="flex items-center justify-center font-bold"> {stepCount} </span>

                                    <span className="text-gray-400">of</span>

                                    <span className="font-bold text-gray-800">5</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center w-full mt-3">
                            {[1, 2, 3, 4, 5].map((step) => (
                                <React.Fragment key={step}>

                                    {step <= stepCount ? <FaCircle className="text-blue-500 text-[22px] bg-white rounded-full z-10" /> :
                                        <FiCircle className="text-blue-500 text-[22px] bg-white rounded-full z-10" />
                                    }
                                    {step !== 5 && (
                                        <div className={`flex-1 h-[4px] ${step < stepCount ? "bg-blue-500" : "bg-gray-300"}`}></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                    </div>
                </div>}
                {stepCount === 1 && <RegisterComponent1 setTheatreDetails={setTheatreDetails} theatreDetails={theatreDetails} setStepCount={setStepCount} />}
                {stepCount === 2 && <RegisterComponent2 setTheatreDetails={setTheatreDetails} theatreDetails={theatreDetails} setStepCount={setStepCount} />}
                {stepCount === 3 && <RegisterComponent3 setTheatreDetails={setTheatreDetails} theatreDetails={theatreDetails} setStepCount={setStepCount} />}
                {stepCount === 4 && <RegisterComponent4 setTheatreDetails={setTheatreDetails} theatreDetails={theatreDetails} setStepCount={setStepCount} />}
                {stepCount === 5 && <RegisterComponent5 theatreDetails={theatreDetails} setStepCount={setStepCount} />}
                {stepCount === 6 && <RegisterComponent6 />}
            </div >
        </>
    )
}

export default RegisterPage