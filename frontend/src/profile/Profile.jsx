import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import './profile.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Posts } from './Posts';
import{ useState,useEffect } from 'react';
import{getUserInfo} from '../api/AuthenAPI';

export const Profile = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));
  const classes = useStyles();
  const [user, setUser]=useState(undefined);

  useEffect(()=>{
      getUserInfo().then(x => setUser(x));

  },[ ]);
  if(!user){
    return<>Loading</>
  }

    return(<div className="profileContainer">
        <br/>
        <h2 className="userHead">
            Hello!
        </h2>
        <br/>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Avatar alt="pic" className={classes.large} src={user[0].photo}/>
            </Grid>
            <Grid item xs={3}>
                <p><span className="colorChange">20</span> <br></br>posts</p>
            </Grid>
            <Grid item xs={3}>
                <p><span className="colorChange"><Link to='/following' className="createLink">200</Link></span> <br></br>following</p>
            </Grid>
            <Grid item xs={3}>
                <p><span className="colorChange"><Link to='/followers' className="createLink">2000</Link></span> <br></br>followers</p>
            </Grid>
        </Grid>
        <br/>
        <h4 className="bioName">{user[0].name}</h4>
        <br/>
        <div className="bio"> Bioooo </div>
        <br></br><br></br>

        <Button variant="outlined"><Link to={`/edit-profile/${user[0].id}`} className="createLink">Edit Profile</Link></Button>
        {/* in lab, ask how to make card pop up on click without changing link and while keeping profile in background*/}
        {/* possible option of making it dialog instead of card but still figure out how to make it appear */}

        <br/><br/>
        <Posts/>

        <Fab sx={{ position: 'fixed',
        bottom: 16,
        right: 16,
        }} color="secondary" aria-label="add">
            <Link to = '/postPicture' className="postLink"><AddIcon/></Link>
        </Fab>        
        </div>

    );
}