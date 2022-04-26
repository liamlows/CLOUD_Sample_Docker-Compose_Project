import './messages.css';       
import { Avatar, Stack, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { pink } from '@mui/material/colors';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const Messages = () => {
    return(<div>

       <h4 className= "messageHead">Messages</h4>
       <div className="compose"><Link to='/newMessage' className="messageLink"><Button>Compose New</Button></Link></div>
        <br/>
        <Divider/>
        <Stack alignItems="left" spacing={2}>
        <div class="row"/>

        <div class="row">
            <div class="col-4">
                <Avatar sx={{ height: '3rem', width: '3rem'}}/>
            </div>
            <div class="col-4">
            <h6><div className="userMessage">Username</div>so then i said to her, how dare you?? omg</h6>
            </div>
            <div class="col-2">
                <Link to="/thatMessage"><ChatBubbleOutlineIcon sx={{ color: pink[500] }} fontSize="large"/></Link>
            </div>
            <div class="col-1">
                <caption>Date</caption>
            </div>
            <div class="col-1">
                <DeleteOutlineIcon fontSize="large"/>
            </div>
            <Divider/>
        </div>
        <div class="row">
            <div class="col-4">
                <Avatar sx={{ height: '3rem', width: '3rem'}}/>
            </div>
            <div class="col-4">
            <h6><div className="userMessage">Username</div>are you selling ur most recent nft </h6>
            </div>
            <div class="col-2">
                <Link to="/thatMessage"><ChatBubbleIcon sx={{ color: pink[500] }} fontSize="large"/></Link>
            </div>
            <div class="col-1">
                <caption>Date</caption>
            </div>
            <div class="col-1">
                <DeleteOutlineIcon fontSize="large"/>
            </div>
            <Divider/>
        </div>
        <div class="row">
            <div class="col-4">
                <Avatar sx={{ height: '3rem', width: '3rem'}}/>
            </div>
            <div class="col-4">
            <h6><div className="userMessage">Username</div>i'll sell it for $50 </h6>
            </div>
            <div class="col-2">
                <Link to="/thatMessage"><ChatBubbleIcon sx={{ color: pink[500] }} fontSize="large"/></Link>
            </div>
            <div class="col-1">
                <caption>Date</caption>
            </div>
            <div class="col-1">
                <DeleteOutlineIcon fontSize="large"/>
            </div>
            <Divider/>
        </div>
        </Stack>
    </div>);
}