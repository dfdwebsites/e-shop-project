import { getCartItems } from "./localStorage"


export const parseRequestUrl = ()=>
{
    const url = document.location.hash.toLowerCase()
    const request = url.split('/')   
    return {
    resource: request[1],
    id: request[2],
    action: request[3]
    }
}

export const reRender = async (component) =>
{
    document.getElementById('main-container').innerHTML = await component.render()
    await component.after_render()
}

export const showLoading = ()=>
{
    document.getElementById('loadingOverlay').classList.add('active')
}

export const hideLoading = ()=>
{
    document.getElementById('loadingOverlay').classList.remove('active')
}

export const showMessage = (message, callback)=>
{
    document.getElementById('messageOverlay').innerHTML = `
        <div>
            <div id="messageOverlayContent">
                ${message}
            </div>
            <button id="messageOverlayBtn">OK</button>
        </div>
    `
    document.getElementById('messageOverlay').classList.add('active')
    document.getElementById('messageOverlayBtn').addEventListener('click', ()=>
    {
        document.getElementById('messageOverlay').classList.remove('active')
        if(callback)
        {
            callback()
        }
    })
}
export const redirectUser = ()=>
{
    if(getCartItems().length !==0)
    {
        document.location.hash = '/shipping'
    }
    else{
        document.location.hash = '/'
    }
}