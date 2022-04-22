import { useEffect, useState } from "react";
import cow from "../../temp/cow.jpg";

var tests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Main = (props) => {
  const {setScreen} = props;
  return <>
    <div className="container">
    <div class="row">
      {tests.map((test, index) =><>
        <div className="card text-center m-1" style={{ width: '18rem' }}>
          <div class="col">
            <img src={cow} alt="Logo" style={{width:'16rem'}} className="pt-2"/>
            <div className="card-body">
              <h5 className="card-title">Cow 4 sale</h5>
              <p className="card-text">MOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO</p>
              <btn className="btn btn-primary" onClick={() => {
                setScreen(3);
              }}>View</btn>
            </div>
          </div>
        </div>
      </>)}
    </div>
  </div>
  </>;
}
