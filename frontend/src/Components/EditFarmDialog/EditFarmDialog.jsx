
import React, { useEffect, useRef, useState } from 'react';
import { Backdrop, CircularProgress, Grid, Input, InputAdornment, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Checkmark from '../../images/green-checkmark.png';

const EditFarmDialog = ({ open, setOpen, farmName, farmDescription, farmImage, dateFounded, farmId }) => {

    const [farmDetails, setFarmDetails] = useState({});
    const [processing, setProcessing] = useState(false);
    const [dialogComplete, setDialogComplete] = useState(false);
    useEffect(() => {
        setFarmDetails({
            farmName, farmDescription, farmImage, dateFounded
        })
    }, [])

    const handleChange = (delta) => {
        setFarmDetails({ ...farmDetails, ...delta });
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        setProcessing(true);
        //editFarmById(farmId).then()
        setTimeout(() => {
            setProcessing(false);
            setDialogComplete(true);
        }, 2000)
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
            <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>Farm Edited</DialogTitle>
            <img id="add-item-success-icon" src={Checkmark}></img>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <>
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>Edit the details of your farm</DialogTitle>
                    <DialogContent>
                        <img src={farmDetails.farmImage} style={{minWidth:'200px', maxWidth:'60%', display:'block', margin:'0 auto'}}/>
                        <TextField
                            sx={{ margin: "1rem 0" }}
                            required
                            id="farmName"
                            label="Farm Name"

                            fullWidth
                            rows={4}
                            value={farmDetails.farmName}
                            onChange={e => handleChange({ farmName: e.target.value })}

                        />
                        <TextField

                            required
                            id="farmImage"
                            label="Image"
                            sx={{ marginBottom: "1rem" }}
                            fullWidth

                            value={farmDetails.farmImage}
                            onChange={e => handleChange({ farmImage: e.target.value })}

                        />
                        <TextField
                            sx={{ marginBottom: "1rem" }}
                            required
                            id="farmDescription"
                            label="Description"
                            multiline
                            fullWidth
                            rows={4}
                            value={farmDetails.farmDescription}
                            onChange={e => handleChange({ farmDescription: e.target.value })}

                        />
                        <TextField
                            sx={{ margin: ".1rem 0" }}
                            required
                            id="dateFounded"
                            label="Year established"

                            fullWidth
                            rows={4}
                            value={farmDetails.dateFounded}
                            onChange={e => handleChange({ dateFounded: e.target.value })}

                        />
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => handleSubmit()}>Submit</Button>
                    </DialogActions>
                </>
            </Dialog>

        </div>
    );
};

export default EditFarmDialog;