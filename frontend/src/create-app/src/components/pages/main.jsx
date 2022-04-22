import { useEffect, useState } from "react";
import cow from "../../temp/cow.jpg"

export const Main = (props) => {
  const {setScreen} = props;
  return <>
    <div className="card" style={{ width: '18rem' }}>
      <img src={cow} alt="Logo" />;
      <div className="card-body">
        <h5 className="card-title">Cow 4 sale</h5>
        <p className="card-text">MOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO</p>
      </div>
    </div>
  </>;
}
