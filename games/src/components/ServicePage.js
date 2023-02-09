import * as React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {bookService, getService, isAuthenticated, login} from "../apiCalls";

export default function ProductPage() {
    const [loading, setLoading] = useState(true)
    const [service, setService] = useState([])
    const [authenticated, setAuthenticated] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        async function fetchData() {
            console.log(id)
            const rawProduct = await getService(id)
            setService(rawProduct.data)
            const auth = await isAuthenticated()
            console.log(auth)
            if (auth.data !== "") {
                setAuthenticated(true)
            }
        }

        fetchData().then(() => {
            setLoading(false)
        })
    }, [])

    if (!loading) {
        if (authenticated) {
            return (
                <div className="flex flex-col bg-white rounded">
                    <h1>
                        {console.log(service)}
                        {service.name}
                    </h1>
                    <p>
                        {service.info}
                    </p>
                    <img src={service.pictures[0] !== "placeholder" ? `/${service.pictures[0]}` : ""}
                         alt={service.name}/>
                    <button onClick={() => {
                        bookService(service._id)
                    }}>BOOK SERVICE
                    </button>
                </div>
            )
        } else {
            return (
                <div className={"flex flex-col bg-white rounded ju"}>
                    <label htmlFor={"loginMail"}>Email</label>
                    <input type={"email"} name={"email"} id={"loginMail"}/>
                    <label htmlFor={"loginPassword"}>Password</label>
                    <input type={"password"} name={"password"} id={"loginPassword"}/>
                    <button
                        onClick={() => {
                            login(document.getElementById("loginMail").value, document.getElementById("loginPassword").value).then(() => {
                                window.location.reload()
                            })
                        }}>Login
                    </button>
                </div>
            )
        }
    }
}