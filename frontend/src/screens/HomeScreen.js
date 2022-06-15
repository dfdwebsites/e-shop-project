import axios from 'axios'
import Rating from '../components/Rating.js'
import { hideLoading, showLoading } from '../utils.js'

const HomeScreen = {
    render: async ()=>
    {
       showLoading()
        const  response  = await axios({
            url: 'http://localhost:5000/api/products',
            headers:{
                'Content-Type':'aplication/json',
            }
        })
        hideLoading()
        if(!response || response.statusText !== 'OK')
        {
            return `<div> Error in getting data</div>`
        }
        const products = response.data


        return `
        <section class="landing">
        <h1>Landing page</h1>
      
        </section>

        <section class="allProductsPage" >
            <h2>All Products</h2>
            <div>
                <ul class="products">
                ${products.map(product=>`
                    <li>        
                        <div class="product">
                            <a href="/#/product/${product._id}">
                                <img src=${product.image} alt="${product.name}">
                            </a>
                            <div class="productName">
                                <a class ="link" href="/#/product/${product._id}">
                                    ${product.name}
                                </a>
                            </div>
                            <div class="productRating">
                                ${Rating.render({
                                    value: product.rating,
                                    text:`${product.numReviews} reviews`})}
                            </div>
                            <div class="productDescription">
                            ${product.brand}
                            </div>
                            <div class="productPrice">
                                ${product.price}$
                            </div>
                        </div>
                    </li>
                `).join('\n')}
                </ul>
            </div>
        </section>
            

        `
    }
}
export default HomeScreen