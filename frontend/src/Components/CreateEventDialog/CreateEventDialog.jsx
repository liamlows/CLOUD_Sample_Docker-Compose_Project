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
import EventCard from '../eventCard/EventCard';
import { createEvent, deleteEventById, updateEventById } from '../../api/events';
// When creating an event, you should just pass in {open, setOpen, farmer_id, farmName}
// When editing an event, all fields should be passed in
// When deleting an event, all fields should be passed in
const CreateEventDialog = ({ open, setOpen, event_name, event_description, event_image_url, date, time, event_id, setEvent, farmer_id, farmName, showDelete, setRefresh }) => {
    console.log(time)
    const [eventDetails, setEventDetails] = useState({
    })
    const [previewing, setPreviewing] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [confirmDeletion, setConfirmDeletion] = useState(false);
    const [dialogComplete, setDialogComplete] = useState(false);
    const [completionText, setCompletionText] = useState('');


    useEffect(() => {
        let _time = time;
        var hours = parseInt(_time.substr(0, 2));
        if (_time.indexOf('AM') != -1 && hours == 12) {
            _time = _time.replace('12', '0');
        }
        if (time.indexOf('PM') != -1 && hours < 12) {
            _time = _time.replace(hours, (hours + 12));
        }
        _time = _time.replace(/(AM|PM)/, '');
        _time = _time.split(' ')[0];
        console.log(_time);

        setEventDetails({
            event_name,
            event_description,
            event_image_url,
            date: new Date(date).toISOString().split('T')[0],
            time: _time,
            event_id,
            setEvent,
            farmer_id: farmer_id,
        })
    }, [])
    const handleChange = (delta) => {
        console.log(eventDetails);
        setEventDetails({ ...eventDetails, ...delta });
    }
    //TODO make this real with backend
    const handleSubmit = (option) => {
        setConfirmDeletion(false);
        setProcessing(true);
        //delete event
        if (option == 1) {
            console.log(event_id);
            deleteEventById(event_id).then(() => {
                setProcessing(false);
                setCompletionText('Event removed');
                setDialogComplete(true);
                setRefresh(x => (!x));
            });

        }
        //IF we are passed an eventId, we are editing an event, WE should refresh the page or something to update 
        if (event_id) {
            updateEventById(eventDetails).then((res) => {
                setProcessing(false);
                setCompletionText('Event edited');
                setDialogComplete(true);
                setRefresh(x => (!x));

            });
        } else {
            console.log(eventDetails);
            createEvent(eventDetails).then(() => {
                setProcessing(false);
                setCompletionText('Event Added');
                setDialogComplete(true);

            })
        }



    }
    const handleClose = () => {
        setOpen(false);

    };
    const today = new Date();
    if (confirmDeletion) {
        return (
            <Backdrop
                sx={{ flexDirection: "column", alignItems: "center", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}>

                <Dialog classes={{ root: { alignItems: "center", backgroundColor: "Blue" } }} open={true} onClose={handleClose}>
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>Confirm Deletion</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setConfirmDeletion(false)}>Cancel</Button>
                        <Button onClick={() => handleSubmit(1)}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </Backdrop>
        )
    }

    if (processing) {
        return <Backdrop
            sx={{ flexDirection: "column", alignItems: "center", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    }
    if (dialogComplete) {
        return <Dialog classes={{ root: { alignItems: "center", backgroundColor: "Blue" } }} open={open} onClose={handleClose}>
            <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>{completionText}</DialogTitle>
            <img id="add-item-success-icon" src={Checkmark}></img>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                {previewing ? <>
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>Confirm your event</DialogTitle>
                    <DialogContent>
                        <EventCard
                            event_name={eventDetails.event_name}
                            event_description={eventDetails.event_description}
                            farmName={farmName}
                            event_image_url={eventDetails.event_image_url}
                            date={eventDetails.date}
                            time={eventDetails.time}
                            hideButton={true}
                        ></EventCard>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setPreviewing(false)}>back</Button>
                        <Button onClick={() => handleSubmit()}>submit</Button>
                    </DialogActions>
                </>
                    :
                    <>
                        <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>{showDelete ? "Edit Event" : "Add An Event To Your Farm"}</DialogTitle>
                        <DialogContent>
                            <TextField
                                sx={{ margin: "1rem 0" }}
                                required
                                id="event_name"
                                label="Title"

                                fullWidth
                                rows={4}
                                value={eventDetails.event_name}
                                onChange={e => handleChange({ event_name: e.target.value })}

                            />
                            <TextField

                                required
                                id="event_image_url"
                                label="Image"
                                sx={{ marginBottom: "1rem" }}
                                fullWidth

                                value={eventDetails.event_image_url}
                                onChange={e => handleChange({ event_image_url: e.target.value })}

                            />
                            <TextField
                                sx={{ marginBottom: "1rem" }}
                                required
                                id="event_description"
                                label="Description"
                                multiline
                                fullWidth
                                rows={4}
                                value={eventDetails.event_description}
                                onChange={e => handleChange({ event_description: e.target.value })}

                            />
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                required
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
                        <DialogActions sx={{ justifyContent: 'flex-end', pl: 3 }}>
                            {
                                showDelete && <div style={{ display: 'flex', flexGrow: 1 }}>
                                    <Button
                                        variant='outlined'
                                        color='error'
                                        sx={{ alignSelf: 'flex-start' }}
                                        onClick={() => setConfirmDeletion(true)}>Delete</Button>
                                </div>
                            }
                            <div>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={() => setPreviewing(true)}>Preview</Button>
                            </div>
                        </DialogActions>
                    </>
                }
            </Dialog>

        </div>
    );
};

export default CreateEventDialog;