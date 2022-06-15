const Rating =
{
    render: (props)=>
    {
        if(!props.value)
        {
            return `<div> no reviews</div>`
        }
        return `
        <div class="rating">
            <span>
                <i class="${props.value >= 1? 'ri-star-fill' : props.value >= 0.5? 'ri-star-half-fill' : 'ri-star-line'}"></i>
            </span>
            <span>
                <i class="${props.value >= 2? 'ri-star-fill' : props.value >= 1.5? 'ri-star-half-fill' : 'ri-star-line'}"></i>
            </span>
            <span>
                <i class="${props.value >= 3? 'ri-star-fill' : props.value >= 2.5? 'ri-star-half-fill' : 'ri-star-line'}"></i>
            </span>
            <span>
                <i class="${props.value >= 4? 'ri-star-fill' : props.value >= 3.5? 'ri-star-half-fill' : 'ri-star-line'}"></i>
            </span>
            <span>
                <i class="${props.value >= 5? 'ri-star-fill' : props.value >= 4.5? 'ri-star-half-fill' : 'ri-star-line'}"></i>
            </span>
            <span>
                ${props.text || ''}
            </span>
        
        </div>
        `
    }
}
export default Rating

