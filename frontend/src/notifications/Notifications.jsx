import './notifications.css';       
import { Avatar, Stack, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const Notifications = () => {
    return(<div>
        <h4 className= "notifHead">Notifications</h4>
        <br/>
        <Divider/>
        <Stack alignItems="left" spacing={2}>
        <div class="row"/>
        <div class="row">
            <div class="col-4">
                <Avatar sx={{ height: '3rem', width: '3rem'}}/>
            </div>
            <div class="col-4">
            <h6><Link to='/theirUser' className='createLink'>Username</Link> liked your photo</h6>
            </div>
            <div class="col-4">
                <Button color="secondary" onClick={() => {alert('User followed');}} variant="contained">
                    Follow
                </Button>
            </div>
            <Divider/>
        </div>
        <div class="row">
            <div class="col-4">
                <Avatar sx={{ height: '3rem', width: '3rem'}}/>
            </div>
            <div class="col-4">
            <h6><Link to='/theirUser' className='createLink'>Username</Link> commented ... </h6>
            </div>
            <div class="col-4">
                <Button color="secondary" onClick={() => {alert('User followed');}} variant="contained">
                    Follow
                </Button>
            </div>
            <Divider/>
        </div>
        <div class="row">
            <div class="col-4">
                <Avatar sx={{ height: '3rem', width: '3rem'}}/>
            </div>
            <div class="col-4">
            <h6><Link to='/theirUser' className='createLink'>Username</Link> followed you </h6>
            </div>
            <div class="col-4">
                <Button color="secondary" onClick={() => {alert('User followed');}} variant="contained">
                    Follow
                </Button>
            </div>
            <Divider/>
        </div>
        </Stack>
    </div>);
}