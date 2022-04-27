import './search.css'
import * as React from 'react';
import { Button, TextField, Box, Divider, Stack, Avatar } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import { getUsers } from '../api/UsersAPI';
import CircularProgress from '@mui/material/CircularProgress';

// delete duplicate accounts

export const Search = () => {

    const[ users, setUsers ] = useState([]);
    const [username, setUsername] = useState(undefined);

    const [inputText, setInputText] = useState("");

    const inputHandler = (e) => {
        e.preventDefault();
        setInputText(e.target.value);
      };

    const filteredUsers=  users.filter((user) => {
        return user.username.match(inputText);
    });


    useEffect(() => {
        getUsers({username}).then(x => setUsers(x));
    }, [username]);

    return(<div className="searchContainer">
        <h4 className="searchHead">Search for your favorite Users!</h4>
       
        <TextField id="outlined-basic" label="Begin Typing" variant="outlined" fullWidth
        value={inputText} onChange={inputHandler}/>
        <br/>
        <br/>
        <Divider/>
        <br/><br/>
        
        {  filteredUsers.map(user => <div key={user.username} class="row">
                    <div class="col-4">
                      <Link to={`/theirUser`} className="createLink">
                          {user.username}
                      </Link>
                    </div>
                    <div class="col-4">
                        {user.name}
                    </div>
                    <div class="col-4">
                        Short Description
                    </div>
                    </div>)
        }
    </div>);
}