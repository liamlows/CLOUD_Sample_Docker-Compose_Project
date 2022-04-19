
import React, { useEffect, useRef, useState } from 'react';
import { Backdrop, CircularProgress, Grid, Input, InputAdornment, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkmark from '../../images/green-checkmark.png';
import { Link } from 'react-router-dom';
const AddItemToCartDialog = ({ open, setOpen, name, description, stock, image, farmId }) => {
    const [quantity, setQuantity] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [completed, setCompleted] = useState(false);
    const timer = useRef();
    const timer2 = useRef();
    useEffect(() => {
        console.log("here")

        return () => {
            clearTimeout(timer.current)
            clearTimeout(timer2.current);
        }


    }, [])

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        if(!quantity) return;
        setProcessing(true);
        //addItemToFarm(farmId, itemDetails).then();
        timer.current = setTimeout(() => {
            setCompleted(true);
        }, 2000)


    }

    const handleQuantity = (num) => {
        if (num == 0 || num < 0) {
            setQuantity("");
        }
        else setQuantity(Math.min(num, stock));
    }
    if (processing) {
        return <Backdrop
            sx={{ flexDirection: "column", alignItems: "center", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}>
            {
                completed ? <>

                    <Dialog classes={{ root: { alignItems: "center", backgroundColor: "Blue" } }} open={open} onClose={handleClose}>
                        <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>Item added</DialogTitle>
                        <img id="add-item-success-icon" src={Checkmark}></img>
                        <DialogActions>
                            <Button onClick={handleClose}>Continue Shopping</Button>
                            <Button onClick={handleSubmit}><Link to='/cart'>View Cart</Link></Button>
                        </DialogActions>
                    </Dialog>
                </> : <CircularProgress color="inherit" />

            }
        </Backdrop>
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>Add Item To Your Farm</DialogTitle>
                <DialogTitle sx={{ textAlign: "center", paddingTop: "4px", paddingBottom: "4px" }}>{name}</DialogTitle>
                <DialogContent>
                    <DialogContent sx={{ display: "flex", justifyContent: "center", padding: 0, margin: ["24px 0", "24px"] }}>
                        <img src={image} id="add-item-img" />
                    </DialogContent>
                    <Typography>{description}</Typography>
                    <Typography fontWeight={"bold"} sx={{ margin: ".5rem 0" }}> Avaliable stock: {stock}</Typography>
                    <TextField
                        sx={{ maxWidth: "125px" }}
                        id="quantity"
                        label="Quantity"
                        type="number"
                        error={quantity === ""}
                        helperText={quantity === "" ? 'Enter amount' : ' '}
                        value={quantity}
                        onChange={e => handleQuantity(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddItemToCartDialog;