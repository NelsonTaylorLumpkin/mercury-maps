import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Ticket } from "./Ticket"
import "./Tickets.css"

export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    // const [services, setServices] = useState([])
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localMercuryUser = localStorage.getItem("mercury_user")
    const mercuryUserObject = JSON.parse(localMercuryUser)

    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedTickets)
        },
        [searchTermState]
    )



    const getAllTickets = () => {
        fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
            .then(response => response.json())
            .then((ticketArray) => {
                setTickets(ticketArray)

            })
    }

    useEffect(
        () => {
            getAllTickets()
            fetch(`http://localhost:8088/employees?_expand=userId`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)

                })
            // console.log("Initial state of tickets", tickets) // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (mercuryUserObject.staff) {
                //for Employees
                setFiltered(tickets)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === mercuryUserObject.id)
                setFiltered(myTickets)
                //for Customers
            }
        },
        [tickets]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === mercuryUserObject.id && ticket.dateCompleted === ""

                })
                setFiltered(openTicketArray)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === mercuryUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )

    return <>
        {/* {
            mercuryUserObject.staff
        } */}
         <>
            <button onClick={() => navigate("/ticket/create")}>Book Here</button>
            <button onClick={() => updateOpenOnly(true)} >Open Booking</button>
            <button onClick={() => updateOpenOnly(false)} >All Bookings</button>
        </>
        
        <h2>List of Tickets</h2>
        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => <Ticket employees={employees}
                        getAllTickets={getAllTickets}
                        currentUser={mercuryUserObject}
                        ticketObject={ticket}
                        key={ticket.id} />
                )
            }

        </article>
    </>
}
