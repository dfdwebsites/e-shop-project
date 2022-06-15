import { update } from "../api.js"
import { clearUser, getUserInfo, setUserInfo } from "../localStorage.js"
import { hideLoading, showLoading, showMessage } from "../utils.js"

const ProfileScreen = {
    after_render: ()=>
    {
        document.getElementById('signoutBtn').addEventListener('click', ()=>{
            clearUser();
            document.location.hash = '/'
        })
        document.getElementById('profileForm').addEventListener('submit', async(e)=>
        {
            e.preventDefault()
            showLoading()
            // if(document.getElementById('password').value !==document.getElementById('confirmPassword').value) {
            //     showMessage('Passwords dont Match')
            //     throw new Error("Passwords not match")
            // }
            const data = await update({
                name: document.getElementById('name').value,
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
        const { name, email} = getUserInfo() 
        if (!name) {
            document.location.hash ='/'
        }
        return `
            <div class="formContainer">
                <form id="profileForm">
                    <ul>
                        <li>
                            <h1>User Profile</h1>
                        </li>
                        <li>
                            <label for="name"> Name </label>
                            <input type="name" name="name" id="name" value="${name}" />
                        </li>
                        <li>
                            <label for="email"> Email </label>
                            <input type="email" name="email" id="email"  value="${email}" />
                        </li>
                        <li>
                            <label for="password"> Password </label>
                            <input type="password" name="password" id="password"  />
                        </li>
                        <li>
                            <button type="submit" class="primary">Update</button>
                        </li>
                        <li>
                            <button type="button" class="" id="signoutBtn">Sing out</button>
                        </li>
                                        
                    </ul>
                </form>        
            </div>
        `
    }
}
export default ProfileScreen