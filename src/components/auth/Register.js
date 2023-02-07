import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [client, setClient] = useState({
        email: "",
        fullName: "",
        isStaff: false,
        phone: 0,
        birthday: "",
        birthtime: 0,
        birthlocation: "",
        hasBC: false

    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(client)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("mercury_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${client.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateClient = (evt) => {
        const copy = {...client}
        copy[evt.target.id] = evt.target.value
        setClient(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Welcome!</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateClient}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email Address </label>
                    <input onChange={updateClient}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phone"> Phone Number </label>
                    <input onChange={updateClient}
                        type="phone" id="phone" className="form-control"
                        placeholder="Phone Number" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="DOB"> Date of Birth </label>
                    <input onChange={updateClient}
                        type="date" id="birthday" className="form-control"
                        placeholder="mm/dd/yyyy" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="TOB"> Time of Birth </label>
                    <input onChange={updateClient}
                        type="time" id="birthtime" className="form-control"
                        placeholder="Enter the hour and minute that you took your first breath" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="LOB"> Location of Birth </label>
                    <input onChange={updateClient}
                        type="text" id="birthlocation" className="form-control"
                        placeholder="City, State, Country" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...client}
                        copy.hasBC = evt.target.checked
                        setClient(copy)
                    }}
                        type="checkbox" id="hasBC"/>
                    <label htmlFor="birthCertificate"> I have my birth certificate </label>
                    
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

