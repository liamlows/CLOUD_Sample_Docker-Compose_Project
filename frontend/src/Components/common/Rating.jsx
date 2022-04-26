import './Rating.css';

export const Rating = (value) => {
    return <span className='stars'>
        {
            [1, 2, 3, 4, 5].map(x => (<i key={x} className={(x >+value.value ? 'empty-star' : 'full-star')}></i>))
        }
    </span>
}