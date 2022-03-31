import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

// React functional component
function App () {
  // state for storage of the information on the webpage of forms and list, uses hooks
  const [name, setName] = useState("NFT name")
  const [nft_url, setURL] = useState("website.com")

  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  // handle input field state change
  const handleChange = (e) => {
    setName(e.target.value);
  }

  const fetchBase = () => {
    axios.get(`http://${url}:8000/`).then((res)=>{
      alert(res.data);
    })
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    axios.post(`http://${url}:8000/uploadnft`, {name}).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    });;
    setName("");
  }


  // tell app to fetch values from db on first load (if initialized)
  // the comment below silences an error that doesn't matter.=
  useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          Enter your NFT's name: 
          <br/>
          <input type="text" value={name} onChange={setName}/>
          <br/>
          Enter your NFT's URL: 
          <br/>
          <input type="text" value={nft_url} onChange={setURL}/>
          <br/>
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {/* { values.map((value, i) => <li key={i}>{value.value}</li>) } */}
        </ul>
      </header>
    </div>
  );
}

export default App;
