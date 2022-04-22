import { Button, Grid, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { ItemCard } from '../ItemCard/itemCard';
import Search from '../Search/Search';
import Horse from '../../images/horse.jpg';
import AddItemDialog from '../AddItemToFarmDialog/AddItemToFarmDialog';
import CreateEventDialog from '../CreateEventDialog/CreateEventDialog';
const FarmItemAdder = () => {
    const [search, setSearch] = useState();
    const [avaliableItems, setAvaliableItems] = useState([
        { name: "Horse", image: Horse, description: "Typical horse you are selling, edit this description if you want", tags: ["Livestock","Big"] },
        { name: "Pig", image: "https://i.natgeofe.com/k/6d301bfc-ff93-4f6f-9179-b1f66b19b9b3/pig-young-closeup_2x3.jpg", description: "Dirty, stinky", tags: ["Livestock"] },
        { name: "Tractor", image: "https://media.npr.org/assets/img/2015/08/17/img_0837-bd73606901bd07df1a6caae57afd64fe781c77f1-s1100-c50.jpg", description: "Dirty, stinky", tags: ["Equipment","Big"] },
        { name: "Pear", image: "https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/pears_commodity-page.png", description: "a Pear", tags: ["Fruit"] },
        { name: "Shovel", image: "https://www.humboldtmfg.com/product-originals/_lrg@1x/H-4982.png", description: "Diggin", tags: ["Equipment", "Fruit","Livestock"] },
        { name: "The Berserker Armor", image: "https://i.redd.it/rlazrv2gboc81.jpg", description: "You will most likely go Berserk", tags: ["Equipment"] },
        { name: "The Dragon Slayer", image: "https://sep.yimg.com/ay/yhst-31644440917560/berserk-guts-dragon-slayer-sword-black-blade-1.gif", description: "Too Big, Too ROugh, not much of a sword at all, more like a giant chunk of iron", tags: ["Equipment", "Big"] },
    ]);
    const [itemsFound, setItemsFound] = useState ([]);

    const [openAddForm, setOpenAddForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [createEvent, setCreateEvent] = useState(false);

    useEffect(() => {
        if(search)
        {
            let filteredItems = [...avaliableItems]
            if(search.itemName) {
                filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(search.itemName.toLowerCase()));
            }
            for(let i = 0; i < search.filters.length; i++){
                filteredItems = filteredItems.filter(item => item.tags.includes(search.filters[i]));
            }
            setItemsFound(filteredItems);
        } else {
            setItemsFound(avaliableItems);
        }
    },[search])
    const handleClickOpenAddForm = () => {
        setOpenAddForm(true);
    };

    const handleClose = () => {
        setOpenAddForm(false);
    };
    const addToFarm = (item) => {
        setSelectedItem(item);
        setOpenAddForm(true);
    }
    return (
        <div>
            
            <Search searchObject={search} setSearchObject={setSearch} justItem={true} hideSearch={true} header={'Search avaliable items'}></Search>
            <Typography variant='h5' textAlign={'center'} mt={2}>Add items to your farm</Typography>
            <Grid container
                spacing={1}
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
                my={4}
            >
                {
                    itemsFound.map((item) => {
                        return <Grid key={item.name}item xs={12} sm={6} md={3} lg={2}>
                            <ItemCard name={item.name}
                                image={item.image}
                                description={item.description}
                                addText={"Add to farm"}
                                noDetails={true}
                                action={(item) => addToFarm(item)} />
                        </Grid>
                    })
                }
            </Grid>
            
            { openAddForm && <AddItemDialog open={openAddForm}
                            setOpen={setOpenAddForm} 
                            itemName={selectedItem.name} 
                            itemDescription={selectedItem.description}
                            image={selectedItem.image}/>
            }
            <Button onClick={()=>setCreateEvent(true)}>Create Event</Button>
            {createEvent && <CreateEventDialog open={createEvent} setOpen={setCreateEvent}></CreateEventDialog>}
        </div>
    );
};

export default FarmItemAdder;