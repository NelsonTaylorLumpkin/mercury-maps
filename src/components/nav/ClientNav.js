import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const ClientNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <div className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Booking</Link>
            </div>
            <div className="navbar__item active">
                <Link className="navbar__link" to="/clients">Clients</Link>
            </div>
            {/* <div className="navbar__item navbar__logout">
                <Link className="navbar__link" to="/profile">About Me</Link>
            </div> */}
            <div className="aboutMe">
                <Link className="navbar__link" to="/about">About Me</Link>
            </div>
            <div className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("mercury_user")
                    navigate("/", { replace: true })
                }}>Logout</Link>
            </div>
        </ul>
    )
}
