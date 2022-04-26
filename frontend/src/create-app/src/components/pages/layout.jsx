export const Layout = (props) => {
  const {account} = props;
  const {screen} = props;
  const {setScreen} = props;
  const {setAccount} = props;

  return <>
    <nav className="navbar text-white bg-dark mb-2">
      <div className="container-fluid row">
        <div className="col">
          <nav className="navbar justify-content-left">
            {screen == 1 && account != undefined && <button type="button" className="btn btn-md bg-primary text-white"
            onClick={() => {
              setScreen(5);
            }}>Settings</button>}
            {screen != 1 &&
            <button type="button" className="btn btn-md bg-primary text-white"
            onClick={() => {
              setScreen(1);
            }}>Back</button>}
          </nav>
        </div>
        <div className="col">
          <nav className="navbar justify-content-center">
            <h1 clas>Acres4Dayz</h1>
          </nav>
        </div>
        <div className="col">
          <nav className="navbar justify-content-end">
            {screen != 2 && account == undefined &&
            <button type="button" className="btn btn-md bg-primary text-white"
            onClick={() => {
              setScreen(2);
            }}>Login/Register</button>}
            {screen != 4 && screen != 5 && account != undefined &&
            <button type="button" className="btn btn-md bg-primary text-white"
            onClick={() => {
              setScreen(4);
            }}>Create Listing</button>}
            {screen == 5 &&
              <button type="button" className="btn btn-md bg-primary text-white"
              onClick={() => {
                setAccount(undefined)
                setScreen(1);
              }}>Logout</button>}
          </nav>
        </div>
      </div>
    </nav>
  </>;
}
