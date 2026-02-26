import React from "react";

function Product(props) {
    // state 
    let { productId, name, price, brand, description, image } = props.product;
    console.log(props);

    // return a react element
    return(
        <div className="text-2xl border-2 border-gray-300 rounded-lg p-4 m-5 ">
            <img src={image} alt={name} className="mb-4" />
            <h2 className="font-black">{name}</h2>
            <p className="font-bold">{brand}</p>
            <p className="text-3xl">${price}</p>
            <p className="text-amber-900">{description}</p>
        </div>
    )
}

export default Product;