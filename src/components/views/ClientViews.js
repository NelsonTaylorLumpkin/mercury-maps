import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../tickets/TicketForm"
import { TicketContainer } from "../tickets/TicketContainer"
import { ClientList } from "../clients/ClientList"
import { ClientDetails } from "../clients/ClientDetails"
import { TicketEdit } from "../tickets/TicketEdit"
import { AboutMe } from "../about/About"
import { Services } from "../services/Services"
export const ClientViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>MERCURY MAPS</h1>
                    {/* <h3>YOUR FRIENDLY NEIGHBORHOOD FORTUNE TELLER</h3> */}
                    
                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketContainer /> } />
                <Route path="ticket/edit" element={ <TicketEdit /> } />
				<Route path="ticket/create" element={ <TicketForm /> } />
                <Route path="clients" element={ <ClientList /> } />
                <Route path="clients/:clientId" element={ <ClientDetails/> } />
                <Route path="about" element={ <AboutMe/> } />
                <Route path="services" element={ <Services/> } />
            </Route>
        </Routes>
    )
}
