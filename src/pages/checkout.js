import { useSession } from "next-auth/client"
import Image from "next/image"
import Head from "next/head";
import { useSelector } from "react-redux"
import CheckoutProduct from "../components/CheckoutProduct"
import Header from "../components/Header"
import { selectItems, selectTotal } from "../slices/basketSlice"
import Currency from "react-currency-formatter"
import {loadStripe} from "@stripe/stripe-js"
import axios from "axios"
const stripePromise = loadStripe(process.env.stripe_public_key)
function Checkout() {
    const items =useSelector(selectItems)
    const [session]=useSession()
    const total=useSelector(selectTotal)

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;
        const checkoutSession = await axios.post("/api/create-checkout-session",{
              items: items,
              email: session.user.email,
        })
        const result = await stripe.redirectToCheckout({
            sessionId:checkoutSession.data.id
        })
        if(result.error) 
        {alert(result.error.message)}
    }
    return (
        <div className="bg-gray-100">
            <Head>
        <title>Amazon 2.0</title>
        <meta name="description" content="Created by Aswin" />
        <link rel="icon" href="https://pngimg.com/uploads/amazon/small/amazon_PNG27.png" />
      </Head>
            <Header/>
            <main className="lg:flex max-w-screen-2xl mx-auto">
                <div className="flex-grow shadow-sm m-5">
                    <Image src="https://links.papareact.com/ikj" width={1020} height={250} objectFit="contain" />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">{items.length===0 ? "Your Amazon Basket is empty" : "Shopping Basket"}</h1>
                        {items.map((item,i)=>(
                            <CheckoutProduct
                            key={i}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            category={item.category}
                            description={item.description}
                            rating={item.rating}
                            hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col bg-white p-10 shadow-md">
{items.length>0 && (
    <>
    <h2 className="whitespace-nowrap">
        SubTotal({items.length}items):{""}
        <span className="font-bold">
            <Currency quantity={total} currency="INR" />
        </span>
    </h2>
    <button role="link"  disabled={!session} className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
        {!session ? "Sign In To Checkout" : "Proceed To Checkout"}
    </button>
    </>
)}
                </div>
                </main>
        </div>
    )
}

export default Checkout
