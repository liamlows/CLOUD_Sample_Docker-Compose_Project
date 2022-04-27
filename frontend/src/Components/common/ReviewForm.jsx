import { useState } from "react";
import { SelectField, TextField } from ".";
import { Rating } from "./Rating";
import { TextAreaField } from "./TextAreaField";


export const ReviewForm = (props) => {

    const [userName, setUserName] = useState('');
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [ratingOption] = useState([
        { value: 1, label: "1 star" },
        { value: 2, label: "2 stars" },
        { value: 3, label: "3 stars" },
        { value: 4, label: "4 stars" },
        { value: 5, label: "5 stars" }
    ]);

    const addReview = () => {
        props.addReview({
            rating: rating, message: message, sender_id: props.account_id
        });

        setRating(0);
        setMessage('');
    }

    const clear = () => {

        setRating(0);
        setMessage('');
    }

    return <div className="border rounded list-group">
        <h2 className="p-3 text-white bg-secondary list-group-item fs-4 m-0">Add Review</h2>

        <div className="p-3 col-12 list-group-item bg-light">
            <div className="row">
            <div className="col-7 m-4 mt-1 mb-1">
                <TextAreaField value={message} setValue={x => setMessage(x)} label="Message" />
            </div>
            <div className="col-1"></div>
            <div className="col-1">
                <SelectField value={rating} setValue={x => setRating(x)} label="Rating" options={ratingOption} optionValueKey="value" optionLabelKey="label" />
            </div>
            <div className="col-2 m-4">

                <Rating value={rating} />
            </div>
            </div>


            <button className="btn btn-secondary rounded border-0  col-1 ml-2" onClick={() => {
                clear()
            }}>Cancel</button>
            <button className="btn btn-success rounded border-0  col-1" onClick={() => {
                addReview()
            }}>
                Submit
            </button>
        </div>
    </div >

}