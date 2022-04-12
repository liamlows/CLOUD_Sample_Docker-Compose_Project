import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider, styled } from '@mui/material/styles';

const EventCard = ({name, description, eventId, farmName, farmId, image}) => {
    return (
        <Card variant="outlined" sx={{ height:"100%", display:"flex",flexDirection:"column",justifyContent:"space-between"}} >
            <Typography gutterBottom variant="h6" component="div" align="center" flexGrow={2}>
                {name}
            </Typography>

            <CardMedia align="center" sx={{marginTop:"12px"}}>
                <img src={image} id="event-card-image" />
            </CardMedia>
            
            <CardContent sx={{textAlign:["center","left"]}}>
                    <div id="event-card-description">
                        <Typography variant="h6" color="text.secondary">
                            {description}
                        </Typography>
                    </div>
            </CardContent>
            
            <CardActions>
                <Button variant="contained" size="small" color="primary" fullWidth sx={{padding:[2,2,1]}}>
                    {"Unsubscribe"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default EventCard;