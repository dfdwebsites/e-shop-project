
import { createOrder } from "../api.js"
import CheckoutSteps from "../components/CheckoutSteps.js"
import { getCartItems, getPayment, getShipping, getUserInfo, setPayment, cleanCart } from "../localStorage.js"
import { hideLoading, showLoading, showMessage } from "../utils.js"

const converCartToOrder = ()=>
{
    const orderItems = getCartItems()
    if (orderItems.length === 0)
    {
        document.location.hash = '/cart'
    }
    const shipping = getShipping()
    if(!shipping.address)
    {
        document.location.hash = '/shipping'
    }
    const payment = getPayment()
    if(!payment.paymentMethod)
    {
        document.location.hash = '/payment'
    }
    const itemsPrice = orderItems.reduce((a,c)=> a + c.price * c.qty, 0)
    const shippingPrice = itemsPrice > 100? 0.00 : 10.00
    const taxPrice = Math.round(0.24  * itemsPrice * 100) / 100
    const totalPrice = itemsPrice + shippingPrice + taxPrice
    return{
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    }
}

const PlaceOrderScreen = {
    after_render: async()=>
    {
        document.getElementById('placeOrderBtn').addEventListener('click', async()=>
        {
            const order = converCartToOrder()
            showLoading();
            const data = await createOrder(order);
            hideLoading();
            if(data.error)
            {
                showMessage(data.error)
            }
            else
            {
                cleanCart()
                document.location.hash = `/order/${data.order._id}`
            }
        })
        
    },
    render: ()=>
    {
        const { name } = getUserInfo()
        if (!name) {
            document.location.hash ='/'
        }
        const { orderItems,
            shipping,
            payment,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice} = converCartToOrder()
        return `
        <div>
            ${CheckoutSteps.render({step1:true, step2:true, step3:true, step4:true})} 
            <div class="orderContainer">
                <div class="orderInfo">
                    <div> 
                        <h2>Shipping</h2>
                        <div>
                        ${shipping.address},
                        ${shipping.city},
                        ${shipping.postalCode},
                        ${shipping.country}
                        </div>
                    </div>
                    <div> 
                        <h2>Payment</h2>
                        <div>
                        ${payment.paymentMethod}
                        </div>
                    </div>
                    <div>
                        <ul class="cartListContainer">
                            <li> 
                                <h2>Shopping Cart</h2>
                                <div>Price</div>
                            </li>
                            ${orderItems.map(item=>
                                {
                                    return `
                                        <li>
                                            <div class="cartImage"><img src="${item.image}" alt="${item.name}"/></div>
                                            <div class="cartItem">
                                                <div><a href="/#/product/${item.product}"> ${item.name}</a></div>
                                                <div> Qty: ${item.qty} </div>
                                            </div>
                                            <div class="cartPrice">$${item.price}</div>
                                        </li>
                                    `
                                })}
                        </ul>
                    </div>
                </div>
                <div class="orderAction">
                        <ul>
                            <li><h2>Order Summary</h2></li>    
                            <li><div>Items</div><div>$${itemsPrice}</div></li>    
                            <li><div>Shipping</div><div>$${shippingPrice}</div></li>    
                            <li><div>Tax</div><div>$${taxPrice}</div></li>    
                            <li class="total"><div>Order Total</div><div>$${totalPrice}</div></li>
                            <li><button class="primary" id="placeOrderBtn"> Complete Order</button></li>    
                        </ul>
                </div>
            </div>
        </div>      
        `
    }
}
export default PlaceOrderScreen