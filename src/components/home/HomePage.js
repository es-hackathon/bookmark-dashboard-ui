import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import CharacterGrid from "../common/characters/CharacterGrid";
import axios from 'axios'

const HomePage = () => {

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [query, setQuery] = useState('')

    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true)
            const result = await axios(
                `https://www.breakingbadapi.com/api/characters?name=${query}`
            )


            setItems(result.data)
            setIsLoading(false)
        }

        fetchItems()
    }, [query])

    return (
        <div className="home-page">

            <div className="row">

                <div className="col-lg-4 ">
                    <div className="form-group d-flex">
                        <label for="groupBySelect" className="col-form-label text-nowrap">Group by</label>
                        <select id="groupBySelect" className="form-control form-control-sm">
                            <option value="date">date added</option>
                            <option value="name">name</option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-4 ">
                    <div className="form-group d-flex">

                        <input
                            type="text"

                            className="form-control form-control-sm"
                            placeholder="Search bookmark"

                        />
                    </div>
                </div>
                <div className="col-lg-4 text-right">
                    <i className="fa fa-share-alt fa-2x" aria-hidden="true"></i>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-10">
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <Link class="nav-link active" to="about">All <span class="badge badge-light">4</span></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="about">My favorities <span class="badge badge-light">4</span></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="about">Shared by me <span class="badge badge-light">4</span></Link>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-2 text-right">
                    <div className="form-group   d-flex text-right ">
                        <label for="sortBySelect" className="col-form-label text-nowrap">Sort by</label>
                        <select id="sortBySelect" className="form-control form-control-sm">
                            <option value="date">date added</option>
                            <option value="name">name</option>
                        </select>
                    </div>
                </div>

            </div>
            <br />
            <CharacterGrid isLoading={isLoading} items={items} />
        </div>
    )
}

export default HomePage;