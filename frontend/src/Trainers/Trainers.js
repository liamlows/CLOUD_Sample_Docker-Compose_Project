import React, { useEffect, useState } from 'react';
import './Trainers.css';
import axios from 'axios';

// React functional component
const Trainers = () => { 
    const [number, setNumber] = useState("")
    const [values, setValues] = useState(["one","two","three"])

    // handle input field state change
    const handleChange = (e) => {
        setNumber(e.target.value);
    }


    // tell app to fetch values from db on first load (if initialized)
    useEffect(() => {
        
    }, [])

    
        return (
            <div className="Trainers">
                <header className="Trainers-header">
                    
                        <ul>
                            {values.map((value, i) => <div className="Trainer-box" key={i}>{value} </div>)}
                        </ul>
                    
                </header>
                <div>
                </div>
            </div>
        );
}

export default Trainers;