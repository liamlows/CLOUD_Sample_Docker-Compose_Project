import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider, styled } from '@mui/material/styles';
import './EventCard.css';
const EventCard = ({ name, description, eventId, farmName, farmId, image }) => {
    return (
        <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
            <CardMedia alignItems="center">
                <img src={image} id="event-card-image" />
            </CardMedia>
            
            <CardContent sx={{ textAlign: ["left"], flexGrow: 1, height: "fit-content", display:"flex", flexDirection: 'column', justifyContent:"space-between" }} >
                <div>
                    <Typography gutterBottom variant="h5" component="div" align="start" >
                        {name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {description}
                    </Typography>
                </div>
                <div>
                    <Typography gutterBottom variant="h7" component="div" fontWeight="600" align="start" >
                        Location: {farmName}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div" fontWeight="600" align="start" >
                        Time: 2:00pm
                    </Typography>
                    
                </div>
            </CardContent>

            <CardActions>
                <Button variant="contained" size="small" color="primary" fullWidth sx={{ padding: [2, 2, 1] }}>
                    {"Unsubscribe"}
                </Button>
            </CardActions>
        </Card >
    );
};

export default EventCard;