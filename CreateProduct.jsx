import React, { useEffect, useRef, useState } from 'react'
import Breadcrum from '../../Breadcrum'
import Sidebar from '../Sidebar'
import formValidations from '../../Validations/formValidations'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { addProduct } from '../../../Store/ActionCreators/ProductActionCreators';
import { getMaincategory } from '../../../Store/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from '../../../Store/ActionCreators/SubcategoryActionCreators'
import { getBrand } from '../../../Store/ActionCreators/BrandActionCreators'
import imageValidations from '../../Validations/imageValidation'

 var rte
export default function CreateProduct() {
  let [data,setData] = useState({
     name:"",
     maincategory:"",
     subcategory:"",
     brand:"",
     color:"",
     size:"",
     baseprice:0,
     discount:0,
     finalprice:0,
     stock:"",
     description:"",
     quantity:0,
     pic:""
  })
  let [show,setShow] = useState(false)
  let [errorMessage,setErrorMessage] = useState({
    name:"Name Field is Mandatory",
    color:"Color Field is Mandatory",
    size:"Size Field is Mandatory",
    baseprice:"Base Price Field is Mandatory",
    discount:"Discount Field is Mandatory",
    quantity:"Stock Quantity Field is Mandatory",
    name:"Name Field is Mandatory",
    
    pic:"pic is Mendatory"
  })
  let dispatch =useDispatch()
  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)

  let navigate = useNavigate()
  var refdiv=useRef(null);
 

  // setTimeout(function(){
  //   rte=new window.RichTextEditor(refdiv.current);
   
  // },0)

  function getInputData(e){
    let name=e.target.name
      let value= e.target.files?e.target.files : e.target.value
   // let value= e.target.files?e.target.files[0].name:e.target.value  //when real API is used
    setErrorMessage((old)=>{
      return{
        ...old,
        [name]: e.target.files? imageValidations(e) :formValidations(e)
      }
    })
    setData((old)=>{
       return{
           ...old,
           [name]:e.target.files? Array.from(value).map((x)=>x.name):value
       }
    })
    //setShow(false)
  }
  
 function postData(e){
    e.preventDefault();
    let error = Object.values(errorMessage).find((x)=>x?.length!==0)
    if(!error){
      let bp=parseInt(data.baseprice)
      let d=parseInt(data.discount)
      let fp=parseInt(bp-bp*d/100)
     let item={
        name:data.name,
        maincategory:data.maincategory,
        subcategory:data.subcategory,
        brand:data.brand,
        baseprice:bp,
        discount:d,
        finalprice:fp,
        color:data.color,
        size:data.size,
        stock:data.stock,
        description: rte.getHTMLCode(),
        quantity:parseInt(data.quantity),
        pic:data.pic,
        }
        
        dispatch(addProduct(item))
        navigate("/admin/product")
    }
    else
    setShow(true)
  }
  // setTimeout(function(){
  //   rte=new window.RichTextEditor(refdiv.current);
  //   rte.setHTMLCode("");
  // },0)
  function getAPIData(){
    rte=new window.RichTextEditor(refdiv.current);
    rte.setHTMLCode("");
     dispatch(getMaincategory())
     dispatch(getSubcategory())
     dispatch(getBrand())
     if(MaincategoryStateData.length && SubcategoryStateData.length && BrandStateData.length){
      setData((old)=>{
         return{
           ...old,
           'maincategory':MaincategoryStateData[0].name,
           'subcategory':SubcategoryStateData[0].name,
           'brand':BrandStateData[0].name,
         }
      })
     }
     
  }
  useEffect(()=>{
    
     getAPIData()
  },[MaincategoryStateData.length,SubcategoryStateData.length,BrandStateData.length])
  return (
    <>
     <Breadcrum title="Admin"/> 
     <div className="container-fluid">
        <div className="row">
            <div className="col-3">
                <Sidebar/>
            </div>
            <div className="col-9">
            <h5 className='bg-primary text-light text-center p-2'>Product <button className='float-end text-light border-0'style={{background:"none"}} onClick={()=>window.history.back()}><i className='fa fa-arrow-left'></i></button></h5>
              <form onSubmit={postData}>
                <div className="mb-3">
                  <label>Name<span className='text-danger'>*</span></label>
                  <input type="text" name='name'onChange={getInputData} placeholder='Product Name' className='form-control'/>
                  {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.name}</p>:""}
                </div>
                      
                <div className="row">
                  <div className="col-lg-3 col-md-6 mb-3">
                  <label>Maincategory<span className='text-danger'>*</span></label>
                  <select name="maincategory" onChange={getInputData} className='form-select'>
                    {
                      MaincategoryStateData.map((item,index)=>{
                        return <option key={index}>{item.name}</option>
                      })
                    }
                  </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                  <label>Subcategory<span className='text-danger'>*</span></label>
                  <select name="subcategory" onChange={getInputData} className='form-select'>
                    {
                      SubcategoryStateData.map((item,index)=>{
                        return <option key={index}>{item.name}</option>
                      })
                    }
                  </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                  <label>Brand<span className='text-danger'>*</span></label>
                  <select name="brand" onChange={getInputData} className='form-select'>
                    {
                      BrandStateData.map((item,index)=>{
                        return <option key={index}>{item.name}</option>
                      })
                    }
                  </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                  <label>Stock<span className='text-danger'>*</span></label>
                  <select name="stock" onChange={getInputData} className='form-select'>
                    <option value={true}>In Stock</option>
                    <option value={false}>Out Of Stock</option>

                  </select>
                  </div>
                </div>

                <div className="row">
                     <div className="col-md-4 mb-3">
                      <label>Base Price<span className='text-danger'>*</span></label>
                      <input type='number' name='baseprice' onChange={getInputData} className='form-control' placeholder='Base Price'/>
                      {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.baseprice}</p>:""}
                     </div>
                     <div className="col-md-4 mb-3">
                     <label>Discount<span className='text-danger'>*</span></label>
                      <input type='number' name='discount' onChange={getInputData} className='form-control' placeholder='Discount'/>
                      {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.discount}</p>:""}
                     </div>
                     <div className="col-md-4 mb-3">
                     <label>Stock Quantity<span className='text-danger'>*</span></label>
                      <input type='number' name='quantity' onChange={getInputData} className='form-control' placeholder='Stock Quantity'/>
                      {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.quantity}</p>:""}
                     </div>

                </div>


                <div className="row">
                     <div className="col-md-6 mb-3">
                      <label>Color<span className='text-danger'>*</span></label>
                      <input type='text' name='color' onChange={getInputData} className='form-control' placeholder='Color'/>
                      {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.color}</p>:""}
                     </div>
                     <div className="col-md-6 mb-3">
                     <label>Size<span className='text-danger'>*</span></label>
                      <input type='number' name='size' onChange={getInputData} className='form-control' placeholder='Size'/>
                      {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.size}</p>:""}
                     </div>
                    </div>

                          <div className="mb-3">
                          <label>Description</label>
                          <div className='w-100' ref={refdiv}></div>
                          </div>

                <div className="mb-3">
                  <label>Pic<span className='text-danger'>*</span></label>
                  <input type="file" name="pic" multiple onChange={getInputData} className='form-control'/>
                  {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.pic}</p>:""}
                </div>
        <hr/>
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