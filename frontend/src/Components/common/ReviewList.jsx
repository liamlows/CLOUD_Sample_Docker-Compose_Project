import { useState } from "react";
import { useEffect } from "react"
import { getCourseReviews, getProfessorReviews, postCourseReview, postProfessorReview } from "../../APIFolder/loginApi";
import { useParams } from "react-router-dom";

import { Rating } from "./Rating"
import { ReviewForm } from "./ReviewForm"

export const ReviewList = ({ type, account_id }) => {

    const [reviews, setReviews] = useState(undefined);
    const params = useParams();
    useEffect(() => {
        if (reviews === undefined) {

            console.log("RENDERING", params.course_id)
            if (type === "Course") {
                console.log("search_id", params.course_id)

                getCourseReviews(params.course_id).then(res => {
                    console.log(res)
                    setReviews(res)
                }).catch(() => {
                    setReviews([])
                })
            }
            else if (type === "Professor") {
                console.log("search_id", params.account_id)

                getProfessorReviews(params.account_id).then(res => {
                    console.log(res)
                    setReviews(res)
                }).catch(() => {
                    setReviews([])
                })
            }
        }

    }, [reviews]);


    const find = (id) => {
        for (const i in reviews) {
            if (reviews[i].poster_id === account_id) {
                return true
            }
        }
        return false
    }

    const readyToDisplay = () => {
        if (reviews === undefined) {
            return false
        }
        else {
            return true;
        }
    }
    const addReview = (review) => {
        let reviews2 = [...reviews]
        reviews2.push(review)
        console.log("reviews2", reviews2)
        setReviews([...reviews2])
        if (type === "Course") {
            review = {...review, course_id: Number(params.course_id)}
            console.log("review to post",review)
            postCourseReview(params.course_id,review)
        }
        else if (type === "Professor") {
            review = {...review, account_id: Number(params.account_id)}
            postProfessorReview(params.account_id,review)
        }
    }

    if (readyToDisplay()) {
        return <div className="m-5">
            <div className="mt-3 fs-3">
                {type} Reviews <span className="text-secondary">({reviews.length})</span>
            </div>

            {reviews.length === 0 && <div className="rounded list-group"><p className="list-group-item border-0 bg-light mb-3">Be the first to add a review!</p></div>}

            {reviews.length !== 0 && <div className="mb-3">


                {reviews.map((review, index) =>
                    <div className="mb-3" key={index}>
                        <div className="border rounded list-group">
                            <div className="list-group-item border-bot bg-light">
                                <Rating value={review.rating} />
                            </div>
                            <div className="list-group-item bg-light  pt-3 pb-3">
                                <div className="float-start"></div>
                                <p className="m-2">"{review.review}"</p>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>)}
            </div>
            }


            {!find(account_id) &&
                <ReviewForm addReview={review => addReview(review)} account_id={account_id} />
            }
        </div >
    }
    else {
        return <>Loading Reviews...</>
    }
}
