import { Link } from "react-router-dom"

function ProfileSectionBeforeLogin() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] px-6 py-6 pb-24">

            <div className="text-center">
                <h1 className="text-3xl font-extrabold text-[#0F172A]">
                    Profile
                </h1>
            </div>

            <div className="mt-6 flex flex-col items-center">

                <div className="w-24 h-24 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-5xl">
                    👤
                </div>

                <h2 className="mt-4 text-3xl font-bold text-[#0F172A]">
                    Welcome to CineVerse
                </h2>

            </div>

            <div className="mt-6 bg-white rounded-2xl shadow-md border border-gray-200 p-5">

                <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
                    🔐 Sign in to unlock
                </h3>

                <div className="flex flex-col gap-3 text-slate-700">

                    <p>🎟️ Book Movie Tickets</p>

                    <p>🎬 Stream Movies</p>

                    <p>🕒 Save Watch History</p>

                    <p>⭐ Personalized Recommendations</p>

                    <p>💎 Access Subscription Plans</p>

                </div>

            </div>

            <div className="mt-6 flex flex-col gap-3">

                <Link
                    to="/login"
                    className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center transition-all duration-200"
                >
                    Sign In
                </Link>

                <Link
                    to="/register"
                    className="w-full h-12 rounded-xl border border-red-600 text-red-600 font-semibold flex items-center justify-center hover:bg-red-50 transition-all duration-200"
                >
                    Create Account
                </Link>

            </div>

        </div>
    )
}

export default ProfileSectionBeforeLogin