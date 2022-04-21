import { Divider, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import FarmImg from '../../images/farm.jpg';
import { order } from '../../models/order';
import { item } from '../../models/item';
import './Dashboard.css';
import OrderExpandable from '../OrderExpandable/OrderExpandable';
import { event } from '../../models/event';
import EventCard from '../eventCard/EventCard';
const Dashboard = () => {
    const [orders, setOrders] = useState([
        new order(1, 1, "Zach", "Greenville Farms", 2, new Date(), 242, [new item("Horse", "Big horse", "horse.jpg", 20, 1, 2)], false),
        new order(1, 1, "Texas", "Greenville Farms", 2, new Date(), 242, [new item("Horse", "Big horse", "horse.jpg", 20, 1, 2)], true),
        new order(1, 1, "Mom", "Greenville Farms", 2, new Date(), 242, [new item("Horse", "Big horse", "horse.jpg", 20, 1, 2)], false),
    ])

    const [events, setEvents] = useState ([
        new event("Horse backriding party", "Bring your whole family !",1,"Yellow Mountain Farm", 1, "https://upload.wikimedia.org/wikipedia/commons/4/48/GGF_Race5.jpg"),
        new event("BIG BANG BOOM BASS = ", "Big ol bag lala palozaoza im just making up words here to test stuff with variable length",1,"Yellow Mountain Farm", 1, "https://i.cbc.ca/1.6165805.1630877196!/fileImage/httpImage/lawn-tractor-races.jpg"),
        new event("Horse backriding party forever and ever", "Loreeat cupiditate ut, minus necessit cupiditate ut, minus necessit cupiditate ut, minus necessit cupiditate ut, minus necessita quod vel eaque mollitia iste itaque ipsam? Rem?",1,"Yellow Mountain Farm", 1, FarmImg),
        
    ])
    return (
        <div className='dashboard'>
            <Typography mb={2}>Orders</Typography>
            <Divider />
            <div className="dashboard-orders">
                
                {
                    orders.map((order)=>{
                        return <OrderExpandable key={order.orderId}
                                               {...order}/>
                    })
                }
            </div>
            <Divider />
            <Typography mt={4} mb={4}>My RSVP'D Events</Typography>
            <Grid container spacing={3} sx={{width:["100%","95%"]}}>
                {
                    events.map((event)=>{
                        return <Grid item sm={6} md={4} lg={3} width="100%">
                            <EventCard key={event.eventId} {...event}/>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    );
};

export default Dashboard;