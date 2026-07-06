import { useContext } from "react"
import ProfileSectionBeforeLogin from "../User/../../components/Users/ProfileSection/ProfileSectionBeforeLogin"
import { propContext } from "../../context/User/contextApi"
import UserSectionButton from "../User/../../components/Users/UserSectionButton"
import ProfileSectionAfterLogin from "../User/../../components/Users/ProfileSection/ProfileSectionAfterLogin"

function ProfilePage() {
    const { isLoggedIn } = useContext(propContext)

    return (
        <>
            {!isLoggedIn && <ProfileSectionBeforeLogin />}
            {isLoggedIn && <ProfileSectionAfterLogin />}
            <footer className="fixed bottom-0 left-0 w-full h-20 bg-white border-t border-gray-200 shadow-lg z-50">
                <UserSectionButton />
            </footer>
        </>
    )
}

export default ProfilePage