import { ItemCard } from '../ItemCard/itemCard';
import banana from '../../images/Banana.jpg';
import solar from '../../images/solar.jpg';
import horse from '../../images/horse.jpg';
import FarmImg from '../../images/farm.jpg';
import FarmImg2 from '../../images/farm2.jpg';
import { useEffect, useState } from 'react';
import { item } from '../../models/item';
import { Box, Button, Checkbox, Container, Grid, MenuItem, Stack, TextField, ToggleButton, Typography } from '@mui/material';
import { FarmCard } from '../FarmCard/farmCard';
import './Feed.css'
export const Feed = () => {
    const [loadedFarms, setLoadedFarms] = useState([
        {
            farmId: 1,
            farmName: "Outback steak house",
            farmImage: FarmImg,
            farmDescription: "great farm with great produce",
            items: [new item("bananssssa", "i am banana", banana, 20, 2, 1),
            new item("banana d d d dd d dddddddddd ddd d", "This is a sentence that makes sense and isnt' just some nonsense spewed out onto the screen", banana, 20, 2, 1),
            new item("pearssssss", "i am epar", banana, 20, 2, 22),
            new item("great horse", "6'5 rows for uc davis", horse, 200, 1, 1,["livestock"]),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            ]


        },
        {
            FarmId: 2,
            farmName: "Greenville Farm",
            farmImage: FarmImg2,
            farmDescription: "great farm with great produce",
            items: [new item("bananssssa", "i am banana", banana, 20, 2, 1),
            new item("banana d d d dd d dddddddddd ddd d", "This is a sentence that makes sense and isnt' just some nonsense spewed out onto the screen", banana, 20, 2, 1),
            new item("pearssssss", "i am epar", banana, 20, 2, 22),
            new item("great horse", "6'5 rows for uc davis", horse, 200, 1, 1,["livestock"]),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            ]


        }
    ])
    const priceSearchOptions = [
        { priceOption: 0, label: "Any", minPrice: 0, maxPrice: 100000 },
        { priceOption: 1, label: "Under $10", minPrice: 0, maxPrice: 10 },
        { priceOption: 2, label: "$10 - $25", minPrice: 10, maxPrice: 25 },
        { priceOption: 3, label: "$25 - $50", minPrice: 25, maxPrice: 50 },
        { priceOption: 4, label: "$50 - $100", minPrice: 50, maxPrice: 100 },
        { priceOption: 5, label: "$100+", minPrice: 100, maxPrice: 100000 },
    ]
    const filterOptions = [
        { objectName: "isVegetable", label: "Vegetable" },
        { objectName: "isLivestock", label: "Livestock" },
        { objectName: "isEquipment", label: "Equipment" },
        { objectName: "isFruit", label: "Fruit" },
    ]
    const [searchParams, setSearchParams] = useState({
        priceOption: 0,
        minPrice: 0,
        maxPrice: 100000,
        farmName: '',
        itemName: '',
        isVegetable: false,
        isLivestock: false,
        isEquipment: false,
        isFruit: false

    });

    const handleSearchChange = (delta) => {
        setSearchParams({ ...searchParams, ...delta })
        console.log(searchParams)
    }
    const handlePriceSearchChange = (priceChoice) => {
        handleSearchChange(priceSearchOptions[priceChoice]);
    }
    const search = () =>{
        console.log(searchParams);
    }
    useEffect(() => {
        //TODO get the first ten farm items
    }, [])
    return (
        <div id="feed">
            <div className="feed-search-container">
                <p className='fs-4'>Search</p>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={5} sm={4} md={11}>
                        <TextField
                            id='outlined-basc'
                            label='Farm name'
                            variant='filled'
                            value={searchParams.farmName}
                            onChange={(e) => handleSearchChange({ farmName: e.target.value })} />
                    </Grid>
                    <Grid item xs={5} sm={4} md={11}>
                        <TextField
                        id='outlined-basc'
                        label='Item name'
                        variant='filled'
                        value={searchParams.itemName}
                        
                        onChange={(e) => handleSearchChange({ itemName: e.target.value })} />
                    </Grid>
                    <Grid item xs={6} sm={2} md={11}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Price"
                            value={searchParams.priceOption ? searchParams.priceOption : 0}
                            onChange={(e) => handlePriceSearchChange(e.target.value)}>
                            {priceSearchOptions.map((option) => (
                                <MenuItem key={option.priceOption} value={option.priceOption}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Typography mt={2} mb={1}>
                    Filters
                </Typography>
                <Box sx={{ flexDirection: 'row', maxWidth:["100%","100%"], alignItems:"stretch"}}>
                    {
                        filterOptions.map((option, index) => {
                            return <ToggleButton sx={{ ml: [1,1,0], mr:[1,1,0], mb:[1,1,2], paddingLeft:1,justifyContent:"left", width:["fit-content","fit-content","100%"]}}
                                    key={option.objectName}
                                    color="primary"
                                    value={searchParams[option.objectName]}
                                    selected={searchParams[option.objectName]}
                                    onChange={() => {
                                        handleSearchChange({ [option.objectName]: !searchParams[option.objectName] });
                                    }}
                                >
                                    <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: [14,16,20] }, padding: 0 }} checked={searchParams[option.objectName] } color="success" />
                                    <Typography sx={{ fontSize:[12,12,12,16], fontWeight:"600", ml:1}}>{option.label}</Typography>
                                </ToggleButton>
                                
                            
                        })
                    }
                </Box>
                <Button fullWidth variant="contained" sx={{mt:2,mb:2}} onClick={()=>search()}>Search</Button>



            </div>
            <div className="farm-page-farms pt-4">
                {
                    loadedFarms.map((farm, index) => {
                        return <FarmCard key={farm.FarmId} farm={farm} />
                    })
                }
            </div>


        </div>

    )
}
