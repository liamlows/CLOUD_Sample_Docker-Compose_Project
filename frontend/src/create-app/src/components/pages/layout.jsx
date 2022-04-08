import {getAccount, getScreen} from '../app.jsx';

export const Layout = ({ logged }) => {
  return <>
    <nav className="navbar text-white bg-dark mb-2">
      <div className="container-fluid row">
        <div className="col">
          <nav className="navbar justify-content-left">
            {getScreen != 1 &&
            <button type="button" className="btn btn-md bg-primary text-white">Back</button>}
          </nav>
        </div>
        <div className="col">
          <nav className="navbar justify-content-center">
            <h1>Acres4Dayz</h1>
          </nav>
        </div>
        <div className="col">
          <nav className="navbar justify-content-end">
            {getScreen != 2 && getAccount == [] &&
            <button type="button" className="btn btn-md bg-primary text-white">Submit</button>}
          </nav>
        </div>
      </div>
    </nav>
  </>;
}
