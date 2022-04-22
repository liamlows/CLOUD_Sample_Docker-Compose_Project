import { ItemCard } from '../ItemCard/itemCard';
import banana from '../../images/Banana.jpg';
import solar from '../../images/solar.jpg';
import horse from '../../images/horse.jpg';
import FarmImg from '../../images/farm.jpg';
import FarmImg2 from '../../images/farm2.jpg';
import { useEffect, useRef, useState } from 'react';
import { item } from '../../models/item';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Container, Grid, MenuItem, Stack, TextField, ToggleButton, Typography } from '@mui/material';
import { FarmCard } from '../FarmCard/farmCard';
import './Feed.css'
import Search from '../Search/Search';
import { AiFillWindows, AiOutlineArrowDown } from 'react-icons/ai';
export const Feed = () => {
    const [itemsPerFarm, setItemsPerFarm] = useState(6);
    const [smallScreen, setSmallScreen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [loadedFarms, setLoadedFarms] = useState([
        {
            farmId: 1,
            farmName: "Outback steak house",
            farmImage: FarmImg,
            farmDescription: "great farm with great produce",
            items: [new item("bananssssa", "i am banana", "https://cdn1.sph.harvard.edu/wp-content/uploads/sites/30/2018/08/bananas-1354785_1920.jpg", 20, 2, 1),
            new item("tractor", "This is a sentence that makes sense and isnt' just some nonsense spewed out onto the screen", "https://media.wired.com/photos/61d36f47f6b645152a4dc776/16:9/w_2400,h_1350,c_limit/Business_John%20Deere_r4f167410.jpg", 20, 2, 1),
            new item("pearssssss", "i am epar", "https://cdn1.sph.harvard.edu/wp-content/uploads/sites/30/2018/08/bananas-1354785_1920.jpg", 20, 2, 22),
            new item("great horse", "6'5 rows for uc davis", horse, 200, 1, 1, ["livestock"]),
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
            new item("great horse", "6'5 rows for uc davis", horse, 200, 1, 1, ["livestock"]),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            new item("banana", "i am banana", solar, 20, 2, 1),
            ]
        }
    ])
    const titleRef = useRef(null);

        useEffect(() => {
            if (window.outerWidth < 900) {
                setSmallScreen(true);
            }
        }, [])


    const [searchParams, setSearchParams] = useState();
    useEffect(() => {
        if (smallScreen) {
            setItemsPerFarm(2)
        } else setItemsPerFarm(6);
    }, [smallScreen])


    useEffect(() => {

        //TODO get the first ten farm items
        console.log(searchParams);
    }, [searchParams])

    useEffect(() => {
        titleRef.current.scrollIntoView();
    }, [loadedFarms])

    window.addEventListener("resize", () => {
        if (window.outerWidth < 900) {
            setSmallScreen(true);
        } else setSmallScreen(false);
    })
    return (
        <div id="feed">

            {smallScreen ?
                <Accordion sx={{ backgroundColor: "rgb(41, 44, 47)", color: 'white' }}>
                    <AccordionSummary
                        expandIcon={<AiOutlineArrowDown color='white' />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Search</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Search searchObject={searchParams} setSearchObject={setSearchParams} setFarms={setLoadedFarms} verticalFilters={true} />
                    </AccordionDetails>
                </Accordion> 
                : 
                <Search searchObject={searchParams} setSearchObject={setSearchParams} setFarms={setLoadedFarms} verticalFilters={true} />
            }
            <div className="farm-page-farms pt-4">
                <Typography ref={titleRef}variant='h3' textAlign={'center'} sx={{ fontWeight: '100', mb: 2 }}>Your Feed</Typography>
                {
                    loadedFarms.map((farm, index) => {
                        return <FarmCard key={farm.FarmId} farm={farm} itemsPerFarm={itemsPerFarm} />
                    })
                }
            </div>


        </div>

    )
}
