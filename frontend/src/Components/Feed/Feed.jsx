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
import { getFarmById } from '../../api/farms';
export const Feed = () => {
    const [itemsPerFarm, setItemsPerFarm] = useState(6);
    const [smallScreen, setSmallScreen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [fade, setFade] = useState(false);
    const [loadedFarms, setLoadedFarms] = useState([
        
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
        getFarmById(1).then(res => setLoadedFarms([
            ...loadedFarms, {
            farmId: res.data.farmInfo[0].farmer_id,
            farmName: res.data.farmInfo[0].farm_name,
            farmDescription: res.data.farmInfo[0].farm_description,
            farmImage: res.data.farmInfo[0].farm_image_url,
            items: res.data.products,
            events: res.data.events}
        ]));
    }, [searchParams])

    useEffect(() => {
        if(!firstLoad){
            titleRef.current.scrollIntoView();
            setFade(true);
        }
        setFirstLoad(false);
        
        
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
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Search Farms</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Search searchObject={searchParams} setSearchObject={setSearchParams} setFarms={setLoadedFarms} verticalFilters={true} />
                    </AccordionDetails>
                </Accordion> 
                : 
                <Search searchObject={searchParams} setSearchObject={setSearchParams} setFarms={setLoadedFarms} verticalFilters={true} header='Search Farms'/>
            }
            <div className={`farm-page-farms pt-4 ${fade ? 'fade':''}`} onAnimationEnd={()=>setFade(false)}>
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
