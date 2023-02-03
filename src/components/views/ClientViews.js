import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../tickets/TicketForm"
import { TicketContainer } from "../tickets/TicketContainer"
import { ClientList } from "../clients/ClientList"
import { ClientDetails } from "../clients/ClientDetails"

export const ClientViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Mercury Maps</h1>
                    <div>Past, Present, and Future</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketContainer /> } />
                
				<Route path="ticket/create" element={ <TicketForm /> } />
                <Route path="clients" element={ <ClientList /> } />
                <Route path="clients/:clientId" element={ <ClientDetails/> } />
			
            </Route>
        </Routes>
    )
}