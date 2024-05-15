import React, { useEffect, useState } from 'react'
import Breadcrum from './Breadcrum'
import { Link, useNavigate } from 'react-router-dom'

export default function Profile() {
    let [user,setUser]=useState({})
    let navigate =useNavigate()
    useEffect(()=>{
     (async()=>{
        let response = await fetch("/user/"+localStorage.getItem("userid"),{
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
        response=await response.json()
        if(response)
            setUser(response)
        else
        navigate("/login")
      }) ()
    })
  return (
    <>
      <Breadcrum title="Buyer Profile"/>
      <div className="container my-3">
        <div className="row">
             <div className="col-md-6">
             {
                            user.pic?
                            <img src={`/images/${user.pic}`} height={430} width="100%"/>:
                            <img src={`/img/noimage.jpg`} height={430} width="100%"/>
             }

             </div>
             <div className="col-md-6">
                <h5 className='bg-primary text-light text-center p-2'>Buyer Profile Section</h5>
                <table className='table table-bordered table-hover'>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>{user.name}</th>
                        </tr>
                        <tr>
                            <th>User Name</th>
                            <th>{user.username}</th>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <th>{user.email}</th>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <th>{user.phone}</th>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <th>{user.address}</th>
                        </tr>
                        <tr>
                            <th>Pin</th>
                            <th>{user.pin}</th>
                        </tr>
                        <tr>
                            <th>City</th>
                            <th>{user.city}</th>
                        </tr>
                        <tr>
                            <th>State</th>
                            <th>{user.state}</th>
                        </tr>
                        <tr>
                            <th colSpan={2}>
                              <Link to="/update-profile" className='btn btn-primary'>Update Profile</Link>
                            </th>
                            
                        </tr>
                    </tbody>
                </table>
             </div>
        </div>
        </div> 
    </>
  )
}
