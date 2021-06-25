import Product from "./Product"

function ProductFeed({products}) {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
          {products.slice(0,4).map(({id,title,image,price,category,description})=>(
              <Product key={id} id={id} title={title} description={description} price={price} category={category} image={image}/>
          ))}
          <img src="https://links.papareact.com/dyz" className="md:col-span-full" alt="" />
          <div className="md:col-span-2 xl:col-span-2">
          {products.slice(4,5).map(({id,title,image,price,category,description})=>(
              <Product key={id} id={id} title={title} description={description} price={price} category={category} image={image}/>
          ))}
          </div>
          {products.slice(5,products.length).map(({id,title,image,price,category,description})=>(
              <Product key={id} id={id} title={title} description={description} price={price} category={category} image={image}/>
          ))}
        </div>
    )
}

export default ProductFeed


