import * as React from 'react';
import './itemCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider, styled } from '@mui/material/styles';

export const ItemCard = ({ name, description, image, price, stock, itemId, farmId, addText, action, noDetails }) => {
    return (

        <Card variant="outlined" sx={{ backgroundColor: '#66d29a', height: "100%", maxWidth:'350px', margin:'0 auto', display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: '1px 1px 10px 1px #C0C0C0;', border: "none", borderRadius: '16px' }} >
            <img src={image} id="item-card-image" />

            <CardContent sx={{ textAlign: ["start", "start"], flexGrow: 1 }}>
                {!noDetails && <div style={{ position: 'relative' }}>
                    <div id="item-card-price">
                        <Typography variant="h5" color="text.primary" sx={{ m: .5 }}>
                            {`$${price}`}
                        </Typography>
                    </div>
                </div>}
                <Typography gutterBottom variant="h5" mt={2} component="div" width="100%">
                    {name}
                </Typography>
                <div id="item-card-description">
                    <Typography variant="h7" color="#e9f9f1">
                        {description}
                    </Typography>
                </div>
            </CardContent>
            

            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', px:'16px' }}>
                
                    {
                        !noDetails && <>
                            <CardContent sx={{ textAlign: ["start"] }}>
                                <Typography variant="h6" color="text.primary" padding={0}>
                                    {`Stock: ${stock}`}
                                </Typography>
                            </CardContent>
                        </>
                    }
                    <Button
                        variant="contained"
                        size="small"
                        color="info"
                        fullWidth={noDetails}
                        sx={{ padding: [1, 1, 1.1] }}
                        onClick={() => action({ name, description, image, itemId, stock, price, farmId })}>
                        {addText}
                    </Button>
                
            </CardActions>
        </Card>

    );
}
