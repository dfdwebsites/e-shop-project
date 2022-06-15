import { getUserInfo } from "../localStorage.js"

const Header = {
    render: () =>{
        const { name } = getUserInfo()
        
        return `
        <div class="logo">
            <a href="/#/"> BrandName</a>
        </div>
        <nav>
            <ul>
                <li>
                    ${name? `<a href="/#/profile">${name}</a>`:`<a href="/#/signin">Sign in</a>`}
                </li>
                <li>
                    <a href="/#/products">Products</a>
                </li>
                <li>
                    <a href="/#/cart">Cart</a>
                </li>
            </ul>
        </nav>
        `
    },
    after_render: ()=> {
       
    }
}
export default Header