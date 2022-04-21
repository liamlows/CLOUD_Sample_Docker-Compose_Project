
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Button, Container, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { getFarmById } from '../../api/farms';
import { UserContext } from '../userContext';

export const Cart = () => {
    const [items, setItems] = useState([
        { name: "Farm", description: "Large variant aksk alskd aklskdk alsk", image: "https://media.gq.com/photos/56e71c0b14cbe0637b261d7f/16:9/w_2560%2Cc_limit/horseinsuit2.jpg", price: 14.99, quantity: 4, farmId: 1, },
        { name: "Pear", description: "Edible i hope", image: "https://images.albertsons-media.com/is/image/ABS/184120604?$ecom-pdp-desktop$&defaultImage=Not_Available", price: 14.99, quantity: 4, farmId: 1, },
        { name: "Tractor", description: "Large variant", image: "https://images.wsj.net/im-461772?width=1280&size=1", price: 14.99, quantity: 4, farmId: 1, },
        { name: "Horse", description: "Pretty fast", image: " ", price: 14.99, quantity: 2, farmId: 1, },
        { name: "Shovel", description: "Large variant", image: "https://www.qcsupply.com/media/catalog/product/cache/5284d6cde28d5b60f464df18bb1a18f4/3/6/360354.jpg", price: 14.99, quantity: 4, farmId: 1, },
        { name: "Banjo", description: "Large variant", image: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/345289/16476856_800.jpg", price: 14.99, quantity: 4, farmId: 1, },
    ])
    const [orders, setOrders] = useState(null);
    const [total, setTotal] = useState(0);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const redirectToCheckout = () => {
        navigate("/checkout");
    }

    useEffect(() => {
        const orders = []
        let total = 0;
        items.forEach(itemToSort => {
            let added = false;
            total += itemToSort.price * itemToSort.quantity;
            orders.forEach(order => {
                if (order[0].farmId == itemToSort.farmId) {
                    added = true;
                    order.push(itemToSort);
                }

            })
            if (!added) {
                orders.push([itemToSort]);
            }
        });
        setOrders(orders);
        setTotal(total);
    }, [items])

    const getFarmName = (id) => {
        getFarmById(id).then(data => { return data.farmName })
    }

    const deleteItem = (itemId) => {
        let userId = userContext.userId;
        //deleteItemFromCart({userId,itemId});
    }
    if (!orders) {
        return <></>
    }
    return (
        <div>
            <Container component="main" sx={{ mb: 4, maxWidth: ["900px"] }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                        Cart Summary
                    </Typography>
                    {
                        orders.length > 1 && <Typography color={"purple"} textAlign='center'>
                            You have items from more than one farm in your cart, checking out will create multiple orders.
                        </Typography>
                    }
                    <Stack>
                        {
                            orders.map((order, index) => (
                                <Typography key={index} sx={{ py: 1, px: 0 }}>
                                    <Typography variant="h5" sx={{ fontWeight: "bold", textAlign:['center'] }}>{orders.length > 1 && `Order: ${index + 1}`}</Typography>
                                    <List>

                                        {
                                            order.map((item, index) => {
                                                return <>
                                                    <ListItem alignItems='flex-start' key={index} sx={{ py: 1, px: 0, display: ["none", "flex"] }}>
                                                        <ListItemText primary={<Typography variant='h6'>{item.name}</Typography>} secondary={<><div style={{ marginLeft: "6px" }}>{item.description}</div>
                                                        <Stack sx={{ textAlign: "start", alignItems: "start", my:1.5 }}>
                                                                <Typography >Price: ${item.price}</Typography>
                                                                <Typography >Quantity: {item.quantity}</Typography>
                                                                <Typography sx={{ fontWeight: "bold", }}>Total: ${item.price * item.quantity}</Typography>
                                                            </Stack>
                                                            <Button variant='outlined' color='error' sx={{ mt: 1 }} onClick={() => deleteItem(item.itemId)}>Remove</Button></>} />
                                                        <img src={item.image} style={{ width: '35%',maxHeight: "200px", maxWidth: "320px", }} />
                                                    </ListItem>
                                                    <Container component="li" sx={{ display: ["flex", "none"], flexDirection: 'column' }}>
                                                        <Typography sx={{ textAlign: "center" }}>{item.name}</Typography>
                                                        <Typography variant='subtitle2' color={"text.secondary"} sx={{ textAlign: "center" }}>{item.description}</Typography>
                                                        <img src={item.image} style={{ width: '100%', maxHeight: "200px", maxWidth: "320px", margin: "0 auto", display: "block" }} />
                                                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{ my: 2 }}>
                                                            <Stack sx={{ textAlign: "start", alignItems: "start" }}>
                                                                <Typography sx={{ }}>Price: ${item.price}</Typography>
                                                                <Typography sx={{  }}>Quantity: {item.quantity}</Typography>
                                                                <Typography sx={{ fontWeight: "bold", }}>Total: ${item.price * item.quantity}</Typography>
                                                            </Stack>

                                                            <Button variant='outlined' color='error' onClick={() => deleteItem(item.itemId)}>Remove</Button>
                                                        </Box>
                                                        
                                                    </Container>

                                                </>
                                            })
                                        }
                                    </List>
                                    <Divider variant='middle'></Divider>
                                </Typography>

                            ))
                        }

                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={<div style={{fontWeight:'bold', fontSize:'24px'}}>Total</div>} />
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                {`$${total}`}
                            </Typography>
                        </ListItem>
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                        <Button variant="contained" onClick={redirectToCheckout}>Checkout</Button>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}