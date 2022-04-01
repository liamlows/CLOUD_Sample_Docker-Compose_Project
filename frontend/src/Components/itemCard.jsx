import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

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
        <Card sx={{ maxWidth: 345 }} >
            <Typography gutterBottom variant="h5" component="div" align="center">
                {name}
            </Typography>

            <CardMedia align="center">
                <img src={image} height={150}/>
            </CardMedia>
            <CardContent>

                <ThemeProvider theme={theme}>
                    <div style={{height:"5rem",textOverflow: "ellipsis", width:'100%'}}>
                        <Typography nowrap variant="h4" color="text.secondary">
                            {description}
                        </Typography>
                    </div>
                    <Typography variant="h3" color="text.secondary" sx={{m:1}}>
                        {`$${price}`}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {`Stock:${stock}`}
                    </Typography>
                </ThemeProvider>
            </CardContent>

            <CardActions>
                <Button variant="contained" size="small" color="primary" fullWidth>
                    {addText}
                </Button>
            </CardActions>
        </Card>
    );
}
