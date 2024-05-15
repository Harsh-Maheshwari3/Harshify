import React from 'react'
import { Link } from 'react-router-dom'
import SingleProduct from './SingleProduct'
export default function ProductItem({item}) {
  return (
    <div className="card" > 
        <img src={`/images/${item.pic[0]}`} style={{height:200,width:"100%"}}  className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text"><del className='text-danger'>&#8377;{item.baseprice}</del>&#8377;{item.finalprice}<sup>{item.discount}% off</sup></p>
          <Link to={`/single-product/${item.id}`} className="btn btn-primary w-100">Add to Cart</Link>
        </div>
      </div>
  )
}
