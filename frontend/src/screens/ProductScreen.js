import { hideLoading, parseRequestUrl, showLoading } from "../utils.js"
import { getProduct } from "../api.js";
import Rating from "../components/Rating.js";


const ProductScreen = {
    after_render: ()=>
    {
        const request = parseRequestUrl()
        document.getElementById('addBtn').addEventListener('click',
        ()=>
        {
            document.location.hash= `/cart/${request.id}`
        })
    },
    render: async ()=>
    {
        const request = parseRequestUrl();
        showLoading()
        const product = await getProduct(request.id)
        hideLoading()
        if(product.error)
        {
            return `<div> ${product.error} </div>`
        }

        return `
        <div class="content">

            <div class="backToHome">
                <a href="/#/"> <i class="ri-arrow-go-back-line"></i> Back to Home </a>
            </div>

            <div class="productDetails">

                <div class="productImg">
                    <img src=${product.image} alt=${product.name}/>
                </div>

                <div class="productInfo">
                    <ul>
                        <li>
                            <h1>${product.name}</h1>
                        </li>
                        <li>
                            ${Rating.render({
                                value: product.rating,
                                text:`${product.numReviews} reviews`
                            })}
                        </li>
                        <li>
                            Description: ${product.description}
                        </li>
                        <li class="productPrice">
                            Price: <strong>${product.price}$</strong>
                        </li>
                    </ul>
                </div>

                <div class="productAction">
                    <ul>
                        <li>
                            Price: ${product.price}$
                        </li>
                        <li>
                            Status: ${product.countInStock > 0? "<span class='inStock'> In Stock </span>" : "<span class='outStock'> Out of Stock </span>"}
                        </li>
                        <button id="addBtn" class="primary">Add to Cart</button>
                    </ul>
                </div>

                

            </div>
        </div> 
        `
    }
}
export default ProductScreen