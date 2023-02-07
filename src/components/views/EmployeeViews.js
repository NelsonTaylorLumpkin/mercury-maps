import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/TicketContainer"
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { Profile } from "../profile/Profile"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Mercury Maps</h1>
                    <h3>Professional Hellenistic Astrologer, Tarot Reader, and Geomancer</h3>

                    <Outlet />
                </>
            }>
                <Route path="profile" element={ <Profile/>  } />
                <Route path="tickets" element={ <TicketContainer /> } />
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="employees/:employeeId" element={ <EmployeeDetails/> } />
			
            </Route>
        </Routes>
    )
}
