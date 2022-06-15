import  { hideLoading, parseRequestUrl, showLoading }  from './utils.js'
import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import Error404Screen from './screens/Error404Screen.js'
import CartScreen from './screens/CartScreen.js'
import SigninScreen from './screens/SigninScreen.js'
import Header from './components/Header.js'
import RegisterScreen from './screens/RegisterScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'

const routes = 
{
    '/' : HomeScreen,
    '/product/:id' : ProductScreen,
    '/cart/:id' : CartScreen,
    '/cart' : CartScreen,
    '/signin' : SigninScreen,
    '/register' : RegisterScreen,
    '/profile' : ProfileScreen
}

const router = async()=>
{   
    showLoading()
    const request = parseRequestUrl()
    const parseUrl =
    (request.resource ? `/${request.resource}` : '/' ) +
    (request.id? '/:id' : '') +
    (request.verb? `/${request.verb}`: '')

    const screen = routes[parseUrl]? routes[parseUrl]: Error404Screen
    const header = document.getElementById('headerContainer')
    header.innerHTML = Header.render()
    await Header.after_render()
    const main = document.getElementById('main-container') 
    main.innerHTML = await screen.render()
    if(screen.after_render)
    await screen.after_render()
    hideLoading()
}

window.addEventListener('load', router)
window.addEventListener('hashchange', router)


