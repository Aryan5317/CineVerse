import { RiNotification4Line, RiMenuFill } from "@remixicon/react";


function SuoerAdminTopBar({ menuButton, setMenuButton }) {

    const SetMenuToggleEffect = () => {
        console.log("Super Admin menu is clicked")
        setMenuButton((prev) => !prev)
    }
    return (
        <>
            < div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm" >

                <div className="flex items-center justify-between px-5 py-4">

                    <div className="flex items-center gap-4">

                        <div>
                            <h1 className="text-xl font-extrabold text-slate-900">
                                CineVerse
                            </h1>
                            <h2 className="text-xs font-medium text-slate-500">
                                Super Admin
                            </h2>
                        </div>

                    </div>

                    <div className="flex items-center gap-5">

                        <button
                            className="relative text-2xl text-amber-500 hover:scale-105 transition-all">
                            <RiNotification4Line />
                        </button>

                        <button
                            onClick={SetMenuToggleEffect}
                            className="text-2xl text-slate-700 cursor-pointer">
                            <RiMenuFill />
                        </button>

                    </div>

                </div>

            </div >
        </>

    )
}


export default SuoerAdminTopBar