import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Screens/Cart";
import Model from "../Model"
import { useCartState } from "./ContextReducer";
export default function Navbar() {
    const [cartview, setCartView] = useState(false)
    const navigate = useNavigate();
    let data = useCartState();

    const handleLogout = () => {

        localStorage.removeItem("authToken")
        navigate("/login")

    }


    const verifyToken = () => {
        localStorage.getItem("authToken")

    }

    useEffect(() => {
        verifyToken()

    }, []);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand  fs-1 fst-italic" to="/">
                        GoFood
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active fs-5"
                                    aria-current="page"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            {localStorage.getItem("authToken") ?
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active fs-5"
                                        aria-current="page"
                                        to="/myorder"
                                    >
                                        My Orders
                                    </Link>
                                </li>
                                : null}
                        </ul>

                        {!localStorage.getItem("authToken") ?

                            <div className="d-flex">
                                <Link className="btn bg-white  text-success mx-1" to="/login">
                                    Login
                                </Link>


                                <Link className="btn bg-white  text-success mx-3" to="/signup">
                                    Signup
                                </Link>
                            </div>
                            :

                            <div>
                                <div className="btn bt  n-light ms-5 dropdown mx-2 bg-white text-dark rounded" onClick={() => setCartView(true)}>
                                    my Cart
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {data.length}
                                        <span className="visually-hidden">unread messages</span>
                                    </span>
                                </div>
                                {cartview ? <Model onClose={() => setCartView(false)}><Cart></Cart></Model> : null}

                                <div className="btn btn-outline-light bg-danger text-white rounded ms-4"
                                    onClick={handleLogout} >

                                    LOgout
                                </div>
                            </div>

                        }

                    </div>
                </div>
            </nav>
        </div>
    );
}
