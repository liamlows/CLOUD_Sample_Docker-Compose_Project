import { Button } from "@material-ui/core";
import { TextField } from "@mui/material";
import { useState } from "react";

export const LoginPage = () => {
    return(<>
    <h1>Log Into Your Account</h1>
    <TextField helperText="Please enter your username" id="demo-helper-text-misaligned" label="Username"/>
    <br/>
    <br/>
    <TextField helperText="Please enter your password" id="demo-helper-text-misaligned" label="Password"/>
   <br/> <br/> <br/>
   <Button variant="outlined">Submit</Button>
    </>);
}