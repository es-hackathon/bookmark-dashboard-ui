import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import CharacterGrid from "../common/characters/CharacterGrid";
import axios from 'axios'
import SelectInput from "../common/SelectInput";

const HomePage = () => {

    const [items, setItems] = useState([])
    const [groups, setGroups] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [query, setQuery] = useState('')

    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true)
            const result = await axios(
                `${process.env.REACT_APP_API_URL}/cards`
            )
            setItems(result.data)

            const resultGroup = await axios(
                `${process.env.REACT_APP_API_URL}/groups`
            )
            setGroups(resultGroup.data)
            setIsLoading(false)
        }
        fetchItems()
    }, [])

    return (
        <div className="home-page">

            <div className="row">

                <div className="col-lg-4 ">
                    <div className="form-group d-flex">
                        <SelectInput
                            name="groupBySelect"
                            label=""
                            // value={course.authorId || ""}
                            defaultOption="Select group"
                            options={groups.map(g => ({
                                value: g.id,
                                text: g.name
                            }))}
                        />
                    </div>
                </div>
                <div className="col-lg-4 ">
                    <div className="form-group d-flex">

                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Search bookmark"
                            // onChange={(e)=>handleChange (e.target.value, items)}
                            onChange={e=>setQuery(e.target.value)}
                            value ={query}
                        />
                    </div>
                </div>
                <div className="col-lg-4 text-right">
                    <i className="fa fa-share-alt fa-2x" aria-hidden="true"></i>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-10">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link className="nav-link active" to="about">All <span className="badge badge-light">4</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="about">My favorities <span className="badge badge-light">4</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="about">Shared by me <span className="badge badge-light">4</span></Link>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-2 text-right">
                    <div className="form-group   d-flex text-right ">
                        <label htmlFor="sortBySelect" className="col-form-label text-nowrap">Sort by</label>
                        <select id="sortBySelect" className="form-control form-control-sm">
                            <option value="date">date added</option>
                            <option value="name">name</option>
                        </select>
                    </div>
                </div>

            </div>
            <br />
            <CharacterGrid isLoading={isLoading} items={items.filter(v=> {
            if(v.name.toLowerCase().indexOf(query) >=0 || v.description.toLowerCase().indexOf(query) >=0 ) {
                return true;
            } 
            return false;
        })} />
        </div>
    )
}

export default HomePage;