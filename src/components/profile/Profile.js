import { EmployeeForm } from "./EmployeeForm"
import { ClientForm } from "./ClientForm"
import React from "react"

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

