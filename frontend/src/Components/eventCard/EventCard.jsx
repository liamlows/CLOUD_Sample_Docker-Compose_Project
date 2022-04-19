import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider, styled } from '@mui/material/styles';
import './EventCard.css';
import { Link } from 'react-router-dom';
const EventCard = ({ name, description, eventId, farmName, farmId, image, time, date, hideButton }) => {

    const fDate = new Date(date + " " + time);
    console.log(fDate);
    return (
        <Card variant="outlined" sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "2px 2px 7px #888" }} >
            <CardMedia alignItems="center">
                <Link to={`/event/${eventId}`}><img src={image} id="event-card-image" /></Link>
            </CardMedia>

            <CardContent sx={{ textAlign: ["left"], width: "100%", flexGrow: 1, height: "fit-content", display: "flex", flexDirection: 'column', justifyContent: "space-between" }} >
                <div style={{ width: "100%" }}>
                    <Typography gutterBottom variant="h5" component="div" align="start" >
                        {name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary"><div id="event-card-description">
                        {description}</div>
                    </Typography>
                </div>
                <div>
                    <Typography gutterBottom variant="h7" component="div" fontWeight="600" align="start" >
                        Location: {farmName}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div" fontWeight="600" align="start" >
                        Date: {fDate.toLocaleString('en-US',{
                            year: 'numeric',
                            month: 'numeric',
                            day:'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        })}
                    </Typography>

                </div>
            </CardContent>

            <CardActions>
                {!hideButton && <Button variant="contained" size="small" color="primary" fullWidth sx={{ padding: [2, 2, 1] }}>
                    {"Unsubscribe"}
                </Button>}
            </CardActions>
        </Card >
    );
};

export default EventCard;