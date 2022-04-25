import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../api/events';
import './EventPage.css';
const EventPage = () => {
    const [event, setEvent] = useState({
        title:"Go kart racing",
        time: "2:00 p.m.",
        date: "March 7",
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
            <table>
                <tr>
                    <td>
                        <div className="details">
                            <div className="intro">
                                <h1 className="eventTitle display-1">{event.title}</h1>
                                <h3>{event.description}</h3>
                            </div>
                            <div className="eventDetails">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                </svg>
                                <i className="bi bi-geo-alt-fill"> {event.farmName}</i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16">
                                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                                <i className="bi bi-calendar-event">{event.date}</i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                </svg>
                                <i className="bi bi-clock-fill"> {event.time}</i>
                                <Button variant='contained'> RSVP </Button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <img src={event.image} className="eventImage"/>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default EventPage;