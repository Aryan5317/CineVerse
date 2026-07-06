import SuoerAdminTopBar from "../../components/SuoerAdminTopBar"
import SuperAdminMenuOption from "../../components/SuperAdminMenuOption"
import CreateNewAdmin from "../../components/CreateNewAdmin"
import { useState } from "react"

function AdminAdministrationPage() {

    const [menuButton, setMenuButton] = useState(false)
    const [createButton, setCreateButton] = useState(false)

    const createNewAdmin = () => {
        console.log("Create admin Button clicked")
        setCreateButton((prev) => !prev)
    }

    return (
        <>
            <div className="min-h-screen bg-slate-100">

                <SuoerAdminTopBar
                    menuButton={menuButton}
                    setMenuButton={setMenuButton}
                />

                <div
                    className={`fixed top-20 right-4 z-[100] transition-all duration-300 ${menuButton
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-3 pointer-events-none"
                        }`}
                >
                    <SuperAdminMenuOption />
                </div>

                {!createButton && <div className="px-4 py-5">

                    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5">

                        <p className="text-sm text-slate-500 leading-6">
                            Create and manage administrator accounts.
                        </p>

                        <button
                            onClick={createNewAdmin}
                            className="mt-5 w-full h-12 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-all duration-200 active:scale-[0.98]">
                            + Create Admin
                        </button>

                    </div>

                    <div className="mt-5 bg-white rounded-2xl border border-slate-200 shadow-md min-h-[420px] flex items-center justify-center">

                        <h2 className="text-center text-slate-400 font-medium px-6">
                            Admin List will appear here
                        </h2>

                    </div>

                </div>}
                {createButton && <div className="px-4 py-5"> <CreateNewAdmin setCreateButton={setCreateButton} /> </div>}

            </div>
        </>
    )
}

export default AdminAdministrationPage