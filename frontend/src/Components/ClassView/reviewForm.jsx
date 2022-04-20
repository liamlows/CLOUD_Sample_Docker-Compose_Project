import React, { useState} from "react";
import { SelectField } from "../common/selectField";
import { TextField } from "../common/textField";
import { TextAreaField } from "../common/textAreaField";

//onReviewAdded
export const ReviewForm = (props) => {
    const [ userName, setUserName ] = useState('');
    const [ rating, setRating ] = useState(0);
    const [ ratingOptions] = useState([
        { "value": 1, "label": '1 stars' },
        { "value": 2, "label": '2 stars' },
        { "value": 3, "label": '3 stars' },
        { "value": 4, "label": '4 stars' },
        { "value": 5, "label": '5 stars' }
   ] );
    const [ comment, setComment] = useState('');
    console.log({ratingOptions});
    /*  useEffect(() => {
        getReviews({ review }).then(x => setReviews(x));
    }, [ review ]);*/

    return <div className='form-group border border-light rounded'>
        <div className = 'bg-secondary text-white border border-light rounded ml-10'><h4>Add Review</h4></div>
        <form>
        <div class="form-group row text-muted">
            {/**Set to do student account automatically
             * <TextField label="Your Name"
                   value={userName}
                   setValue={x => setUserName(x)} />
             * 
             */}
        
        <SelectField label="Rating"
                     value={rating}
                     setValue={x => setRating(x)}
                     options={ratingOptions}
                     optionValueKey="value"
                     optionLabelKey= "label" /> 
        
        </div>

        <div class="form-group row">
        <TextAreaField label="Comment" 
                       value={comment}
                       setValue={x => setComment(x)}
                       className = 'FormControlTextarea1 Large'/>
            <button type="button" className="btn btn-primary btn-sm"
            onClick={() => {
                props.onReviewAdded({userName, rating, comment, date: new Date().toDateString()}); //
                setUserName('');
                setRating(0);
                setComment('');
            }
            }
            >Submit</button>
            </div>
    </form></div>
};
