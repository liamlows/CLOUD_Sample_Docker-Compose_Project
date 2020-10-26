import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

// React functional component
function App () {
  // state for storage of the information on the webpage of forms and list, uses hooks
  const [number, setNumber] = useState("")
  const [values, setValues] = useState([])

  // handle input field state change
  const handleChange = (e) => {
    setNumber(e.target.value);
  }

  // fetches vals of db via GET request
  const fetchVals = () => {
    axios.get('http://localhost:8000/values').then(
      res => {
        const values = res.data.data;
        console.log(values);
        setValues(values)
    });
  }

  // handle input form submission to backend via POST request
  const handleSubmit = (e) => {
    e.preventDefault();
    let prod = number * number;
    axios.post('http://localhost:8000/multplynumber', {product: prod}).then(res => {
      console.log(res);
      fetchVals();
    });
    setNumber("");
  }

  // handle intialization and setup of database table, can reinitialize to wipe db
  const reset = () => {
    axios.post('http://localhost:8000/reset').then(res => {
      console.log(res);
      fetchVals();
    });
  }

  // tell app to fetch values from db on first load (if initialized)
  useEffect(() => {
    fetchVals();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={reset}> Reset DB </button>
        <form onSubmit={handleSubmit}>
          <input type="text" value={number} onChange={handleChange}/>
          <br/>
          <input type="submit" value="Submit" />
        </form>
        <ul>
          { values.map((value, i) => <li key={i}>{value.value}</li>) }
        </ul>
      </header>
    </div>
  );
}

export default App;
