import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Gethelp from './Gethelp'
import Register from './Register'
import Order from './Order'
import Admin from './Admin'
import Sellerlist from './Sellerlist'
import Registrationrequest from './Registrationrequest'
import Sellerpanel from './Sellerpanel'
import Yourproducts from './Yourproducts'
import Pendingorders from './Pendingorders'
import Orderrequests from './Orderrequests'
import Additem from './Additem'
import Listeditems from './Listeditems'
import Updateyourproduct from './Updateyourproduct'
import Postrequirement from './Postrequirement'
import Receivedrequests from './Receivedrequests'
import Searched from './Searched'
import Postlists from './Postlists'
import Createadmin from './Createadmin'
export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/createadmin' element={<Createadmin/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/gethelp' element={<Gethelp/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/order/:id' element={<Order/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/sellerlist' element={<Sellerlist/>}/>
      <Route path='/registrationrequest' element={<Registrationrequest/>}/>
      <Route path='/seller' element={<Sellerpanel/>}/>
      <Route path='/yourproducts' element={<Yourproducts/>}/>
      <Route path='/pendingorders' element={<Pendingorders/>}/>
      <Route path='/orderrequests' element={<Orderrequests/>}/>
      <Route path='/additem' element={<Additem/>}/>
      <Route path='/listeditems/:id' element = {<Listeditems/>}/>
      <Route path='/updateyourproduct/:id' element={<Updateyourproduct/>}/>
      <Route path='/postrequirement' element={<Postrequirement/>}/>
      <Route path='/receivedrequests/:id' element={<Receivedrequests/>}/>
      <Route path='/searched' element={<Searched/>}/>
      <Route path='/postlists' element={<Postlists/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
