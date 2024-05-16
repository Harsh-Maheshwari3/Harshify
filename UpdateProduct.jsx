import React, { useEffect, useRef, useState } from 'react'
import Breadcrum from '../../Breadcrum'
import Sidebar from '../Sidebar'
import formValidations from '../../Validations/formValidations'
import imageValidations from '../../Validations/imageValidation'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { addProduct,getProduct, updateProduct} from '../../../Store/ActionCreators/ProductActionCreators';
import { getMaincategory } from '../../../Store/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from '../../../Store/ActionCreators/SubcategoryActionCreators'
import { getBrand } from '../../../Store/ActionCreators/BrandActionCreators'


 var rte;
export default function UpdateProduct() {
  let[flag,setFlag]=useState(false)
  let {id} = useParams()
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
     pic:[]
  })
  let [show,setShow] = useState(false)
  let [errorMessage,setErrorMessage] = useState({
    name:"",
    color:"",
    size:"",
    baseprice:"",
    discount:"",
    quantity:"",
    name:"",
    pic:""
  })
  let dispatch =useDispatch()
  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  
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
           [name]:e.target.files? data.pic.concat(Array.from(value).map((x)=>x.name)):value
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
        id:id,
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
        description: rte.getHTMLCode(""),
        quantity:parseInt(data.quantity),
        pic:data.pic,
        }
        
        dispatch(updateProduct(item))
        navigate("/admin/product")
    }
    else
    setShow(true)
  }
  // setTimeout(function()
  //   rte=new window.RichTextEditor(refdiv.current);
  //   rte.setHTMLCode("");
  // },0)
  function getAPIData(){
    rte=new window.RichTextEditor(refdiv.current);
   
     dispatch(getMaincategory())
     dispatch(getSubcategory())
     dispatch(getBrand())
     dispatch(getProduct())
     if(ProductStateData.length){
      let item= ProductStateData.find((x)=>x.id === id)
      if(item){
        setData({...item})
        if(item.description){
          rte.setHTMLCode(item.description);
        }
      }
     }
     
  }
  useEffect(()=>{
     getAPIData()
  },[MaincategoryStateData.length,SubcategoryStateData.length,BrandStateData.length,ProductStateData.length])
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
                  <input type="text" name='name'value={data.name} onChange={getInputData} placeholder='Product Name' className='form-control'/>
                  {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.name}</p>:""}
                </div>
                      
                <div className="row">
                  <div className="col-lg-3 col-md-6 mb-3">
                  <label>Maincategory<span className='text-danger'>*</span></label>
                  <select name="maincategory"value={data.maincategory} onChange={getInputData} className='form-select'>
                    {
                      MaincategoryStateData.map((item,index)=>{
                        return <option key={index}>{item.name}</option>
                      })
                    }
                  </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                  <label>Subcategory<span className='text-danger'>*</span></label>
                  <select name="subcategory"value={data.subcategory} onChange={getInputData} className='form-select'>
                    {
                      SubcategoryStateData.map((item,index)=>{
                        return <option key={index}>{item.name}</option>
                      })
                    }
                  </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                  <label>Brand<span className='text-danger'>*</span></label>
                  <select name="brand"value={data.brand} onChange={getInputData} className='form-select'>
                    {
                      BrandStateData.map((item,index)=>{
                        return <option key={index}>{item.name}</option>
                      })
                    }
                  </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                  <label>Stock<span className='text-danger'>*</span></label>
                  <select name="stock"value={data.stock} onChange={getInputData} className='form-select'>
                    <option value={true}>In Stock</option>
                    <option value={false}>Out Of Stock</option>

                  </select>
                  </div>
                </div>

                <div className="row">
                     <div className="col-md-4 mb-3">
                      <label>Base Price<span className='text-danger'>*</span></label>
                      <input type='number' name='baseprice'value={data.baseprice} onChange={getInputData} className='form-control' placeholder='Base Price'/>
                      {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.baseprice}</p>:""}
                     </div>
                     <div className="col-md-4 mb-3">
                     <label>Discount<span className='text-danger'>*</span></label>
                      <input type='number' name='discount'value={data.discount} onChange={getInputData} className='form-control' placeholder='Discount'/>
                      {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.discount}</p>:""}
                     </div>
                     <div className="col-md-4 mb-3">
                     <label>Stock Quantity<span className='text-danger'>*</span></label>
                      <input type='number' name='quantity'value={data.quantity} onChange={getInputData} className='form-control' placeholder='Stock Quantity'/>
                      {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.quantity}</p>:""}
                     </div>

                </div>


                <div className="row">
                     <div className="col-md-6 mb-3">
                      <label>Color<span className='text-danger'>*</span></label>
                      <input type='text' name='color'value={data.color} onChange={getInputData} className='form-control' placeholder='Color'/>
                      {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.color}</p>:""}
                     </div>
                     <div className="col-md-6 mb-3">
                     <label>Size<span className='text-danger'>*</span></label>
                      <input type='number' name='size'value={data.size} onChange={getInputData} className='form-control' placeholder='Size'/>
                      {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.size}</p>:""}
                     </div>
                    </div>

                          <div className="mb-3">
                          <label>Description</label>
                          <div className='w-100' ref={refdiv}></div>
                          </div>

                <div className="mb-3">
                  <label>Pic</label>
                  <input type="file" name="pic" multiple onChange={getInputData} className='form-control'/>
                  {show?<p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.pic}</p>:""}
                </div>
                {data.pic.length?<p>Click on Image to Delete</p>:""}
                <div className='d-flex flex-wrap'>
                  {
                      data.pic.map((item,index)=>{
                       return <div key={index} className='mg-1'>
                                <img src={`/images/${item}`} height={50} width={50} onClick={()=>{
                                  data.pic.splice(index,1)
                                  setFlag(!flag)
                                }}/>      
                              </div>
                    })
                  }
                </div>
                <div className="mb-3">
                  <button type="submit"className='btn btn-primary w-100'>Update</button>
                </div>
              </form>
               
            </div>
        </div>
     </div>
    </>
  )
}