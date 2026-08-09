import React from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import theatreRequestCompleteDetails from "../../services/Admin/theatreCompleteDetailsResponse.js"
import { FaCircle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import TheatrePageConfirmationSection from "../../components/Admin's/TheatrePageConfirmationSection.jsx";
import TheatreConfirmationResult from "../../components/Admin's/TheatreConfirmationResult.jsx";

function TheatrePendingRequestApplicationPage() {

    const navigate = useNavigate()
    const { requestId } = useParams()

    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");

    const [theatreDetails, setTheatreDetails] = useState({})
    const [aadharNumber, setAadharNumber] = useState("")
    const [panNumber, setPanNumber] = useState("")
    const [gstNumber, setGstNumber] = useState("")
    const [aadharNumberEyeButton, setAadharNumberEyeButton] = useState(false)
    const [panNumberEyeButton, setPanNumberEyeButton] = useState(false)
    const [gstNumberEyeButton, setGstNumberEyeButton] = useState(false)
    const [actionValue, setActionValue] = useState("")
    const [confirmationPageVisibility, setConfirmationPageVisibility] = useState(false)
    const [conifrmationResult, setConfirmationResult] = useState(false)

    console.log("Request id got is: ", requestId)
    console.log("Status params is: ", status)

    useEffect(() => {
        const theatreData = async () => {
            try {
                const theatreRequestCompleteDetailsResponse = await theatreRequestCompleteDetails(requestId, status)
                console.log("Theatre data fetched is: ", theatreRequestCompleteDetailsResponse.data.theatreDetails)
                if (theatreRequestCompleteDetailsResponse) {
                    setTheatreDetails(theatreRequestCompleteDetailsResponse.data.theatreDetails)
                }
            } catch (error) {
                console.log("Error from backend while fetching theatre data is: ", error)
                setTheatreDetails([])
            }
        }
        theatreData()
    }, [requestId, status])

    useEffect(() => {

        if (
            !theatreDetails?.ownerAadharNo ||
            !theatreDetails?.ownerPanNumber ||
            !theatreDetails?.theatreGSTNumber
        ) {
            return;
        }

        console.log("Aadhar Number is: ", theatreDetails?.ownerAadharNo?.length);
        console.log("Pan Number is: ", theatreDetails?.ownerPanNumber);
        console.log("GST Number is: ", theatreDetails?.theatreGSTNumber);

        let aadharValue = "";

        for (let i = 0; i < 12; i++) {
            if (i < 8) {
                aadharValue += "*";
            } else {
                aadharValue += theatreDetails?.ownerAadharNo?.[i];
            }
        }

        let panValue = "";

        for (let j = 0; j < 10; j++) {
            if (j < 5) {
                panValue += "*";
            } else {
                panValue += theatreDetails?.ownerPanNumber?.[j];
            }
        }

        let gstValue = "";

        for (let k = 0; k < 15; k++) {
            if (k < 2) {
                gstValue += theatreDetails?.theatreGSTNumber?.[k];
            } else if (k >= 2 && k < 10) {
                gstValue += "*";
            } else {
                gstValue += theatreDetails?.theatreGSTNumber?.[k];
            }
        }

        setAadharNumber(aadharValue);
        setPanNumber(panValue);
        setGstNumber(gstValue);

    }, [theatreDetails]);

    const PendingRequestButtonWork = () => {
        console.log("Pending request button is clicked")
        navigate(-1)
    }

    const AadhaarNumberButtonWork = () => {
        console.log("Aadhaar eye button clicked")
        setAadharNumberEyeButton((prev) => !prev)
    }

    const PanNumberButtonWork = () => {
        console.log("Pan eye button clicked")
        setPanNumberEyeButton((prev) => !prev)
    }

    const GSTButtonWork = () => {
        console.log("GST eye button clicked")
        setGstNumberEyeButton((prev) => !prev)
    }

    const ActionButtonWork = (e) => {
        console.log("Action Button clicked")
        console.log("Action button value is: ", e)
        setActionValue(e)
    }

    const VerificationPageCompleteButtonWork = () => {
        console.log("Continue Button is clicked")
        if (actionValue !== "") {
            setConfirmationPageVisibility
                (true)
        }
    }

    return (
        <>
            <div className="min-h-screen w-full max-w-md mx-auto bg-slate-50 border-x border-gray-200 shadow-xl">

                <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">

                    <button
                        onClick={PendingRequestButtonWork}
                        className="flex items-center gap-2 px-5 pt-5 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                        <span className="text-lg">←</span>
                        <span>Pending Requests</span>
                    </button>

                    <div className="px-5 pt-4 pb-5">

                        <h1 className="text-2xl font-bold tracking-wide text-gray-900">
                            REVIEW APPLICATION
                        </h1>

                        <p className="mt-2 text-sm leading-relaxed text-gray-500">
                            Carefully review all submitted information before taking an action.
                        </p>

                    </div>

                </div>

                <div className="bg-white">

                    <div className="border-b border-gray-200 px-5 py-4">

                        <div className="flex items-center justify-between">

                            <span className="text-sm font-medium text-gray-500">
                                Submitted On
                            </span>

                            <span className="text-sm font-semibold text-gray-900">
                                {new Date(theatreDetails.createdAt).toLocaleDateString(
                                    "en-IN",
                                    {
                                        timeZone: "Asia/Kolkata",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </span>

                        </div>

                    </div>

                    <div className="border-b border-gray-200 px-5 py-4">

                        <div className="flex items-center justify-between">

                            <span className="text-sm font-medium text-gray-500">
                                Current Status
                            </span>

                            <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1">

                                <FaCircle className="text-[10px] text-yellow-500" />

                                <span className="text-xs font-semibold text-yellow-700">
                                    Pending Review
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="border-b-8 border-slate-100"></div>

                    <section>

                        <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
                                    👤
                                </div>

                                <div>

                                    <h2 className="text-lg font-bold tracking-wide text-gray-900">
                                        OWNER INFORMATION
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Personal details submitted by the theatre owner.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="divide-y divide-gray-200 bg-white">

                            <div className="px-5 py-4">

                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Owner Name
                                </p>

                                <p className="mt-1 text-base font-semibold text-gray-900">
                                    {theatreDetails.ownerName}
                                </p>

                            </div>

                            <div className="px-5 py-4">

                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Owner Photograph
                                </p>

                                <div className="mt-3">

                                    <img
                                        src={theatreDetails.ownerImage}
                                        alt="Owner"
                                        className="h-28 w-28 rounded-2xl border border-gray-300 object-cover"
                                    />

                                </div>

                            </div>

                            <div className="px-5 py-4">

                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Email Address
                                </p>

                                <p className="mt-1 break-all text-base font-medium text-gray-900">
                                    {theatreDetails.ownerEmail}
                                </p>

                            </div>

                            <div className="px-5 py-4">

                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Mobile Number
                                </p>

                                <p className="mt-1 text-base font-medium text-gray-900">
                                    {theatreDetails.ownerMobileNumber}
                                </p>

                            </div>

                            <div className="px-5 py-4">

                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Alternate Mobile Number
                                </p>

                                <p className="mt-1 text-base font-medium text-gray-900">
                                    {theatreDetails.ownerAlternateMobileNo || "Not Provided"}
                                </p>

                            </div>
                            <div className="border-b-8 border-slate-100"></div>

                        </div>

                    </section>

                    <section>

                        <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
                                    📍
                                </div>

                                <div>

                                    <h2 className="text-lg font-bold tracking-wide text-gray-900">
                                        OWNER ADDRESS
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Registered residential address of the owner.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="divide-y divide-gray-200 bg-white">

                            <div className="flex items-center justify-between px-5 py-4">

                                <span className="text-sm text-gray-500">
                                    Country
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {theatreDetails?.ownerAddress?.ownerCountry}
                                </span>

                            </div>

                            <div className="flex items-center justify-between px-5 py-4">

                                <span className="text-sm text-gray-500">
                                    State
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {theatreDetails?.ownerAddress?.ownerState}
                                </span>

                            </div>

                            <div className="flex items-center justify-between px-5 py-4">

                                <span className="text-sm text-gray-500">
                                    District
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {theatreDetails?.ownerAddress?.ownerDistrict}
                                </span>

                            </div>

                            <div className="flex items-center justify-between px-5 py-4">

                                <span className="text-sm text-gray-500">
                                    City
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {theatreDetails?.ownerAddress?.ownerCity}
                                </span>

                            </div>

                            <div className="flex items-center justify-between px-5 py-4">

                                <span className="text-sm text-gray-500">
                                    Town
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {theatreDetails?.ownerAddress?.ownerTown}
                                </span>

                            </div>

                            <div className="flex items-center justify-between px-5 py-4">

                                <span className="text-sm text-gray-500">
                                    Landmark
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {theatreDetails?.ownerAddress?.ownerLandMark}
                                </span>

                            </div>

                            <div className="flex items-center justify-between px-5 py-4">

                                <span className="text-sm text-gray-500">
                                    Pin Code
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {theatreDetails?.ownerAddress?.ownerPinCode}
                                </span>

                            </div>

                        </div>

                    </section>

                    <div className="border-b-8 border-slate-100"></div>

                    <section>

                        <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
                                    🪪
                                </div>

                                <div>

                                    <h2 className="text-lg font-bold tracking-wide text-gray-900">
                                        OWNER VERIFICATION
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Identity verification documents submitted by the owner.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="divide-y divide-gray-200 bg-white">

                            <div className="flex items-center justify-between px-5 py-4">

                                <div>

                                    <p className="text-xs uppercase tracking-wide text-gray-500">
                                        Aadhaar Number
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {aadharNumberEyeButton ? theatreDetails?.ownerAadharNo : aadharNumber}
                                    </p>

                                </div>

                                <button
                                    onClick={AadhaarNumberButtonWork}
                                    className="rounded-xl border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100">
                                    {aadharNumberEyeButton ? <FiEye /> : <FiEyeOff />}
                                </button>

                            </div>

                            <div className="flex items-center justify-between px-5 py-4">

                                <div>

                                    <p className="text-xs uppercase tracking-wide text-gray-500">
                                        PAN Number
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {panNumberEyeButton ? theatreDetails?.ownerPanNumber : panNumber}
                                    </p>

                                </div>

                                <button
                                    onClick={PanNumberButtonWork}
                                    className="rounded-xl border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100">
                                    {panNumberEyeButton ? <FiEye /> : <FiEyeOff />}
                                </button>

                            </div>

                        </div>

                    </section>
                    <div className="border-b-8 border-slate-100"></div>

                    <section>

                        <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
                                    🏢
                                </div>

                                <div>

                                    <h2 className="text-lg font-bold tracking-wide text-gray-900">
                                        THEATRE INFORMATION
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        General details submitted for the theatre.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="divide-y divide-gray-200 bg-white">

                            <div className="px-5 py-4">

                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Theatre Name
                                </p>

                                <p className="mt-1 text-base font-semibold text-gray-900">
                                    {theatreDetails?.theatreName}
                                </p>

                            </div>

                            <div className="px-5 py-4">

                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Description
                                </p>

                                <p className="mt-2 text-sm leading-7 text-gray-700">
                                    {theatreDetails?.theatreDescription}
                                </p>

                            </div>

                            <div className="px-5 py-4">

                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Contact Number
                                </p>

                                <p className="mt-1 font-semibold text-gray-900">
                                    {theatreDetails?.theatreContactNo}
                                </p>

                            </div>

                        </div>

                    </section>

                    <div className="border-b-8 border-slate-100"></div>

                    <section>

                        <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
                                    📍
                                </div>

                                <div>

                                    <h2 className="text-lg font-bold tracking-wide text-gray-900">
                                        THEATRE ADDRESS
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Registered location of the theatre.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="divide-y divide-gray-200 bg-white">

                            <div className="flex items-center justify-between px-5 py-4">

                                <span className="text-sm text-gray-500">
                                    Country
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {theatreDetails?.theatreAddress?.theatreCountry}
                                </span>

                            </div>

                            <div className="flex items-center justify-between px-5 py-4">

                                <span className="text-sm text-gray-500">
                                    State
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {theatreDetails?.theatreAddress?.theatreState}
                                </span>

                            </div>

                            <div className="flex items-center justify-between px-5 py-4">

                                <span className="text-sm text-gray-500">
                                    District
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {theatreDetails?.theatreAddress?.theatreDistrict}
                                </span>

                            </div>

                            <div className="flex items-center justify-between px-5 py-4">

                                <span className="text-sm text-gray-500">
                                    City
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {theatreDetails?.theatreAddress?.theatreCity}
                                </span>

                            </div>

                            <div className="flex items-center justify-between px-5 py-4">

                                <span className="text-sm text-gray-500">
                                    Landmark
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {theatreDetails?.theatreAddress?.theatreLandMark}
                                </span>

                            </div>

                            <div className="flex items-center justify-between px-5 py-4">

                                <span className="text-sm text-gray-500">
                                    Pin Code
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {theatreDetails?.theatreAddress?.theatrePinCode}
                                </span>

                            </div>

                        </div>

                    </section>

                    <div className="border-b-8 border-slate-100"></div>

                    <section>

                        <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
                                    📄
                                </div>

                                <div>

                                    <h2 className="text-lg font-bold tracking-wide text-gray-900">
                                        BUSINESS DETAILS
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Legal business information submitted by the theatre owner.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="divide-y divide-gray-200 bg-white">

                            <div className="flex items-center justify-between px-5 py-4">

                                <div>

                                    <p className="text-xs uppercase tracking-wide text-gray-500">
                                        GST Number
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {gstNumberEyeButton ? theatreDetails?.theatreGSTNumber : gstNumber}
                                    </p>

                                </div>

                                <button
                                    onClick={GSTButtonWork}
                                    className="rounded-xl border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100">
                                    {gstNumberEyeButton ? <FiEye /> : <FiEyeOff />}
                                </button>

                            </div>

                        </div>

                    </section>

                    <div className="border-b-8 border-slate-100"></div>

                    <section>

                        <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
                                    🖼
                                </div>

                                <div>

                                    <h2 className="text-lg font-bold tracking-wide text-gray-900">
                                        THEATRE IMAGES
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Images uploaded by the theatre owner for verification.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="bg-white px-5 py-5">

                            <div className="grid grid-cols-2 gap-4">

                                {theatreDetails?.theatreImages?.map((image, index) => (

                                    <div
                                        key={index}
                                        className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
                                    >

                                        <img
                                            src={image}
                                            alt={`Theatre ${index + 1}`}
                                            className="h-32 w-full object-cover"
                                        />

                                        <div className="border-t border-gray-200 bg-white py-2 text-center">

                                            <p className="text-xs font-semibold text-gray-600">
                                                Image {index + 1}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </section>

                    {theatreDetails?.theatreStatus === "NeedMoreDocuments" && (

                        <>

                            <div className="border-b-8 border-slate-100"></div>

                            <section>

                                <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-lg">
                                            📝
                                        </div>

                                        <div>

                                            <h2 className="text-lg font-bold tracking-wide text-gray-900">
                                                REVIEW NOTES
                                            </h2>

                                            <p className="text-xs text-gray-500">
                                                Previous review remarks shared with the theatre owner.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="bg-white px-5 py-5">

                                    <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">

                                        <p className="text-sm leading-7 text-gray-700">
                                            Notes...
                                        </p>

                                    </div>

                                </div>

                            </section>

                        </>

                    )}

                    <div className="border-b-8 border-slate-100"></div>

                    <section>

                        <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-lg">
                                    ⚖
                                </div>

                                <div>

                                    <h2 className="text-lg font-bold tracking-wide text-gray-900">
                                        FINAL DECISION
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Select the action you want to perform for this application.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="bg-white px-5 py-5 space-y-4">

                            <button
                                onClick={() => ActionButtonWork("Approve")}
                                className={`w-full rounded-2xl border p-4 text-left transition ${actionValue === "Approve"
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200 bg-white"
                                    }`}
                            >

                                <div className="flex items-start justify-between">

                                    <div className="flex items-center gap-3">

                                        <FaCircle
                                            className={`h-4 w-4 flex-shrink-0 ${actionValue === "Approve"
                                                ? "text-green-500"
                                                : "text-green-500"
                                                }`}
                                        />

                                        <div>

                                            <h3 className="font-semibold text-gray-900">
                                                Approve
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Activate this theatre partner.
                                            </p>

                                        </div>

                                    </div>

                                    {actionValue === "Approve" && (
                                        <IoCheckmarkCircle className="text-2xl text-green-600" />
                                    )}

                                </div>

                            </button>

                            <button
                                onClick={() => ActionButtonWork("Need more documents")}
                                className={`w-full rounded-2xl border p-4 text-left transition ${actionValue === "Need more documents"
                                    ? "border-yellow-500 bg-yellow-50"
                                    : "border-gray-200 bg-white"
                                    }`}
                            >

                                <div className="flex items-start justify-between">

                                    <div className="flex items-center gap-3">

                                        <FaCircle
                                            className={`h-4 w-4 flex-shrink-0 ${actionValue === "Need more documents"
                                                ? "text-orange-500"
                                                : "text-orange-500"
                                                }`}
                                        />

                                        <div>

                                            <h3 className="font-semibold text-gray-900">
                                                Need More Documents
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Request missing documents from the owner.
                                            </p>

                                        </div>

                                    </div>

                                    {actionValue === "Need more documents" && (
                                        <IoCheckmarkCircle className="text-2xl text-yellow-500" />
                                    )}

                                </div>

                            </button>

                            <button
                                onClick={() => ActionButtonWork("Reject")}
                                className={`w-full rounded-2xl border p-4 text-left transition ${actionValue === "Reject"
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-200 bg-white"
                                    }`}
                            >

                                <div className="flex items-start justify-between">

                                    <div className="flex items-center gap-3">

                                        <FaCircle
                                            className={`h-4 w-4 flex-shrink-0 ${actionValue === "Reject"
                                                ? "text-rose-500"
                                                : "text-rose-500"
                                                }`}
                                        />

                                        <div>

                                            <h3 className="font-semibold text-gray-900">
                                                Reject
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Reject this theatre application.
                                            </p>

                                        </div>

                                    </div>

                                    {actionValue === "Reject" && (
                                        <IoCheckmarkCircle className="text-2xl text-red-600" />
                                    )}

                                </div>

                            </button>

                        </div>

                    </section>

                    {actionValue !== "" && (

                        <div className="sticky bottom-0 border-t border-gray-200 bg-white px-5 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">

                            <button
                                onClick={VerificationPageCompleteButtonWork}
                                className="w-full rounded-2xl bg-blue-600 py-4 text-base font-semibold text-white transition duration-200 hover:bg-blue-700 active:scale-[0.98]"
                            >
                                Continue →
                            </button>

                        </div>

                    )}

                </div>
                {confirmationPageVisibility && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

                        <div className="w-full max-w-md">

                            <TheatrePageConfirmationSection actionValue={actionValue} setConfirmationPageVisibility={setConfirmationPageVisibility} setConfirmationResult={setConfirmationResult} />

                        </div>

                    </div>
                )}
                {conifrmationResult && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

                        <div className="w-full max-w-md">

                            <TheatreConfirmationResult actionValue={actionValue} setConfirmationResult={setConfirmationResult} />

                        </div>

                    </div>
                )}
            </div>

        </>

    )
}

export default TheatrePendingRequestApplicationPage