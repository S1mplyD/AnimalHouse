import * as React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {addToCart, getProduct, isAuthenticated, login} from "../apiCalls";

export default function ProductPage() {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [authenticated, setAuthenticated] = useState(false)
    const {id} = useParams()
    useEffect(() => {
        async function fetchData() {
            const rawProduct = await getProduct(id)
            setProduct(rawProduct.data)
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
                        {console.log(product._id)}
                        {product.title}
                    </h1>
                    <img src={product.mainPhoto !== "placeholder" ? `/${product.mainPhoto}` : ""}
                         alt={product.title}/>
                    <label htmlFor={"quantity"}>Quantity</label>
                    <input type={"number"} id={"quantity"} name={"quantity"}/>
                    <button onClick={() => {
                        addToCart(product._id, document.getElementById("quantity").value).then(() => {
                            console.log("test")
                        })
                    }}>ADD TO CART
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