import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {

    const localMercuryUser = localStorage.getItem("mercury_user")
    const mercuryUserObject = JSON.parse(localMercuryUser)
    let assignedEmployee = null

    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket__finish">Finish</button>
        }
        else {
            return ""
        }
    }
    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllTickets()
                    })
            }} className="ticket__delete">Delete</button>
        }
        else {
            return ""
        }
    }

    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            time: ticketObject.time,
            date: ticketObject.date,
            dateCompleted: new Date()
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(getAllTickets)
    }


    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return (

                fetch(`http://localhost:8088/employeeTickets`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        employeeId: ticketObject.id,
                        serviceTicketId: ticketObject.id
                    })
                })
                    .then(response => response.json())
                    .then(() => {
                        getAllTickets()
                    })

            )

        }
    }

    return <section className="ticket" key={`ticket--${ticketObject.id}`}>
        <header>
            {
                currentUser.staff
                    ? `Ticket ${ticketObject.id}`
                    : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            }
        </header>
        <section>{ticketObject.description}</section>
        <section>{ticketObject.date}</section>
        <section>{ticketObject.time}</section>


        <footer>
            {/* {
                ticketObject.employeeTickets.length
                    ? `Currently being worked on ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : buttonOrNoButton()

            }
            // {
            //     canClose()
            // } */}
            {
                canClose()
            }
            {
                deleteButton()
            }
        </footer>
    </section>



}