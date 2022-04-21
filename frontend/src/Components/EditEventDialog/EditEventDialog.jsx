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

const EditEventDialog = ({ open, setOpen, eventTitle, eventDescription, eventImage, eventDate, eventTime, eventId,farmId, setEvent }) =>{

    const [itemDetails, setItemDetails] = useState({
    });

    useEffect(() => {
        setItemDetails({
            eventTitle: eventTitle,
            eventDescription: eventDescription,
            eventImage: eventImage,
            price: 1,
            quantity: 1
        })

        return () => {
            clearTimeout(timer.current)
            clearTimeout(timer2.current);
        }


    }, [])
}