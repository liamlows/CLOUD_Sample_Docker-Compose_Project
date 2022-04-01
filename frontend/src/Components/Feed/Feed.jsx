import { ItemCard } from '../itemCard';
import banana from '../../images/Banana.jpg';
import solar from '../../images/solar.jpg';
import { useEffect, useState } from 'react';
import { item } from '../../models/item';
import { Container, Grid } from '@mui/material';
import { FarmCard } from '../farmCard';
export const Feed = () => {
    const [loadedFarms, setLoadedFarms] = useState([
        {
            FarmId: 1,
            FarmPicture: banana,
            FarmDescription: "great farm with great produce",
            items: [new item("banansssssssssssssssa", "i am banana", banana, 20, 2, 1),
            new item("banana", "i am a really bad banadddddddddddddddkdkkkna", banana, 20, 2, 1),
            new item("pearssssss", "i am epar", banana, 20, 2, 22),
            new item("banana", "i am banana", solar, 20, 2, 1),]

        }
    ])
    useEffect(() => {
        //TODO get the first ten farm items
    }, [])
    return (
        <>
            <h1>Feed</h1>
            {
                loadedFarms.map((farm) => {
                   return <FarmCard key={farm.FarmId} farm={farm}/>
                })
            }
            
                
        </>

    )
}
