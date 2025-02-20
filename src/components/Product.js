import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Currency from "react-currency-formatter"
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const { default: Image } = require("next/image");
const MAX_RATING=5
const MIN_RATING=1
function Product({id,title,image,price,category,description}) {
    const dispatch=useDispatch()
    const[rating]=useState(
        Math.floor(Math.random()*(MAX_RATING-MIN_RATING+1))+MIN_RATING
    )
    const[hasPrime]=useState(Math.random()<0.5)
    const addItemToBasket=()=>{
        const product={
            id,title,image,price,category,description,rating,hasPrime
        }
        dispatch(addToBasket(product))
    }
    return (
        <div className="flex flex-col relative bg-white m-5 p-10 z-30">
           <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p> 
           <Image src={image} height={200} width={200} objectFit="contain" />
           <h4 className="my-3">{title}</h4>
           <div className="flex">
               {Array(rating).fill().map((_, i) =>(
                   <StarIcon key={i} className="h-5 text-yellow-500"/>
               ))}
           </div>
           <p className="line-clamp-2 text-xs my-2">{description}</p>
           <div className="mb-5">
               <Currency quantity={price} currency="INR" />
           </div>
           {hasPrime&&(
               <div className="flex items-center space-x-2 -mt-5">
                   <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                   <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
               </div>
           )}
           <button onClick={addItemToBasket} className="mx-auto button">Add to Basket</button>
        </div>
    )
}

export default Product
