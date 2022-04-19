
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
import './AddItemToFarmDialog.css';
import { Box } from '@mui/system';
import { addItemToFarm } from '../../api/farmItems';
//TODO Add fail logic and style to adding item
const AddItemDialog = ({ open, setOpen, itemName, itemDescription, image, farmId }) => {

    const [itemDetails, setItemDetails] = useState({
    });
    const [processing, setProcessing] = useState(false);
    const [completed, setCompleted] = useState(false);
    const timer = useRef();
    const timer2 = useRef();
    useEffect(() => {
        console.log("here")
        setItemDetails({
            itemName: itemName,
            itemDescription: itemDescription,
            image: image,
            price: 1,
            quantity: 1
        })

        return () => {
            clearTimeout(timer.current)
            clearTimeout(timer2.current);
        }


    }, [])
    const handleChange = (delta) => {
        setItemDetails({ ...itemDetails, ...delta });
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        setProcessing(true);
        //addItemToFarm(farmId, itemDetails).then();
        timer.current = setTimeout(() => {
            setCompleted(true);
            timer2.current = setTimeout(() => {
                handleClose();
            }, 3000)
        }, 2000)


    }
    if (processing) {
        return <Backdrop
            sx={{ flexDirection: "column", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}>
            {
                completed ? <>
                    <img id="add-item-success-icon" src={Checkmark}></img>
                    <Typography component={"div"} variant="h4">Added Item</Typography>
                </> : <CircularProgress color="inherit" />

            }
        </Backdrop>
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{textAlign: "center", fontWeight:"Bold"}}>Add Item To Your Farm</DialogTitle>
                <DialogTitle sx={{ textAlign: "center", paddingTop: "4px", paddingBottom: "4px" }}>{itemName}</DialogTitle>
                <DialogContent>
                    <DialogContent sx={{ display: "flex", justifyContent: "center" , padding:0, margin:["24px 0", "24px"]}}>
                        <img src={image} id="add-item-img"/>
                    </DialogContent>
                    <TextField

                        required
                        id="itemDescription"
                        label="Description"
                        multiline
                        fullWidth
                        rows={4}
                        value={itemDetails.itemDescription}
                        onChange={e => handleChange({ itemDescription: e.target.value })}

                    />
                    <Box sx={{ display: "flex", flexDirection: ["column", "row", "row"], justifyContent: "space-between",marginTop: "18px", gap: "20px" }}>
                        <TextField
                            sx={{alignSelf:"flex-start" }}
                            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                            inputProps={{ pattern: "[0-9]*", type: "number", inputMode: "numeric" }}
                            id="price"
                            label="Price"
                            pattern={"[0-9]*"}
                            inputMode={"numeric"}
                            value={itemDetails.price}
                            onChange={e => handleChange({ price: e.target.value })}


                        />
                        <TextField
                            sx={{ maxWidth: "125px"}}
                            id="quantity"
                            label="Quantity"
                            type="number"
                            inputProps={{
                                step: 1,
                                min: 0,
                                max: 9999,

                            }}
                            value={itemDetails.quantity}
                            onChange={e => handleChange({ quantity: e.target.value })}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddItemDialog;