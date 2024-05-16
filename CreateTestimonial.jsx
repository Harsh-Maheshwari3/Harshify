import React, { useEffect, useState } from 'react'
import Breadcrum from '../../Breadcrum'
import Sidebar from '../Sidebar'
import formValidations from '../../Validations/formValidations'
import { useNavigate } from 'react-router-dom'
//import {addTestimonial,getTestimonial} from "../../../Store/ActionCreators/TestimonialActionCreators"
import { addTestimonial,getTestimonial } from '../../../Store/ActionCreators/TestimonialActionCreators';

import { useDispatch, useSelector } from 'react-redux'
export default function CreateTestimonial() {
  let [data,setData] = useState({
     name:"",
     pic:"",
     star:5,
     message:""
  })
  let [show,setShow] = useState(false)
  let [errorMessage,setErrorMessage] = useState({
    name:"Name Field is Mandatory",
    pic:"pic is Mendatory",
    message:"Message Field is Mandatory"
  })
  let dispatch =useDispatch()
  let TestimonialStateData=useSelector(state=>state.TestimonialStateData)

  let navigate = useNavigate()
  function getInputData(e){
    let name=e.target.name
    let value= e.target.files?e.target.files[0].name:e.target.value
   // let value= e.target.files?e.target.files[0].name:e.target.value  //when real API is used
    setErrorMessage((old)=>{
      return{
        ...old,
        [name]: e.target.files?"":formValidations(e)
      }
    })
    setData((old)=>{
       return{
           ...old,
           [name]:value
       }
    })
    //setShow(false)
  }
 function postData(e){
    e.preventDefault()
    let error = Object.values(errorMessage).find((x)=>x?.length!==0)
    if(!error){
      let item=TestimonialStateData.find((x)=>x.name.toLowerCase() === data.name.toLowerCase())
      if(item){
          setErrorMessage((old)=>{
            return{
              ...old,
              'name':"Testimonial Name Already Exist"
            }
          })
          setShow(true)
      }
      else{
        dispatch(addTestimonial({ ...data }))
       
        // let formData=new FormData()
        // formData.append("name",data.name)    // When real API is used these 4 lines are used
        // formData.append("pic",data.pic)
        // formData.append("star",data.star)
        // formData.append("message",data.message)
        // dispatch(addTestimonial(formData))
        
        navigate("/admin/testimonial")
      }
     
    }
    else
    setShow(true)
  }
  function getAPIData(){
     dispatch(getTestimonial())
  }
  useEffect(()=>{
     getAPIData()
  },[TestimonialStateData.length])
  return (
    <>
     <Breadcrum title="Admin"/> 
     <div className="container-fluid">
        <div className="row">
            <div className="col-3">
                <Sidebar/>
            </div>
            <div className="col-9">
            <h5 className='bg-primary text-light text-center p-2'>Testimonial <button className='float-end text-light border-0'style={{background:"none"}} onClick={()=>window.history.back()}><i className='fa fa-arrow-left'></i></button></h5>
              <form onSubmit={postData}>
                <div className="mb-3">
                  <label>Name<span className='text-danger'>*</span></label>
                  <input type="text" name='name'onChange={getInputData} placeholder='Testimonial Name' className='form-control'/>
                  {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.name}</p>:""}
                </div>

                 <div className="row">
                   <div className="col-md-6 mb-3">
                     <label>Pic<span className='text-danger'>*</span></label>
                     <input type="file" name="pic" onChange={getInputData} className='form-control'/>
                     {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.pic}</p>:""}
                   </div>
                      <div className="mb-3">
                        <label>Star</label>
                        <input type="number" name="star" value={data.star}min={1} max={5} onChange={getInputData} className='form-control'/>
                    </div>
                 </div>

                 <div className="mb-3">
                 <label>Message<span className='text-danger'>*</span></label>
                 <textarea name='message' onChange={getInputData} rows="3" placeholder='Message...' className='form-control'></textarea>
                 {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.message}</p>:""}
                 </div>
                <div className="mb-3">
                  <button type="submit"className='btn btn-primary w-100'>Create</button>
                </div>
              </form>
               
            </div>
        </div>
     </div>
    </>
  )
}