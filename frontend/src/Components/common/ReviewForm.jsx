import { useState } from "react";
import { Rating, SelectField, TextAreaField, TextField } from "../common";


export const ReviewForm = (onReviewAdded) => {

    const [userName, setUserName] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [ratingOption] = useState([
        { value: 1, label: "1 star" },
        { value: 2, label: "2 stars" },
        { value: 3, label: "3 stars" },
        { value: 4, label: "4 stars" },
        { value: 5, label: "5 stars" }
    ]);

    return <div className="border rounded list-group">
        <h2 className="p-3 text-white bg-secondary list-group-item fs-4 m-0">Add Review</h2>

        <div className="p-3 col-12 list-group-item bg-light">
            <div className="col-7 m-1 float-start">
                <TextField value={userName} setValue={x => setUserName(x)} label="Your Name" />
            </div>
            <div className="col-2 m-4 float-end">
                <Rating value={rating} />
            </div>
            <div className="col-1 float-end">
                <SelectField value={rating} setValue={x => setRating(x)} label="Rating" options={ratingOption} optionValueKey="value" optionLabelKey="label" />
            </div>
            <div className="clearfix"></div>

            <div className="m-1">
                <TextAreaField value={comment} setValue={x => setComment(x)} label="Comment" />
                <button className="btn btn-primary rounded border-0  col-1" onClick={() => {
                    onReviewAdded.onReviewAdded({
                        userName, rating, comment, date: new Date().toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        })
                    });
                    setUserName('');
                    setRating(0);
                    setComment('');
                }}>
                    Submit
                </button>
            </div>
        </div>
    </div>

}