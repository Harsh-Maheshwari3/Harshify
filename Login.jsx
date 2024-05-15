import React, { useState } from 'react'
import Breadcrum from './Breadcrum'
import { Link, useNavigate } from 'react-router-dom'
export default function Login() {
    let navigate=useNavigate()
    let [data,setData]=useState({
        username:"",
        password:""
    })
   
    let [errorMessage,setErrorMessages]=useState("")
    function getInputData(e){
     let {name,value} = e.target
     setData((old)=>{
        return{
            ...old,
            [name]:value
        }
     })
    }
    async function postData(e){
        e.preventDefault()
         let response = await fetch("/user",{
            method:"get",
            headers:{
                "content-type":"application/json"
            }
         })
         response = await response.json()
         let item =response.find((x)=>x.username===data.username || x.email===data.username)
         if(item){
            if(item.password===data.password){
               localStorage.setItem("login",true)
               localStorage.setItem("name",item.name)
               localStorage.setItem("userid",item.id)
               localStorage.setItem("role",item.role)
               if(item.role==="Admin")
               navigate("/Admin")
               else
               navigate("/profile")
            }
            else
            setErrorMessages("Invalid Username or Password")
         }
         else
         setErrorMessages("Invalid Username or Password")
      }
  return (
    <>
      <Breadcrum title="Login"/>
      <div className="container my-3">
       <div className="row">
          <div className="col-md-8 col-sm-10 m-auto">
          <div className="row">
          <div className="col-md-8 col-sm-10 m-auto">
          <h5 className='bg-primary text-center text-light p-2'><span className='text-bold'> Login</span> to your Account</h5>
        <form onSubmit={postData}>
               <div className="mb-3">
                    <input type="text" name="username" onChange={getInputData} placeholder='User Name' className='form-control'  />
                    {errorMessage ?<p className='text-danger'>{errorMessage}</p>:""}
              </div>
                <div className="mb-3">
                    <input type="password" name="password" onChange={getInputData} placeholder='Password' className='form-control'  />
              </div>
            
            <div className="mb-3">
                <button type="submit" className='btn btn-primary w-100'>Login</button>
            </div>
        </form>
        <div className='d-flex justify-content-between'>
        <Link to="#">Forget Password</Link>
        <Link to="/signup">Doesn't Have an Account?Create</Link>


        </div>
          </div>
        </div>

          </div>
       </div>
        </div> 
    </>
  )
}
