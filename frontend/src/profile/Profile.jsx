import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import './profile.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { pink } from '@mui/material/colors';

export const Profile = () => {

    function stringToColor(string) {
        let hash = 0;
        let i;
      
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
      
        return color;
      }
      
      function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
            height: 80,
            width: 80
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }

    return(<div className="container">
        <br/>
        <h2 className="userHead">
            username!!
        </h2>
        <br/>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Avatar {...stringAvatar('Kate Bouis')} />
            </Grid>
            <Grid item xs={3}>
                <p><span>20</span> <br></br>posts</p>
            </Grid>
            <Grid item xs={3}>
                <p><span><Link to='/following' className="createLink">200</Link></span> <br></br>following</p>
            </Grid>
            <Grid item xs={3}>
                <p><span><Link to='/followers' className="createLink">2000</Link></span> <br></br>followers</p>
            </Grid>
        </Grid>
        <br/>
        <h4 className="bioName">Bio Name</h4>
        <br/>
        <div className="bio"> Bioooo </div>
        <br></br><br></br>
        <Button variant="outlined"><Link to='/edit-profile' className="createLink">Edit Profile</Link></Button>

        {/* posts are just grids of images with spacing, add dimension if possible, and links */}
        {/* make it a loop so that it does this for as many images as exist on the user account */}
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <img className="post" src="https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg"/>
            </Grid>
            <Grid item xs={3}>
            <img className="post" src="https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455__340.jpg"/>
            </Grid>
            <Grid item xs={3}>
                <img className="post" src="https://cdn.pixabay.com/photo/2012/08/06/00/53/bridge-53769__340.jpg"/>
            </Grid>
            <Grid item xs={3}>
                <img className="post" src="https://cdn.pixabay.com/photo/2018/08/12/15/29/hintersee-3601004__340.jpg"/>
            </Grid>
            <Grid item xs={3}>
            <img className="post" src="https://cdn.pixabay.com/photo/2014/08/15/11/29/beach-418742__340.jpg"/>
            </Grid>
            <Grid item xs={3}>
                <img className="post" src="https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990__340.jpg"/>
            </Grid>
            <Grid item xs={3}>
                <img className="post" src="https://cdn.pixabay.com/photo/2013/04/03/12/05/tree-99852__340.jpg"/>
            </Grid>
            <Grid item xs={3}>
            <img className="post" src="https://cdn.pixabay.com/photo/2017/08/04/17/56/dolomites-2580866__480.jpg"/>
            </Grid>
            <Grid item xs={3}>
                <img className="post" src="https://cdn.pixabay.com/photo/2016/06/20/03/15/pier-1467984__480.jpg"/>
            </Grid>
        </Grid>
        <AddCircleOutlineIcon className="addIcon" sx={{ color: pink[500], fontSize: 50}} />
        {/* add link to lower right + and add link to pull up posts*/}
        {/* actual feed is cards of NFTs. if no NFTs, write message telling them to post */}
        </div>

    );
}