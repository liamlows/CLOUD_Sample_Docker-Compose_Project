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
import { Box } from '@mui/system';
import { addItemToFarm } from '../../api/farmItems';
import EventCard from '../eventCard/EventCard';
const CreateEventDialog = ({ open, setOpen, farmId, farmName }) => {

    const [eventDetails, setEventDetails] = useState({
    })

    const [confirming, setConfirming] = useState(false);

    useEffect(() => {
        setEventDetails({
            title: '',
            description: '',
            image: '',
            date: '',
            time: '',
            farmId: farmId
        })
    }, [])
    const handleChange = (delta) => {
        setEventDetails({ ...eventDetails, ...delta });
    }
    const handleSubmit = () => {
        console.log(eventDetails);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const today = new Date();
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                {confirming ? <>
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>Confirm your event</DialogTitle>
                    <EventCard
                        name={eventDetails.title}
                        description={eventDetails.description}
                        farmName={farmName}
                        image={eventDetails.image}
                        date={eventDetails.date}
                        time={eventDetails.time}
                        hideButton={true}
                    ></EventCard>
                    <DialogActions>
                        <Button onClick={()=>setConfirming(false)}>back</Button>
                        <Button onClick={() => handleSubmit}>submit</Button>
                    </DialogActions>
                </>
                    :
                    <>
                        <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>Add An Event To Your Farm</DialogTitle>
                        <DialogContent>
                            <TextField
                                sx={{ margin: "1rem 0" }}
                                required
                                id="eventTitle"
                                label="Title"

                                fullWidth
                                rows={4}
                                value={eventDetails.title}
                                onChange={e => handleChange({ title: e.target.value })}

                            />
                            <TextField

                                required
                                id="eventImage"
                                label="Image"
                                sx={{ marginBottom: "1rem" }}
                                fullWidth

                                value={eventDetails.image}
                                onChange={e => handleChange({ image: e.target.value })}

                            />
                            <TextField
                                sx={{ marginBottom: "1rem" }}
                                required
                                id="eventDescription"
                                label="Description"
                                multiline
                                fullWidth
                                rows={4}
                                value={eventDetails.description}
                                onChange={e => handleChange({ description: e.target.value })}

                            />
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                value={eventDetails.date}
                                onChange={e => handleChange({ date: e.target.value })}
                                
                                sx={{ width: 220, marginTop: "1rem", marginRight: "1rem" }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField

                                id="time"
                                label="Time"
                                type="time"
                        
                                value={eventDetails.time}
                                onChange={e => handleChange({ time: e.target.value })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                sx={{ width: 150, marginTop: "1rem" }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => setConfirming(true)}>Preview</Button>
                        </DialogActions>
                    </>
                }
            </Dialog>

        </div>
    );
};

export default CreateEventDialog;