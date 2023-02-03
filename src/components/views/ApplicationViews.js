
import { EmployeeViews } from "./EmployeeViews"
import { ClientViews } from "./ClientViews"

export const ApplicationViews = () => {
	const localMercuryUser = localStorage.getItem("mercury_user")
    const mercuryUserObject = JSON.parse(localMercuryUser)
    
    if (mercuryUserObject.staff) {
        //Return employee views
        return <EmployeeViews />
    }
    else {
        //Return customer views
        return <ClientViews />
    }
    
}
