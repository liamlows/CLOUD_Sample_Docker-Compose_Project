export const Layout = (props) => {
  const {account} = props;
  const {screen} = props;
  const {setScreen} = props;

  return <>
    <nav className="navbar text-white bg-dark mb-2">
      <div className="container-fluid row">
        <div className="col">
          <nav className="navbar justify-content-left">
            {screen != 1 &&
            <button type="button" className="btn btn-md bg-primary text-white"
            onClick={() => {
              setScreen(1);
            }}>Back</button>}
          </nav>
        </div>
        <div className="col">
          <nav className="navbar justify-content-center">
            <h1>Acres4Dayz</h1>
          </nav>
        </div>
        <div className="col">
          <nav className="navbar justify-content-end">
            {screen != 2 && account == undefined &&
            <button type="button" className="btn btn-md bg-primary text-white"
            onClick={() => {
              setScreen(2);
            }}>Login/Register</button>}
          </nav>
        </div>
      </div>
    </nav>
  </>;
}
