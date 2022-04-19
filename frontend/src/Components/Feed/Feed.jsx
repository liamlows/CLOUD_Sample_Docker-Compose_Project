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
import Search from '../Search/Search';
export const Feed = () => {
    const [itemsPerFarm, setItemsPerFarm] = useState(6);
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
    window.addEventListener("resize",()=>{
        if(window.outerWidth < 600){
            setItemsPerFarm(3);
        } else setItemsPerFarm(6);
    })
    const [searchParams, setSearchParams] = useState();
    useEffect(()=>{
        if(window.outerWidth < 600){
            setItemsPerFarm(2);
        }
    },[])
    useEffect(() => {
        
        //TODO get the first ten farm items
        console.log(searchParams);
    }, [searchParams])
    return (
        <div id="feed">
            <Search searchObject={searchParams} setSearchObject={setSearchParams}/>
            <div className="farm-page-farms pt-4">
                {
                    loadedFarms.map((farm, index) => {
                        return <FarmCard key={farm.FarmId} farm={farm} itemsPerFarm={itemsPerFarm} />
                    })
                }
            </div>


        </div>

    )
}
