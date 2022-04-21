import { Avatar, Divider, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import './profile.css'
import { Link } from 'react-router-dom';

export const Following = () => {
    return (<div className="container">
        <h4 className="followHead">Users You're Following</h4>
        <br/>
        <Stack justifyContent="center" alignItems="center" width='100%' spacing={2} padding-top="2rem">
            <div className="item" width='100%'>
                <Stack direction = "row" spacing={40}>
                    <Avatar sx={{ height: '3rem', width: '3rem'}}/>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link><br/> <p>Name</p></h6>
                    <Button color="secondary" onClick={() => {alert('User unfollowed');}} variant="outlined">
                        Unfollow
                    </Button>
                </Stack>
            </div>
            <div className="item">
                <Stack direction = "row" spacing={40}>
                    <Avatar sx={{ height: '3rem', width: '3rem'}}/>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link><br/> <p>Name</p></h6>
                    <Button color="secondary" onClick={() => {alert('User unfollowed');}} variant="outlined">
                        Unfollow
                    </Button>
                </Stack>
            </div>
            <div className="item">
                <Stack direction = "row" spacing={40}>
                    <Avatar sx={{ height: '3rem', width: '3rem'}}/>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link><br/> <p>Name</p></h6>
                    <Button color="secondary" onClick={() => {alert('User unfollowed');}} variant="outlined">
                        Unfollow
                    </Button>
                </Stack>
            </div>
        </Stack>
    </div>);
}