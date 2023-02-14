import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [astrology, setAstrology] = useState(false)
    const [tarot, setTarot] = useState(false)
    const [iChing, setIChing] = useState(false)
    const [ticket, update] = useState({
        description: "",
        service: "",
        date: "",
        time: "",
        astrology: "",
        tarot: "",
        iChing: ""
    })

    const navigate = useNavigate()
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const localMercuryUser = localStorage.getItem("mercury_user")
    const mercuryUserObject = JSON.parse(localMercuryUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // console.log("You Clicked the Button")


        // TODO: Create the object to be saved to the API
        const ticketToSendToAPI = {
            userId: mercuryUserObject.id,
            description: ticket.description,
            service: ticket.service,
            date: ticket.date,
            time: ticket.time,
            astrology: ticket.astrology,
            tarot: ticket.tarot,
            iChing: ticket.iChing,
            dateCompleted: ""
        }
        return fetch(`http://localhost:8088/serviceTickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })


            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }
    // TODO: Perform the fetch() to POST the object to the API


    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Booking Information</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Familiarity:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What familiarity (if any) do you have with Astrology, Tarot, or I Ching?"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="booking date">Desired Booking Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Include Time Zone"
                        value={ticket.date}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.date = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="booking date">Desired Booking Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
                        placeholder="Include Time Zone"
                        value={ticket.time}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.time = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Astrology:</label>
                    <input type="checkbox"
                        value={ticket.astrology}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.astrology = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Tarot:</label>
                    <input type="checkbox"
                        value={ticket.tarot}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.tarot = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">I Ching:</label>
                    <input type="checkbox"
                        value={ticket.iChing}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.iChing = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
          

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}
