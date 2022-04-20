
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Button, Container, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { getFarmById } from '../../api/farms';
import { UserContext } from '../userContext';

const products = [
    {
        name: 'Product 1',
        desc: 'A nice thing',
        price: '$9.99',
    },
    {
        name: 'Product 2',
        desc: 'Another thing',
        price: '$3.45',
    },
    {
        name: 'Product 3',
        desc: 'Something else',
        price: '$6.51',
    },
    {
        name: 'Product 4',
        desc: 'Best thing of all',
        price: '$14.11',
    },
    { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

export const Cart = () => {
    const [items, setItems] = useState([
        { name: "Farm", description: "Large variant aksk alskd aklskdk alsk", image: " ", price: 14.99, quantity: 4, farmId: 1, },
        { name: "Pear", description: "Edible i hope", image: " ", price: 14.99, quantity: 4, farmId: 2, },
        { name: "Tractor", description: "Large variant", image: " ", price: 14.99, quantity: 4, farmId: 1, },
        { name: "Horse", description: "Pretty fast", image: " ", price: 14.99, quantity: 2, farmId: 1, },
        { name: "Shovel", description: "Large variant", image: " ", price: 14.99, quantity: 4, farmId: 1, },
        { name: "Banjo", description: "Large variant", image: " ", price: 14.99, quantity: 4, farmId: 1, },
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
        //deleteItem({userId,itemId});
    }
    if (!orders) {
        return <></>
    }
    return (
        <div>
            <Container component="main" sx={{ mb: 4, maxWidth: ["600px"] }}>
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
                                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>{`Order: ${index + 1}`}</Typography>
                                    <List >

                                        {
                                            order.map((item, index) => {
                                                return <ListItem key={index} sx={{ py: 1, px: 0 }}>
                                                    <ListItemText primary={`${item.name} (${item.quantity})`} secondary={<><div>{item.description}</div><Button variant='outlined' color='error' onClick={()=>deleteItem(item.itemId)}>Remove</Button></>} />
                                                    <Typography variant="body2">{"$" + item.price * item.quantity}</Typography>
                                                </ListItem>
                                            })
                                        }
                                    </List>
                                </Typography>

                            ))
                        }

                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Total" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
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