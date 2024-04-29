import React, { useState, useEffect } from 'react'
import Card from '../Card'
import Carousel from '../Carousel'
import MainLayout from '../../Layout/MainLayout'
export default function Home() {
    const [foodcat, setFoodCat] = useState([])
    const [foodItem, setFoodItems] = useState([])
    const [search, setSearch] = useState('')


    const loadData = async () => {
        const data = await fetch("http://localhost:8080/api/data/getalldata", {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
        })
        const response = await data.json()
        // console.log(response[0], "data")
        // console.log(response[1], "data")
        setFoodItems(response[0]);
        setFoodCat(response[1])
    }

    const verifyToken = () => {
        localStorage.getItem("authToken")
        loadData()
    }

    useEffect(() => {
        verifyToken()


    }, [])

    return (

        <div>
            <MainLayout>

                <div
                    id="carouselExampleFade"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                    style={{ objectFit: "contain !important" }}
                >
                    <div className="carousel-inner " id="carousel">
                        <div className="carousel-caption " style={{ zIndex: "10" }}>
                            <div className=" d-flex justify-content-center">
                                <input
                                    className="form-control me-2 "
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                {/* <button
                                    className="btn btn-outline-success text-white"
                                    type="submit"
                                >
                                    Search
                                </button> */}
                            </div>
                        </div>

                        <div className="carousel-item active">
                            <img
                                src=" https://source.unsplash.com/random/900×700/?fruit"
                                className="d-block w-100  "
                                style={{ filter: "brightness(50%)" }}
                                alt="..."
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src=" https://source.unsplash.com/random/900×700/?pastry"
                                className="d-block w-100 "
                                style={{ filter: "brightness(50%)" }}
                                alt="..."
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src=" https://source.unsplash.com/random/900×700/?barbeque"
                                className="d-block w-100 "
                                style={{ filter: "brightness(50%)" }}
                                alt="..."
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleFade"
                        data-bs-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleFade"
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


                <div className='container'>

                    {
                        foodcat.length > 0 && foodcat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />

                                    {foodItem.length > 0 ? (
                                        foodItem.filter((item) =>

                                            (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                            .map((filteritems) => {
                                                return (
                                                    <div key={filteritems._id} className="col-12 col-md-6 col-lg-3">
                                                        <Card foodItem={filteritems}
                                                            // foodName={filteritems.name}
                                                            options={filteritems.options[0]}
                                                        // price={filteritems.price}
                                                        // img={filteritems.img}
                                                        />
                                                    </div>

                                                )
                                            })
                                    ) : (
                                        <div>No items found</div>
                                    )}
                                </div>
                            )
                        })
                    }






                </div>


            </MainLayout>
        </div>


    )
}
