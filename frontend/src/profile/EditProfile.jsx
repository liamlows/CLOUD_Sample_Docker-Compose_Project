import './profile.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

export const EditProfile = () => {
    return (<div className="container">
    editing profile as we speak
    <Stack direction="row" spacing = {2}>
        <Button variant="outlined"><Link to='/profile' className="createLink">Cancel</Link></Button>
        <Button variant="outlined"><Link to='/profile' className="createLink">Save</Link></Button>
    </Stack>
    </div>);
}