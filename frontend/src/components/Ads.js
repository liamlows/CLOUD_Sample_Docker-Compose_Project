import React, { useEffect, useState } from 'react';

import { Toast, ToastHeader, ToastBody, ToastContainer } from "react-bootstrap"


export const Ads = props => {

    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(true);

    const toggleShowA = () => {
        setShowA(!showA);
        var newCount = count +1;
        setCount(newCount);
    }
    const toggleShowB = () => {
        setShowB(!showB);
        var newCount = count +1;
        setCount(newCount);
    }

    // admin stuff
    const [count, setCount] = useState(0);


    return <>
        <ToastContainer position="middle-start">
            <Toast show={showA} onClose={toggleShowA} bg="warning">
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Ads</strong>
                    <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body>Check out our newest merch</Toast.Body>
            </Toast>
            <Toast show={showB} onClose={toggleShowB}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Bootstrap</strong>
                    <small className="text-muted">2 seconds ago</small>
                </Toast.Header>
                <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
            </Toast>
        </ToastContainer>

    
        <p>Count : {count}</p>
    </>
}