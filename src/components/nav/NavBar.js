import { ClientNav } from "./ClientNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {

    const localMercuryUser = localStorage.getItem("mercury_user")
    const mercuryUserObject = JSON.parse(localMercuryUser)
    
    if (mercuryUserObject.staff) {
        //Return employee views
        return <EmployeeNav />
    }
    else {
        //Return customer views
        return <ClientNav />
    }
}

