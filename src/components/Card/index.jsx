import React from 'react'
import "./index.css";

export const Card = ({image, name, price, category}) => {
  return (
    <div className="product-card">
		<div className="badge">{category}</div>
		<div className="product-tumb">
			<img src={image} alt="" />
		</div>
		<div className="product-details">
			<h4><a href="">{name}</a></h4>
			<p>{price} đ</p>
		</div>
	</div>
  )
}
