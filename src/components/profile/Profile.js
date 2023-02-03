import { EmployeeForm } from "./EmployeeForm"
import { ClientForm } from "./ClientForm"

export const Profile = () => {

    const localMercuryUser = localStorage.getItem("mercury_user")
    const mercuryUserObject = JSON.parse(localMercuryUser)
    
    if (mercuryUserObject.staff) {
       
        return <EmployeeForm/>
    }
    else {
        return <ClientForm/>
    }
}
