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
        new event("Horse backriding party", "Bring your whole family to ride horses >:)!!!!",1,"Yellow Mountain Farm", 1, FarmImg)
    ])
    return (
        <div>
            <Typography>Orders</Typography>
            <Divider />
            
            {
                orders.map((order)=>{
                    return <OrderExpandable key={order.orderId} 
                                           {...order}/>
                })
            }
            <Divider />
            <Typography mt={4}>My RSVP'D Events</Typography>
            <Grid container >
                {
                    events.map((event)=>{
                        return <Grid item md={3}>
                            <EventCard key={event.eventId} {...event}/>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    );
};

export default Dashboard;