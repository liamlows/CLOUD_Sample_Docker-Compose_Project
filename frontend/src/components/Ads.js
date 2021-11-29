import React, { useEffect, useState } from 'react';

import { Toast, ToastHeader, ToastBody, ToastContainer } from "react-bootstrap"
import { Link } from 'react-router-dom';

import { SportRepository } from '../api/SportRepository';

export const Ads = props => {
    const loggedInUser = localStorage.getItem("adminLogin");

    const db = new SportRepository();
    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(true);

    const toggleShowA = () => {
        setShowA(!showA);
    }
    const toggleShowB = () => {
        setShowB(!showB);
    }


    // admin stuff
    const [count, setCount] = useState(0);

    const addCount = () => {
        setCount(count + 1);
        db.putAdCount(props.teamID, count + 1).then(
            x => {
                console.log("!", x);
            });
    }

    useEffect(() => {
        // Anything in here is fired on component mount.
        console.log("1", props.teamID);
        db.getAdCount(props.teamID).then(
            x => {
                console.log("?", x[0].adCount);
                setCount(x[0].adCount);

            });
        return () => {
            // Anything in here is fired on component unmount.
            db.putAdCount(props.teamID, count).then(
                x => {
                    console.log("?", x[0].adCount);
                    setCount(x[0].adCount);
                });
        }
    }, [])

    

    return <>
        <ToastContainer position="middle-start">
            <Toast show={showA} onClose={toggleShowA} bg="warning">
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Ads</strong>
                    <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body>
                    <a onClick={addCount} > Check out our newest merch at https://www.fanatics.com</a>

                </Toast.Body>
            </Toast>
            <Toast show={showB} onClose={toggleShowB} bg="primary">
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Ads2</strong>
                    <small className="text-muted">2 seconds ago</small>
                </Toast.Header>
                <Toast.Body>
                    <a onClick={addCount} >Join Our BIG BlackFriday Sell!!!!! </a>
                </Toast.Body>
            </Toast>
        </ToastContainer>

        <p>login? {loggedInUser}</p>
        {loggedInUser ?(
            <p>Count : {count}</p>
            )
            :(  
                <p>Admin not log in</p>
            )
            }
    </>
}