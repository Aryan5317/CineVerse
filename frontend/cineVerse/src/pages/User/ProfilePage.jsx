import { useContext } from "react"
import ProfileSectionBeforeLogin from "../../components/Users/ProfileSection/ProfileSectionBeforeLogin"
import UserSectionButton from "../../components/Users/UserSectionButton"
import ProfileSectionAfterLogin from "../../components/Users/ProfileSection/ProfileSectionAfterLogin"
import { propContext } from "../../context/User/contextApi"

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