import * as React from 'react';
import './itemCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider, styled } from '@mui/material/styles';

export const ItemCard = ({ name, description, image, price, stock, farmId, addText }) => {

      
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    theme.typography.h4 = {
        marginBottom:".5rem",
        '@media (max-width:600px)': {
            display: 'none',
        },
        
    };

    return (
    
        <Card variant="outlined" sx={{maxWidth:[150,150,'100%'], height:"100%", display:"flex",flexDirection:"column",justifyContent:"space-between"}} >
            <Typography gutterBottom variant="h5" component="div" align="center" sx={{height:"5rem"}}>
                {name}
            </Typography>

            <CardMedia align="center">
                <img src={image} id="item-card-image" />
            </CardMedia>
            <ThemeProvider theme={theme}>
            <CardContent sx={{textAlign:["center","left"]}}>
                    <div id="item-card-description">
                        <Typography variant="h6" color="text.secondary">
                            {description}
                        </Typography>
                    </div>
                    <div id="item-card-price">
                        <Typography variant="h3" color="text.secondary" sx={{m:1}}>
                            {`$${price}`}
                        </Typography>
                    </div>
                    <Typography variant="h6" color="text.secondary">
                        {`Stock:${stock}`}
                    </Typography>
                
            </CardContent>
            </ThemeProvider>
            <CardActions>
                <Button variant="contained" size="small" color="primary" fullWidth sx={{padding:[2,2,1]}}>
                    {addText}
                </Button>
            </CardActions>
        </Card>
       
    );
}
