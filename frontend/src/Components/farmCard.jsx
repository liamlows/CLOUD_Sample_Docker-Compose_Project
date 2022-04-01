import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ItemCard } from './itemCard';

export const FarmCard = ({ farm }) => {

    return (
        
        <Grid container>
            <Link to={`/farm/${farm.farmId}`} > 
                <Typography>View farm</Typography>
             </Link>
            <Grid container spacing={2}>
                {
                    farm.items.map((item, index) => {
                        return <Grid item xs={8} sm={4} lg={2} key={index}>
                            <ItemCard name={item.name}
                                description={item.description}
                                image={item.image}
                                price={item.price}
                                stock={item.stock}
                                addText={"Add to cart"} />
                        </Grid>
                    })
                }

            </Grid>
        </Grid>
    )
}