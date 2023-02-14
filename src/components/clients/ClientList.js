import { useEffect, useState } from "react"
import { Client } from "./Client"
import "./Client.css"

export const ClientList = () => {
    const [Clients, setClients] = useState([])

    useEffect(
        () => {
         fetch(`http://localhost:8088/users?isStaff=false`)
            .then(response => response.json())
            .then((clientArray) => {
                setClients(clientArray)
            })
        },
        []
    )
    return <article className="clients">
        {
            Clients.map(client => <Client key={client.id} id={client.id} fullName={client.fullName} email={client.email}/>)
                
           
        }
    </article>
}