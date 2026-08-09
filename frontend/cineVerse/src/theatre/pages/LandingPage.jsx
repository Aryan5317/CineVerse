import React from "react"
import heroImage from "../assests/Theatre_Hero_Section_Image.png";
import { HiOutlineBuildingOffice2, HiArrowRight } from "react-icons/hi2";
import { FiLogIn } from "react-icons/fi";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { RiMovie2Fill, RiLineChartLine, RiSecurePaymentLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate()

    const NavigateRegisterPage = () => {
        console.log("Register Button is clicked")
        navigate("/theatre/register")
    }

    const NavigateLoginPage = () => {
        console.log("Login Button is clicked")
        navigate("/theatre/login")
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">

                <div className="fixed inset-0 -z-10 overflow-hidden">

                    <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

                    <div className="absolute right-0 top-80 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"></div>

                    <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-300/10 blur-3xl"></div>

                </div>

                <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl">

                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900">CineVerse</h1>
                            <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-blue-600"> Theatre Partner Portal</p>

                        </div>
                    </div>

                </header>

                <section className="px-5 pt-8 pb-10">

                    <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-blue-100">

                        <div className="relative h-80 overflow-hidden">

                            <img
                                src={heroImage}
                                alt="Cinema"
                                className="h-full w-full object-cover transition duration-[2500ms] hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                            <div className="absolute bottom-6 left-6 inline-flex items-center rounded-full bg-white/20 px-5 py-2 backdrop-blur-md">

                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white"> Trusted by Modern Theatre Owners </span>

                            </div>

                        </div>

                        <div className="p-6">
                            <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2">

                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">  Cinema Management Platform </span>

                            </div>

                            <h1 className="mt-6 text-[42px] font-black leading-tight tracking-tight text-slate-900">

                                Grow Your

                                <br />

                                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent">

                                    Theatre Business

                                </span>

                            </h1>

                            <p className="mt-6 text-[16px] leading-8 text-slate-600">

                                Join CineVerse and simplify your theatre operations with
                                powerful business tools. Manage movies, screens, bookings,
                                revenue, customers, analytics and much more from one
                                intelligent dashboard.

                            </p>


                            <div className="mt-10 rounded-[30px] bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-500 p-[1px] shadow-2xl">

                                <div className="rounded-[29px] bg-white p-6">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">

                                            <HiOutlineBuildingOffice2 className="text-4xl text-blue-600" />

                                        </div>

                                        <div>

                                            <h2 className="text-xl font-bold text-slate-900">

                                                Become a Theatre Partner

                                            </h2>

                                            <p className="mt-1 text-sm leading-6 text-slate-500">

                                                Register your theatre and start reaching
                                                thousands of movie lovers.

                                            </p>

                                        </div>

                                    </div>

                                    <button
                                        onClick={NavigateRegisterPage}
                                        className="mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-300 active:scale-95">

                                        Register Now

                                        <HiArrowRight className="text-xl" />

                                    </button>

                                </div>

                            </div>

                            <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:border-blue-200 hover:bg-white hover:shadow-xl">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <h2 className="text-lg font-bold text-slate-900">

                                            Already a Partner?

                                        </h2>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">

                                            Login to manage bookings, screens, movies,
                                            reports and revenue.

                                        </p>

                                    </div>

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

                                        <FiLogIn className="text-3xl text-blue-600" />

                                    </div>

                                </div>

                                <button
                                    onClick={NavigateLoginPage}
                                    className="mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-300 active:scale-95">

                                    Login

                                </button>

                            </div>

                        </div>

                    </div>

                </section >


                <section className="px-5 pb-12">

                    <div className="text-center">

                        <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-700">

                            Why Choose Us

                        </span>

                        <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900">

                            Everything Your Theatre
                            <br />

                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">

                                Needs To Grow

                            </span>

                        </h2>

                        <p className="mx-auto mt-5 max-w-md text-[15px] leading-7 text-slate-600">

                            CineVerse helps theatre owners manage every aspect of
                            their business from a single intelligent platform.

                        </p>

                    </div>


                    <div className="mt-10 space-y-5">

                        <div className="group rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-200">

                            <div className="flex gap-5">

                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 transition duration-300 group-hover:bg-blue-600">

                                    <BsTicketPerforatedFill className="text-3xl text-blue-600 group-hover:text-white" />

                                </div>

                                <div>

                                    <h3 className="text-xl font-bold text-slate-900">

                                        Increase Ticket Sales

                                    </h3>

                                    <p className="mt-3 text-[15px] leading-7 text-slate-600">

                                        Reach thousands of active movie lovers through
                                        CineVerse and increase occupancy across every show.

                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="group rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:ring-emerald-200">

                            <div className="flex gap-5">

                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 transition duration-300 group-hover:bg-emerald-600">

                                    <RiLineChartLine className="text-3xl text-emerald-600 group-hover:text-white" />

                                </div>

                                <div>

                                    <h3 className="text-xl font-bold text-slate-900">

                                        Business Analytics

                                    </h3>

                                    <p className="mt-3 text-[15px] leading-7 text-slate-600">

                                        Monitor occupancy, revenue, ticket sales,
                                        customer trends and theatre performance
                                        in real time.

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="group rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:ring-purple-200">

                            <div className="flex gap-5">

                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-purple-100 transition duration-300 group-hover:bg-purple-600">

                                    <RiMovie2Fill className="text-3xl text-purple-600 group-hover:text-white" />

                                </div>

                                <div>

                                    <h3 className="text-xl font-bold text-slate-900">

                                        Movie & Show Management

                                    </h3>

                                    <p className="mt-3 text-[15px] leading-7 text-slate-600">

                                        Schedule movies, create shows,
                                        manage multiple screens and control
                                        seat availability effortlessly.

                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="group rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:ring-amber-200">

                            <div className="flex gap-5">

                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-100 transition duration-300 group-hover:bg-amber-500">

                                    <RiSecurePaymentLine className="text-3xl text-amber-600 group-hover:text-white" />

                                </div>

                                <div>

                                    <h3 className="text-xl font-bold text-slate-900">

                                        Secure Payments

                                    </h3>

                                    <p className="mt-3 text-[15px] leading-7 text-slate-600">

                                        Receive secure online payments,
                                        fast settlements and transparent
                                        financial reports.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                <section className="px-5 pb-12">

                    <div className="text-center">

                        <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-indigo-700">

                            Simple Process

                        </span>

                        <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900">

                            Become a Partner
                            <br />

                            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">

                                In Just 4 Steps

                            </span>

                        </h2>

                        <p className="mx-auto mt-5 max-w-md text-[15px] leading-7 text-slate-600">

                            A simple and transparent onboarding process designed
                            to get your theatre online quickly.

                        </p>

                    </div>

                    <div className="relative mt-14">

                        <div className="absolute left-6 top-0 h-full w-1 rounded-full bg-gradient-to-b from-blue-500 via-cyan-500 to-emerald-500"></div>


                        <div className="relative mb-10 flex gap-5">

                            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-lg">

                                1

                            </div>

                            <div className="flex-1 rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                                <h3 className="text-xl font-bold text-slate-900">

                                    Register Your Theatre

                                </h3>

                                <p className="mt-3 text-[15px] leading-7 text-slate-600">

                                    Submit your owner details, theatre information,
                                    address and business documents.

                                </p>

                            </div>

                        </div>


                        <div className="relative mb-10 flex gap-5">

                            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-lg font-bold text-white shadow-lg">

                                2

                            </div>

                            <div className="flex-1 rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                                <h3 className="text-xl font-bold text-slate-900">

                                    Verification

                                </h3>

                                <p className="mt-3 text-[15px] leading-7 text-slate-600">

                                    Our team verifies your theatre and documents to
                                    ensure authenticity and security.

                                </p>

                            </div>

                        </div>


                        <div className="relative mb-10 flex gap-5">

                            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-lg font-bold text-white shadow-lg">

                                3

                            </div>

                            <div className="flex-1 rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                                <h3 className="text-xl font-bold text-slate-900">

                                    Account Approval

                                </h3>

                                <p className="mt-3 text-[15px] leading-7 text-slate-600">

                                    Once approved, activate your account and
                                    access your dedicated theatre dashboard.

                                </p>

                            </div>

                        </div>


                        <div className="relative flex gap-5">

                            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-lg font-bold text-white shadow-lg">

                                ✓

                            </div>

                            <div className="flex-1 rounded-[28px] bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-500 p-[1px] shadow-xl">

                                <div className="rounded-[27px] bg-white p-6">

                                    <h3 className="text-xl font-bold text-slate-900">

                                        Start Growing Your Business

                                    </h3>

                                    <p className="mt-3 text-[15px] leading-7 text-slate-600">

                                        Publish movies, create screens,
                                        schedule shows, manage bookings,
                                        monitor revenue and grow your theatre
                                        with CineVerse.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                <section className="px-5 pb-12">

                    <div className="overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 shadow-2xl">

                        <div className="relative p-7">


                            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl"></div>

                            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl"></div>

                            <div className="relative">

                                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">

                                    CineVerse Platform

                                </span>

                                <h2 className="mt-5 text-4xl font-black tracking-tight text-white">

                                    Everything You Need

                                    <br />

                                    <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">

                                        In One Dashboard

                                    </span>

                                </h2>

                                <p className="mt-5 text-[15px] leading-7 text-slate-300">

                                    Powerful tools built exclusively for theatre
                                    owners to simplify operations and increase
                                    business growth.

                                </p>

                            </div>


                            <div className="mt-10 grid gap-5">


                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:bg-white/10">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500">

                                            📊

                                        </div>

                                        <div>

                                            <h3 className="text-lg font-bold text-white">

                                                Theatre Dashboard

                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-300">

                                                Monitor bookings, occupancy,
                                                earnings and performance
                                                in real time.

                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-blue-400 hover:bg-white/10">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">

                                            🎟

                                        </div>

                                        <div>

                                            <h3 className="text-lg font-bold text-white">

                                                Booking Management

                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-300">

                                                Manage bookings, cancellations,
                                                customer details and seat
                                                availability effortlessly.

                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-violet-400 hover:bg-white/10">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600">

                                            🎬

                                        </div>

                                        <div>

                                            <h3 className="text-lg font-bold text-white">

                                                Movies & Shows

                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-300">

                                                Publish movies, schedule shows,
                                                create screens and manage
                                                everything from one place.

                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400 hover:bg-white/10">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600">

                                            💰

                                        </div>

                                        <div>

                                            <h3 className="text-lg font-bold text-white">

                                                Revenue Reports

                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-300">

                                                Track settlements, revenue,
                                                taxes and detailed financial
                                                reports anytime.

                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-orange-400 hover:bg-white/10">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500">

                                            🪑

                                        </div>

                                        <div>

                                            <h3 className="text-lg font-bold text-white">

                                                Screen Management

                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-300">

                                                Configure screens, seating
                                                layouts and show timings
                                                with ease.

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                <section className="px-5 pb-12">

                    <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 shadow-2xl">

                        <div className="p-8">

                            <div className="text-center">

                                <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white">

                                    Trusted Platform

                                </span>

                                <h2 className="mt-5 text-4xl font-black text-white">

                                    Built For Modern

                                    <br />

                                    Cinema Businesses

                                </h2>

                                <p className="mx-auto mt-5 max-w-md text-[15px] leading-7 text-blue-100">

                                    Join a growing network of theatres using
                                    CineVerse to simplify operations and deliver
                                    better movie experiences.

                                </p>

                            </div>

                            <div className="mt-10 grid grid-cols-2 gap-4">

                                <div className="rounded-3xl bg-white/15 p-6 text-center backdrop-blur-lg">

                                    <h3 className="text-4xl font-black text-white">

                                        100+

                                    </h3>

                                    <p className="mt-2 text-sm font-medium text-blue-100">

                                        Partner Theatres

                                    </p>

                                </div>


                                <div className="rounded-3xl bg-white/15 p-6 text-center backdrop-blur-lg">

                                    <h3 className="text-4xl font-black text-white">

                                        25K+

                                    </h3>

                                    <p className="mt-2 text-sm font-medium text-blue-100">

                                        Monthly Bookings

                                    </p>

                                </div>


                                <div className="rounded-3xl bg-white/15 p-6 text-center backdrop-blur-lg">

                                    <h3 className="text-4xl font-black text-white">

                                        99.9%

                                    </h3>

                                    <p className="mt-2 text-sm font-medium text-blue-100">

                                        Platform Uptime

                                    </p>

                                </div>

                                <div className="rounded-3xl bg-white/15 p-6 text-center backdrop-blur-lg">

                                    <h3 className="text-4xl font-black text-white">

                                        24×7

                                    </h3>

                                    <p className="mt-2 text-sm font-medium text-blue-100">

                                        Partner Support

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                <section className="px-5 pb-12">

                    <div className="text-center">

                        <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-700">

                            FAQs

                        </span>

                        <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900">

                            Frequently Asked
                            <br />

                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">

                                Questions

                            </span>

                        </h2>

                        <p className="mx-auto mt-5 max-w-md text-[15px] leading-7 text-slate-600">

                            Everything you need to know before becoming a
                            CineVerse Theatre Partner.

                        </p>

                    </div>


                    <div className="mt-10 space-y-5">

                        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">

                            <h3 className="text-lg font-bold text-slate-900">

                                Is there any registration fee?

                            </h3>

                            <p className="mt-4 text-[15px] leading-7 text-slate-600">

                                No. Registering your theatre on CineVerse is completely
                                free. Once approved, you can start managing your theatre
                                immediately.

                            </p>

                        </div>


                        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">

                            <h3 className="text-lg font-bold text-slate-900">

                                How long does verification take?

                            </h3>

                            <p className="mt-4 text-[15px] leading-7 text-slate-600">

                                Most applications are verified within
                                <span className="font-semibold text-slate-900">

                                    {" "}24–48 hours.

                                </span>

                                Our team reviews all submitted documents before approval.

                            </p>

                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">

                            <h3 className="text-lg font-bold text-slate-900">

                                What documents are required?

                            </h3>

                            <p className="mt-4 text-[15px] leading-7 text-slate-600">

                                You'll need basic theatre information,
                                owner identity proof, business registration,
                                and other verification documents.

                            </p>

                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">

                            <h3 className="text-lg font-bold text-slate-900">

                                Can I manage multiple screens?

                            </h3>

                            <p className="mt-4 text-[15px] leading-7 text-slate-600">

                                Yes. CineVerse allows you to create multiple
                                screens, seat layouts, show timings and
                                manage them independently.

                            </p>

                        </div>


                        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">

                            <h3 className="text-lg font-bold text-slate-900">

                                How do I receive ticket payments?

                            </h3>

                            <p className="mt-4 text-[15px] leading-7 text-slate-600">

                                Ticket revenue is securely processed and settled
                                according to the payment cycle configured for
                                your theatre.

                            </p>

                        </div>

                    </div>

                </section>

                <footer className="border-t border-slate-200 bg-white">

                    <div className="px-5 py-10">
                        <div className="text-center">

                            <h1 className="text-3xl font-black tracking-tight text-slate-900">

                                CineVerse

                            </h1>

                            <p className="mt-2 text-sm leading-7 text-slate-500">

                                Empowering theatres with smarter booking,
                                management and business solutions.

                            </p>

                        </div>

                        <div className="mt-10">

                            <h2 className="text-lg font-bold text-slate-900">

                                Quick Links

                            </h2>

                            <div className="mt-5 grid grid-cols-2 gap-4">

                                <button className="rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-blue-600 hover:text-white">

                                    Home

                                </button>

                                <button className="rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-blue-600 hover:text-white">

                                    Register

                                </button>

                                <button className="rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-blue-600 hover:text-white">

                                    Login

                                </button>

                                <button className="rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-blue-600 hover:text-white">

                                    Contact

                                </button>

                            </div>

                        </div>

                        <div className="mt-10 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-6">

                            <h2 className="text-xl font-bold text-white">

                                Contact Us

                            </h2>

                            <p className="mt-4 text-sm leading-7 text-slate-300">

                                Email

                            </p>

                            <p className="font-semibold text-white">

                                support@cineverse.com

                            </p>

                            <p className="mt-5 text-sm leading-7 text-slate-300">

                                Business Hours

                            </p>

                            <p className="font-semibold text-white">

                                Monday - Saturday

                            </p>

                            <p className="text-white">

                                9:00 AM - 7:00 PM

                            </p>

                        </div>

                        <div className="my-10 h-px bg-slate-200"></div>

                        <div className="text-center">

                            <h2 className="text-xl font-black text-slate-900">

                                CineVerse

                            </h2>

                            <p className="mt-3 text-sm leading-7 text-slate-500">

                                © {new Date().getFullYear()} CineVerse.
                                All Rights Reserved.

                            </p>

                            <p className="mt-2 text-xs tracking-wide text-slate-400">

                                Made with ❤️ for Modern Cinema Owners

                            </p>

                        </div>

                    </div>

                </footer>

            </div>
        </>
    )
}

export default LandingPage