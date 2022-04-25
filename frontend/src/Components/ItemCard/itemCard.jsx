import * as React from 'react';
import './itemCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider, styled } from '@mui/material/styles';

export const ItemCard = ({ product_name, product_description, product_image_url, product_price, product_stock, product_id, farmer_id, addText, action, noDetails }) => {
    return (

        <Card variant="outlined" sx={{ backgroundColor: '#66d29a', height: "100%", minHeight:'420px', maxWidth:'350px', margin:'0 auto', display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: '1px 1px 10px 1px #C0C0C0;', border: "none", borderRadius: '16px' }} >
            <img src={product_image_url} id="item-card-image" />

            <CardContent sx={{ textAlign: ["start", "start"], flexGrow: 1 }}>
                {!noDetails && <div style={{ position: 'relative' }}>
                    <div id="item-card-price">
                        <Typography variant="h5" color="text.primary" sx={{ m: .5 }}>
                            {`$${product_price}`}
                        </Typography>
                    </div>
                </div>}
                <Typography gutterBottom variant="h5" mt={2} component="div" width="100%">
                    {product_name}
                </Typography>
                <div id="item-card-description">
                    <Typography variant="h7" color="#e9f9f1">
                        {product_description}
                    </Typography>
                </div>
            </CardContent>
            

            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', px:'16px' }}>
                
                    {
                        !noDetails && <>
                            <CardContent sx={{ textAlign: ["start"] }}>
                                <Typography variant="h6" color="text.primary" padding={0}>
                                    {`Stock: ${product_stock}`}
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
                        onClick={() => action({ product_name, product_description, product_image_url, product_id, product_stock, product_price, farmer_id })}>
                        {addText}
                    </Button>
                
            </CardActions>
        </Card>

    );
}
