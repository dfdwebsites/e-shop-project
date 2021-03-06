import { getProduct } from "../api"
import { parseRequestUrl, reRender } from "../utils"
import { getCartItems, setCartItems } from "../localStorage.js"

const addToCart = (item , forceUpdate =  false)=>
{
    let cartItems = getCartItems()
    const existItem = cartItems.find(x=> x.product === item.product)
    if(existItem)
    {
        if(forceUpdate)
        {
            cartItems = cartItems.map((x)=> x.product === existItem.product ? item : x)
        }
    }
    else
    {
        cartItems = [...cartItems, item]
    }
    setCartItems(cartItems)
    if(forceUpdate)
    {
        reRender(CartScreen)
    }
}

const removeFromCart = (id)=>
{
    setCartItems(getCartItems().filter(x=>x.product !== id))

    if(id === parseRequestUrl().id)
    {
        document.location.hash = '/cart'
    }
    else
    {
        reRender(CartScreen)
    }
}

const CartScreen = 
{
    after_render: ()=>
    {
       const qtySelects =  document.getElementsByClassName('qty-select')
       Array.from(qtySelects).forEach(qtySelect=>
        {
            qtySelect.addEventListener('change', (e)=>
            {
                const item = getCartItems().find(x=> x.product === qtySelect.id)
                addToCart({...item, qty: Number(e.target.value)}, true)
            })
        })
        const deleteBtns = document.getElementsByClassName('deleteBtn')
        Array.from(deleteBtns).forEach(deleteBtn=>
            {
                deleteBtn.addEventListener('click', ()=>
                {
                    removeFromCart(deleteBtn.id)
                })
            })
            document.getElementById('checkoutBtn').addEventListener('click', ()=>
            {
                document.location.hash = '/signin'
            })
    },
    render: async ()=>
    {
        const request = parseRequestUrl()
        
        if(request.id)
        {
            const product = await getProduct(request.id)
            addToCart({
                product: product._id,
                name:product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty:1
            })
            
        }
        
        const cartItems = getCartItems()
        return `
            <div class="cart">
                <div class="cartList">
                    <ul class="cartListContainer">
                        <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                        </li>
                        ${cartItems.length===0? 
                            '<div> Cart is Empty <a href="/#/"> Go Shopping</a></div>':
                            cartItems.map( item =>
                                {
                                    return  `
                                    <li>
                                    <div class="cartImage">
                                        <img src="${item.image}" alt="${item.name}"/>
                                    </div>
                                    <div class="cartName">
                                        <div>
                                            <a class ="link" href="/#/product/${item.product}">
                                                ${item.name}
                                            </a>
                                        </div>
                                        <div>
                                            Qty: <select class="qty-select" id="${item.product}">
                                                ${[...Array(item.countInStock).keys()].map((x) => 
                                                    item.qty === x + 1 ? 
                                                    `<option selected value="${x + 1}">${x + 1}</option>` : 
                                                    `<option value="${x + 1}">${x + 1}</option>`)         
                                            }
                                            </select>
                                            <button type="button" class="deleteBtn" id="${item.product}">
                                            Delete</button>
                                        </div>
                                    </div>
                                    <div class="cartPrice">
                                        $${item.price}
                                    </div>
                                    </li>
                                    `
                                }).join('\n')
                        
                        }
                    
                    </ul>

                </div>
                <div class="cartAction">
                    <h3>
                        SubTotal (${cartItems.reduce((previous,current)=> previous + current.qty, 0 )} items ) 
                        :
                        $${cartItems.reduce((previous,current)=> previous + current.price * current.qty, 0 )}
                    </h3>
                    <button class="primary" id="checkoutBtn"> Proceed to Checkout</button>
                </div>
            </div>
        
        `   
    }
}
export default CartScreen