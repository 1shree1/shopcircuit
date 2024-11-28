import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import {Link, useNavigate } from "react-router-dom"
import Data from './Data';
import { searchedItem } from './Axios';
export default function Search() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const handleSearch= async(e)=>{
    e.preventDefault()
    const items = await searchedItem(search)
    navigate("/searched", {state:{items}})
  }
  return (
    <>
    <div className='searchmain'>
      <div className="post">
      <Link to="/postrequirement">
        <h4 className='requirement'>Post an item requirement</h4>
        </Link>
        </div>
    <div className='search'>
        <form action="" className='searchform' onSubmit={handleSearch}>
            <input className='searchinput' name='search' onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search items........"/>
            <button type='submit'><FaSearch /></button>
        </form>
    </div>
    </div>
    </>
  )
}
