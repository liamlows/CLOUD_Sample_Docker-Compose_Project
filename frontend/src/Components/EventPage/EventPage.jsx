import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../api/events';
import './EventPage.css';
const EventPage = () => {
    const [event, setEvent] = useState({
        title:"Go kart racing",
        description: "We be out here for realLorem ipsum dolor sit amio iusto. Atque, explicabo adipisci. Dolorem, libero",
        image:"https://i.cbc.ca/1.6165805.1630877196!/fileImage/httpImage/lawn-tractor-races.jpg",
        farmName:"Yellow Bridge Farm",
        usersGoing:["billy boy","Bobby Billy","Old yeller", "Tractor drifter 32"]
    });
    const params = useParams();

    useEffect(()=>{
        //setEvent(getEventById(params.id));
        console.log(params.id);
    },[])
    return (
        <div id='event-page'>   
            <Typography variant='h1'>{event.title}</Typography>
            
            <img id="event-page-image" src={event.image}/>
            <Typography variant='h6' textAlign={"start"} >{event.description}</Typography>
            <Typography variant='h4'>{event.farmName}</Typography>
            <Typography variant='h4'>{"2:00pm"}</Typography>
            <Button variant='contained'> RSVP </Button>
        </div>
    );
};

export default EventPage;