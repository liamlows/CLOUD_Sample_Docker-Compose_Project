import React,{ useState, useEffect } from 'react';
export const ReviewList = (props) =>{
    console.log(props.reviews);

    if(props.reviews.length === 0){
        return <h5>Be the first to add a review!</h5>
    }

    return <div className='container'>
        <h4>Course Reviews <span>({props.reviews.length})</span></h4>
        <div className="mt--4 mb--2">
        {
            props.reviews.map((review, index) =>
            <div key = {index}> {review.name}
                <div>{review.rating}</div>
                <div>
                    <span>{review.date}</span>
                    <p>{review.userName}</p> 
                    <p>"{review.comment}"</p>
                </div>
                
            </div>
            )}
    </div></div>
}
