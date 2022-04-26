import { Rating } from "../common/rating"
import { ReviewForm } from "./ReviewForm"

export const ReviewList = (reviews) => {
    return <div>
        <div className="mt-3 fs-3">
            Product Reviews <span className="text-secondary">({reviews.reviews.length})</span>
        </div>

        {reviews.reviews.length === 0 && <div className="rounded list-group"><p className="list-group-item border-0 bg-light mb-3">Be the first to add a review!</p></div>}

        {reviews.reviews.length !== 0 && <div className="mb-3">


            {reviews.reviews.map((review, index) =>
                <div className="mb-3" key={index}>
                    <div className="border rounded list-group">
                        <div className="list-group-item border-bot bg-light">
                            <Rating value={review.rating} />
                        </div>
                        <div className="list-group-item bg-light  pt-3 pb-3">
                            <p className="float-end text-secondary m-2">{review.date}</p>
                            <div className="float-start"></div>
                            <p className="text-secondary m-2">{review.userName}</p>
                            <p className="m-2">"{review.comment}"</p>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>)}
        </div>
        }


        <ReviewForm />
    </div >
}
