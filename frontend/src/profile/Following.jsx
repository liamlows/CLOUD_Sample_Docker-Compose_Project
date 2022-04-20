import { Avatar, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import './profile.css'
import { Link } from 'react-router-dom';

export const Following = () => {
    return (<div className="container">
        <h4 className= "editHead">Users You're Following</h4>
        <br/>
        <Stack justifyContent="center" alignItems="center" spacing={2}>
            <div className="item">
                <Stack direction = "row" spacing={40}>
                    <Avatar sx={{ height: '2rem', width: '2rem'}}/>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link><br/> <p>Name</p></h6>
                    <Button color="secondary" onClick={() => {alert('User unfollowed');}} variant="outlined">
                        Unfollow
                    </Button>
                </Stack>
            </div>
            <div className="item">
                <Stack direction = "row" spacing={40}>
                    <Avatar sx={{ height: '2rem', width: '2rem'}}/>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link><br/> <p>Name</p></h6>
                    <Button color="secondary" onClick={() => {alert('User unfollowed');}} variant="outlined">
                        Unfollow
                    </Button>
                </Stack>
            </div>
            <div className="item">
                <Stack direction = "row" spacing={40}>
                    <Avatar sx={{ height: '2rem', width: '2rem'}}/>
                    <h6><Link to='/theirUser' className='createLink'>Username</Link><br/> <p>Name</p></h6>
                    <Button color="secondary" onClick={() => {alert('User unfollowed');}} variant="outlined">
                        Unfollow
                    </Button>
                </Stack>
            </div>
        </Stack>
    </div>);
}