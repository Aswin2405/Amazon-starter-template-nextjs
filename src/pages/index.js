import Head from "next/head";
import Banner from "../components/Banner";
import Header from '../components/Header'
import ProductFeed from "../components/ProductFeed";
export default function Home({products}) {
  return (
    <div className="bg-gray-200">
      <Head>
        <title>Amazon 2.0</title>
        <meta name="description" content="Created by Aswin" />
        <link rel="icon" href="https://pngimg.com/uploads/amazon/small/amazon_PNG27.png" />
      </Head>
     <Header/>
     <main className="max-w-screen-2xl mx-auto">
       <Banner />
       <ProductFeed products={products}/>
     </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const products=await fetch("https://fakestoreapi.com/products").then(res=>res.json());
  return{
    props:{
      products,
    }
  }
}


