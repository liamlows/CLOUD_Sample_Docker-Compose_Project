import { Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AddItemToCartDialog from '../AddItemToCartDialog/AddItemToCartDialog';
import { ItemCard } from '../ItemCard/itemCard';

import './farmCard.css'
export const FarmCard = ({ farm, itemsPerFarm }) => {
    const [showAddItemDialog, setShowAddItemDialog] = useState();
    const [addItemDetails, setAddItemDetails] = useState();


    const handleSetItem = (item) => {
        setShowAddItemDialog(true);
        setAddItemDetails(item)
    }
    return (
        <>
            <Grid container
                  justifyContent={["center", "space-between"]}
                  spacing={2}>
                <Grid item xs={12} sm={12} md={6} justifyContent={"flex-end"}>
                    <img src={farm.farmImage} id="farm-img" alt={farm.farmName} />
                </Grid>
                <Grid item sm={12} md={6} sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <div className="text-center fs-2 fw-bold mb-3 text-decoration-underline" >{farm.farmName}</div>
                    <Typography component={'span'}>
                        <div className="farm-description text-muted">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Obcaecati culpa aliquid expedita,
                            repudiandae suscipit omnis ratione recusandae
                            dicta laudantium atque dolores laboriosam ipsa delectus fugiat. Obcaecati ex similique dolores adipisci?
                            {farm.farmDescription}
                        </div>
                    </Typography>
                </Grid>


            </Grid>
            <Grid container textAlign={"center"}>

                <Typography fontWeight={"bold"} mt={4} mb={2} textAlign={"center"}>
                    Items for sale
                </Typography>
                <Grid container
                    spacing={1}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    mb={4}
                >
                    {
                        farm.items.map((item, index) => {
                            return index < itemsPerFarm ?
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index} padding={0}>
                                    <ItemCard {...item}
                                        addText={"Add to cart"}
                                        action={item => handleSetItem(item)} />
                                </Grid> : null
                        })
                    }
                </Grid>
            </Grid>
            {showAddItemDialog && <AddItemToCartDialog
                open={showAddItemDialog}
                setOpen={setShowAddItemDialog}
                {...addItemDetails} />}

        </>
    )
}