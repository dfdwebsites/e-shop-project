
import CheckoutSteps from "../components/CheckoutSteps.js"
import { getUserInfo, setPayment } from "../localStorage.js"


const PaymentScreen = {
    after_render: ()=>
    {
        
        document.getElementById('paymentForm').addEventListener('submit', async(e)=>
        {
            e.preventDefault()
            const paymentMethod =  document.querySelector('input[name="paymentMethod"]:checked').value
            setPayment({paymentMethod})
            document.location.hash = '/placeorder'
        })
    },
    render: ()=>
    {
        const { name } = getUserInfo()
        if (!name) {
            document.location.hash ='/'
        }
        return `
            ${CheckoutSteps.render({step1:true, step2:true, step3:true})} 
            <div class="formContainer">
                <form id="paymentForm">
                    <ul>
                        <li>
                            <h1>Payment</h1>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="paymentMethod" id="paypal" value="paypal" checked>
                                <label for="paypal">Paypal</label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="paymentMethod" id="stripe" value="stripe">
                                <label for="stripe">Stripe</label>
                            </div>
                        </li>
                        <li>
                            <button type="submit" class="primary">Continue</button>
                        </li>

                                        
                    </ul>
                </form>        
            </div>
        `
    }
}
export default PaymentScreen