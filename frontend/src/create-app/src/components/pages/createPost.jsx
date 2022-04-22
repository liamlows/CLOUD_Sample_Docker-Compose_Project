import { useEffect, useState } from "react";
import { TextField } from "../common/textField.jsx";
import { TextAreaField } from "../common/textAreaField.jsx";

export const CreatePost = (props) => {
  const {setScreen} = props;

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');

  return <>
    <div className="pb-2 container rounded-bottom border">
      <div className="row pt-4">
        <div className="col">
          <TextField label="Name" value={title} setValue={setTitle}/>
        </div>
      </div>
      <div className="row pb-2">
        <div className="col">
          <TextAreaField label="Comment" value={description} setValue={setDescription} />
        </div>
      </div>
    </div>
  </>;
}
// {(comment == '' || rating == '' || userName == '') && <button type="button" className="btn btn-md bg-primary text-white" disabled>Submit</button>}
// {comment != '' && rating != '' && userName != '' && <button type="button" className="btn btn-md btn-primary" enabled onClick={() => {
//     onReviewAdded({userName: userName, rating: rating, comment: comment, date: new Date()});
//     setUserName('');
//     setRating('');
//     setComment('');
//   }}>Submit</button>}
