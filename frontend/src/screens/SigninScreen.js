import { signIn } from "../api.js"
import { getUserInfo, setUserInfo } from "../localStorage.js"
import { hideLoading, showLoading, showMessage } from "../utils.js"

const SigninScreen = {
    after_render: ()=>
    {
        document.getElementById('signinForm').addEventListener('submit', async(e)=>
        {
            e.preventDefault()
            showLoading()
            const data = await signIn({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            })
            hideLoading()
            if(data.error)
            {
                showMessage(data.error)
            }
            else
            {
                setUserInfo(data)
                document.location.hash = '/'
            }
        })
    },
    render: ()=>
    {
        if (getUserInfo().name) {
            document.location.hash ='/'
        }
        return `
            <div class="formContainer">
                <form id="signinForm">
                    <ul>
                        <li>
                            <h1>Sign In</h1>
                        </li>
                        <li>
                            <label for="email"> Email </label>
                            <input type="email" name="email" id="email" required />
                        </li>
                        <li>
                            <label for="password"> Password </label>
                            <input type="password" name="password" id="password" required />
                        </li>
                        <li>
                            <button type="submit" class="primary">Sign-In</button>
                        </li>
                        <div>
                        New User?
                        <a href="/#/register"> Create your Account</a>
                        </div>                   
                    </ul>
                </form>        
            </div>
        `
    }
}
export default SigninScreen