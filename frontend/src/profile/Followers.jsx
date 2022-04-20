import { Avatar, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import './profile.css'
import { Link } from 'react-router-dom';

export const Followers = () => {
    return (<div className="container">
        <h4 className= "editHead">Users Following You</h4>
        <br/>
        <Stack justifyContent="center" alignItems="center" spacing={2}>
            <div className="item">
                <Stack direction = "row" spacing={40}>
                    <Avatar sx={{ height: '3rem', width: '3rem'}}/>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link><br/> <p>Name</p></h6>
                    <Button color="secondary" onClick={() => {alert('User removed');}} variant="outlined">
                        Remove
                    </Button>
                </Stack>
            </div>
            <div className="item">
                <Stack direction = "row" spacing={40}>
                    <Avatar sx={{ height: '3rem', width: '3rem'}}/>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link><br/> <p>Name</p></h6>
                    <Button color="secondary" onClick={() => {alert('User removed');}} variant="outlined">
                        Remove
                    </Button>
                </Stack>
            </div>
            <div className="item">
                <Stack direction = "row" spacing={40}>
                    <Avatar sx={{ height: '3rem', width: '3rem'}}/>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link><br/> <p>Name</p></h6>
                    <Button color="secondary" onClick={() => {alert('User removed');}} variant="outlined">
                        Remove
                    </Button>
                </Stack>
            </div>
        </Stack>
    </div>);
}