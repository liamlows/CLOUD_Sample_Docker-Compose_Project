import * as React from 'react';
import './itemCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider, styled } from '@mui/material/styles';

export const ItemCard = ({ name, description, image, price, stock, farmId, addText }) => {

      
    

    return (
    
        <Card variant="outlined" sx={{ height:"100%", display:"flex",flexDirection:"column",justifyContent:"space-between"}} >
            <Typography gutterBottom variant="h6" component="div" align="center" whiteSpace={"nowrap"} overflow="hidden" width="100%" textOverflow={"ellipsis"}>
                {name}
            </Typography>

            <CardMedia align="center" sx={{marginTop:"12px"}} >
                <img src={image} id="item-card-image" />
            </CardMedia>
            
            <CardContent sx={{textAlign:["center","left"], flexGrow:1 }}>
                    <div id="item-card-description">
                        <Typography variant="h6" color="text.secondary">
                            {description}
                        </Typography>
                    </div>
            </CardContent>

            <CardContent sx={{textAlign:["center","left"]}}>
            <div id="item-card-price">
                        <Typography variant="h3" color="text.primary" sx={{m:.5}}>
                            {`$${price}`}
                        </Typography>
                    </div>
                    <Typography variant="h6" color="text.secondary">
                        {`Stock: ${stock}`}
                    </Typography>
            </CardContent>
           
            <CardActions>
                <Button variant="contained" size="small" color="primary" fullWidth sx={{padding:[2,2,1]}}>
                    {addText}
                </Button>
            </CardActions>
        </Card>
       
    );
}
