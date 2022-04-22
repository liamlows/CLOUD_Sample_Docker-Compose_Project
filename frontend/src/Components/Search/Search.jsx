import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Container, Grid, MenuItem, Stack, TextField, ToggleButton, Typography } from '@mui/material';
import { getFarmItems } from '../../api/farmItems';
import { item } from '../../models/item';
const Search = ({ searchObject, setSearchObject, setFarms, justItem, header, verticalFilters, hideSearch }) => {
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
        { objectName: "isBig", label: "Big" },
    ]
    const [searchParams, setSearchParams] = useState({
        priceOption: 0,
        minPrice: 0,
        maxPrice: 100000,
        farmName: '',
        itemName: '',
        filters: []

    });
    const [windowSize, setWindowSize] = useState(window.innerWidth);


    useEffect(() => {
        setSearchObject(searchParams);
    }, [])

    const handleSearchChange = (delta) => {
        setSearchObject({ ...searchObject, ...delta })
        console.log(searchObject)
    }
    const handleFilterChange = (filter) => {

        if (searchObject.filters.includes(filter)) {
            let newFilter = [...searchObject.filters];
            newFilter.splice(newFilter.indexOf(filter), 1);

            handleSearchChange({ filters: newFilter });
        } else {
            let newFilter = [...searchObject.filters];
            newFilter.push(filter);
            handleSearchChange({ filters: newFilter });
        }
    }
    const handlePriceSearchChange = (priceChoice) => {
        let priceSelection = priceSearchOptions[priceChoice];
        handleSearchChange({
            minPrice: priceSelection.minPrice,
            maxPrice: priceSelection.maxPrice,
            priceOption: priceSelection.priceOption
        });
    }
    const search = () => {
        //setFarms(getFarms(searchObject));
        setFarms([{
            farmId: 1,
            farmName: "Outback steak house",
            farmImage: "google.com/favicon",
            farmDescription: "great farm with great produce",
            items: [new item("bananssssa", "i am banana", "https://cdn1.sph.harvard.edu/wp-content/uploads/sites/30/2018/08/bananas-1354785_1920.jpg", 20, 2, 1),
            ]
        }]);
    };
    window.addEventListener('resize', () => {
        setWindowSize(window.innerWidth);


    })
    if (!searchObject) return <> </>;
    return (

        <div className="feed-search-container" style={  {backgroundColor: hideSearch ? 'rgb(41, 44, 47)': 'rgb(41, 44, 47)',
                                                        color: hideSearch ? 'white': 'white'}}>
            {header ? <Typography variant='subtitle1' textAlign={'center'}>{header}</Typography> : null}
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    !justItem && <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            id='outlined-basc'
                            label='Farm name'
                            variant='filled'
                            fullWidth
                            style={{

                                borderRadius: 10,
                                backgroundColor: "silver"
                            }}
                            inputProps={{ style: { color: "black" } }}
                            value={searchObject.farmName}
                            onChange={(e) => handleSearchChange({ farmName: e.target.value })} />
                    </Grid>
                }
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        sx={{ borderColor: 'green' }}

                        variant='filled'
                        id='item-name'
                        label='Item name'
                        style={{

                            borderRadius: 10,
                            backgroundColor: "silver"
                        }}
                        fullWidth={!hideSearch}
                        value={searchObject.itemName}
                        onChange={(e) => handleSearchChange({ itemName: e.target.value })} />
                </Grid>
                {!justItem && <Grid item xs={6} sm={2} md={12}>
                    <TextField
                        sx={{ color: 'white' }}
                        id="Price"
                        select
                        label="Price"
                        width={"100%"}
                        variant='filled'
                        style={{

                            borderRadius: 10,
                            backgroundColor: "silver"
                        }}
                        value={searchObject.priceOption ? searchObject.priceOption : 0}
                        onChange={(e) => handlePriceSearchChange(e.target.value)}>
                        {priceSearchOptions.map((option) => (
                            <MenuItem key={option.priceOption} value={option.priceOption}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                }
            </Grid>
            <Typography mt={2} mb={1}>
                Filters
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: windowSize > 900 && verticalFilters ? 'column' : 'row', flexWrap: 'wrap', maxWidth: ["100%", "100%"], alignItems: "stretch", color:'white' }}>
                {
                    filterOptions.map((option, index) => {
                        return <ToggleButton sx={{ ml: [1, 1, 0], mr: [1, 1, 1], mb: [1, 1, 2], paddingLeft: 1, color:'white', justifyContent: "left", width: windowSize > 900 && verticalFilters ? '100%' : 'fit-content', border: 'none' }}
                            key={option.label}
                            color="info"
                            value={searchObject.filters.includes(option.label)}
                            selected={searchObject.filters.includes(option.label)}
                            fullWidth
                            onChange={() => {
                                handleFilterChange(option.label);
                            }}
                        >
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: [14, 16, 20] }, padding: 0, color:'white' }} checked={searchObject.filters.includes(option.label)} color="success" />
                            <Typography sx={{ fontSize: [12, 12, 12, 16], fontWeight: "600", ml: 1 }}>{option.label}</Typography>
                        </ToggleButton>


                    })
                }
            </Box>
            {!hideSearch && <Button fullWidth variant="contained" sx={{ mt: 2, mb: 2 }} onClick={() => search()}>Search</Button>}



        </div>

    );
};

export default Search;