import SuoerAdminTopBar from "../../components/SuoerAdminTopBar"
import SuperAdminMenuOption from "../../components/SuperAdminMenuOption"
import CreateNewAdmin from "../../components/CreateNewAdmin"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import GetAllAdmin from "../../components/GetAllAdmin"
import AdminProfileDetails from "../../components/AdminProfileDetails"
import { useParams } from "react-router-dom";

function AdminAdministrationPage() {
    const navigate = useNavigate();

    const { adminDetailsIdRoute } = useParams()

    const [menuButton, setMenuButton] = useState(false)
    const [createButton, setCreateButton] = useState(false)
    const [selectAdmin, setSelectAdmin] = useState(false)
    const [selectedAdminId, setSelectedAdminId] = useState("")

    const createNewAdmin = () => {
        console.log("Create admin Button clicked")
        setCreateButton((prev) => !prev)
    }

    useEffect(() => {
        if (adminDetailsIdRoute) {
            setSelectAdmin(true)
            setSelectedAdminId(adminDetailsIdRoute)
        }
        else {
            setSelectAdmin(false)
            setSelectedAdminId("");
        }
    }, [adminDetailsIdRoute])



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

                {!createButton && !selectAdmin && <div className="px-4 py-5">

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
                </div>}
                {createButton && <div className="px-4 py-5"> <CreateNewAdmin setCreateButton={setCreateButton} /> </div>}

                {!createButton && !selectAdmin && <div>
                    <GetAllAdmin />
                </div>}

                {selectAdmin && <div> <AdminProfileDetails /></div>}
                
            </div>
        </>
    )
}

export default AdminAdministrationPage