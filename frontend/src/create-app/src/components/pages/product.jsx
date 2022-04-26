import { useEffect, useState } from "react";
import cow from  "../../temp/cow.jpg";

export const Product = () => {

  var reviews = [];
  var name="COW";
  var price=500;
  var description="MOOOOOO";

  return <>
    <div className="container-xxl pb-1">
    <div className="container-fluid">
      <div className="row justify-content-sm-left">
        <div className="col-auto">
          <img src={cow}/>
        </div>
        <div className="col d-flex align-items-center">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <h1> { name } </h1>
                <div className="badge bg-primary text-wrap fs-5 mb-3">
                  ${ price }
                </div>
                <p> { description } </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h5>Product Reviews<span className="text-secondary"> ({reviews.length})</span></h5>
    </div>
  </>;
};
// <ReviewList reviews={reviews}/>
// <ReviewForm onReviewAdded={newReview}/>
