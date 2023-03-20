import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/TicketContainer"
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { Profile } from "../profile/Profile"
import { AboutMe } from "../about/About"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>MERCURY MAPS</h1>
                    {/* <h3>YOUR FRIENDLY NEIGHBORHOOD FORTUNE-TELLER</h3> */}

                    <Outlet />
                </>
            }>
                <Route path="profile" element={ <Profile/>  } />
                <Route path="tickets" element={ <TicketContainer /> } />
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="employees/:employeeId" element={ <EmployeeDetails/> } />
                <Route path="about" element={ <AboutMe/> } />
            </Route>
        </Routes>
    )
}
