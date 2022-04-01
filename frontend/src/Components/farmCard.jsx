import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ItemCard } from './ItemCard/itemCard';

export const FarmCard = ({ farm }) => {

    return (
        
        <Grid container
                >
            <Link to={`/farm/${farm.FarmId}`} > 
                <Typography>View farm</Typography>
             </Link>
            <Grid container 
                spacing={0}
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
                >
                {
                    farm.items.map((item, index) => {
                        return index < 6 ? <Grid item xs={4} sm={3} md={3} lg={2} key={index}>
                            <ItemCard name={item.name}
                                description={item.description}
                                image={item.image}
                                price={item.price}
                                stock={item.stock}
                                addText={"Add to cart"} />
                        </Grid> : null
                    })
                }

            </Grid>
        </Grid>
    )
}