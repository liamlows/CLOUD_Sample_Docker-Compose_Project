import React, { useContext } from 'react';
import './OrderExpandable.css';
import { AiOutlineArrowDown } from 'react-icons/ai';
import Collapsible from 'react-collapsible';
import { UserContext } from '../userContext';
import { Button, Container, Divider, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

const OrderExpandable = ({ orderId, buyerName, farmName, orderDate, itemsPurchased, firstName, lastName, address, city, state, zip, fulfilled }) => {
    const userContext = useContext(UserContext);

    const buildItemString = () => {
        let items = [];
        itemsPurchased.forEach(item => {
            items.push(item.name + " (" + item.stock + ")");
        });
        return items.join(', ')
    }
    return (
        <div>
            <Collapsible trigger={<span>Order #{orderId} <AiOutlineArrowDown className='Collapsible__triggericon' /></span>}>
                <div className="order-buyer-name">
                    <span>Buyer: </span>
                    {buyerName}
                </div>
                <div className="order-farm-name">
                    <span>Seller: </span>
                    {farmName}
                </div>
                <div className="order-date">
                    <span>Order Date: </span>
                    {orderDate.toLocaleString()}
                </div>
                
                <Collapsible trigger={<span>Items Purchased: {buildItemString()} <AiOutlineArrowDown className='Collapsible__triggericon' /></span>}>
                    <List>

                        {
                            itemsPurchased.map((item, index) => {
                                return <>
                                    <ListItem alignItems='center' key={index} sx={{ py: 1, px: 0, display: ["none", "flex"] }}>
                                        <ListItemText primary={<Typography variant='h6'>{item.name}</Typography>} secondary={<><div style={{ marginLeft: "6px" }}>{item.description}</div>
                                            <Stack sx={{ textAlign: "start", alignItems: "start", my: 1.5 }}>
                                                <Typography >Price: ${item.price}</Typography>
                                                <Typography >Quantity: {item.stock}</Typography>
                                                <Typography sx={{ fontWeight: "bold", }}>Total: ${item.price * item.stock}</Typography>
                                            </Stack>
                                        </>} />
                                        <img src={item.image} style={{ width: '35%', maxHeight: "200px", maxWidth: "320px", }} />
                                    </ListItem>

                                    <Container component="li" sx={{ display: ["flex", "none"], flexDirection: 'column' }}>
                                        <Typography sx={{ textAlign: "center" }}>{item.name}</Typography>
                                        <Typography variant='subtitle2' color={"text.secondary"} sx={{ textAlign: "center" }}>{item.description}</Typography>
                                        <img src={item.image} style={{ width: '100%', maxHeight: "200px", maxWidth: "320px", margin: "0 auto", display: "block" }} />
                                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{ my: 2 }}>
                                            <Stack sx={{ textAlign: "start", alignItems: "start" }}>
                                                <Typography sx={{}}>Price: ${item.price}</Typography>
                                                <Typography sx={{}}>Quantity: {item.stock}</Typography>
                                                <Typography sx={{ fontWeight: "bold", }}>Total: ${item.price * item.stock}</Typography>
                                            </Stack>
                                        </Box>
                                        <Divider variant='middle'></Divider>
                                    </Container>

                                </>
                            })
                        }
                    </List>
                </Collapsible>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" fontWeight={'bold'} gutterBottom sx={{ mt: 2 }}>
                        Address
                    </Typography>
                    <Typography gutterBottom>{firstName + ' ' + lastName}</Typography>
                    <Typography gutterBottom>{`${address}, ${city}, ${state}, ${zip}`}</Typography>
                </Grid>
                <div className={`order-fulfilled m-4 ${fulfilled ? 'alert alert-success' : 'alert alert-danger'}`}>
                    <span>Status: </span>
                    {
                        fulfilled ? 'Completed' : 'Pending'
                    }
                </div>

                {
                    userContext.userData.isFarmer ?
                        fulfilled ? null : <button className='btn btn-success float-end mb-4'>Mark as complete</button> : null
                }

            </Collapsible>
        </div>
    );
};

export default OrderExpandable;