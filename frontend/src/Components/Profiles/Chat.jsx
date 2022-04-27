// Libary Imports
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import Check from "@mui/icons-material/Check";
import Add from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ClearIcon from '@mui/icons-material/Clear';

import "./Profile.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


// Component Imports
import { TextField } from "../common";
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";


// Method Imports
import { getFriendRequests, getStatusById, handleFriendRequest, logout, sendFriendRequest, updateAccountbyId, getFriendRequest, getFriendsClasses, uploadPP, getAccountbyId, updateAccount, getCoursebyId, getFriends } from "../../APIFolder/loginApi";
import { TextAreaField } from "../common/TextAreaField";
import { ReviewList } from "../common/ReviewList";



export const Chat = (props) => {
    // Navigate Object
    const navigate = useNavigate();
    if (localStorage.getItem("currUser") === null)
        localStorage.setItem("currUser", "{}");

    // Component Variables
    const [account, setAccount] = useState({});

    const [friends, setFriends] = useState(undefined);

    const [selectedFriend, setSelectedFriend] = useState(undefined);
    const [messages, setMessages] = useState([]);
    const [ready, setReady] = useState(false);


    const params = useParams();
    // Initial Load
    useEffect(() => {
        if (JSON.stringify(account) === "{}") {
            let account_id = Cookies.get("account_id");
            getAccountbyId(account_id).then(async loaded => {
                if (JSON.stringify(account) === "{}") {
                    let account_id = Cookies.get("account_id");
                    if (account_id) {
                        getAccountbyId(account_id)
                            .then(account => {
                                if (account) {
                                    localStorage.setItem("currUser", JSON.stringify(account));
                                    setAccount(account);
                                }
                                else {
                                    console.log("User is null after request");
                                }
                            });
                    }
                    else {
                        props.setNavigated(true);
                        navigate('/');
                    }

                }
            })
        }
    }, []); //lol the useEffect is just here now.
    if(friends === undefined){
        let temp_friends = []
        getFriends().then( async res => { 
            console.log(res);
            for(const i in res){
            console.log(res[i].friend_a,res[i].friend_b)
                
                if(res[i].friend_a === account.account_id)
                {
                    console.log("getting friend b")
                    await getAccountbyId(res[i].friend_b).then(frRes => {
                        // console.log(frRes);
                        temp_friends.push(frRes);
                        
                    })
                }
                else {
                    console.log("getting friend a")
                     await getAccountbyId(res[i].friend_a).then(frRes => {
                        temp_friends.push(frRes);
                        
                    })
                }
            }
            
        }).then(() => {
            console.log("Temp Friends", temp_friends)
            setFriends([...temp_friends]);
            setReady(true)
        })
    }

    const signOut = () => {
        console.log("Logging out");
        logout().then(() => {
            localStorage.setItem("currUser", "{}")
            navigate('/');
        });
    }

    const readyToDisplay = () => 
    {
        if(JSON.stringify(account) === "{}")
        {
            return false
        }
        if(!ready)
        {
            return false
        }
        console.log("Displaying, account",account)
        console.log("Displaying, friends",friends)
        
        return true;
    }
    // Basically check if user is the same user as the loaded profile.
    // If so then allow them to edit with the edit button at the end (this edit button will update the database once done)
    // If not then display the profile without the edit buttons.

    // NOTE - IN FUTURE ADD BUTTON TO SEND FRIEND REQUEST...ONLY IF FUNCTIONALITY IS IMPLEMENTED
    if (readyToDisplay()) {
        return <section className="Chat_Baby">
            <LoggedInResponsiveAppBar
                pages={props.pages}
                settings={props.settings}
                signOut={() => signOut()}
                account_id={JSON.parse(localStorage.getItem("currUser")).account_id}
                account_type={JSON.parse(localStorage.getItem("currUser")).role.role_type} />
            {
                friends.length === 0 && <p>
                    You must have friends to chat.
                </p>
            }
            {
                friends.length > 0 && <div className="col-12 mt-5 row">
                    <div className="FriendsList col-3">
                        
                            {
                                friends.map((friend, idx) => {
                                    console.log("selectedFriend", selectedFriend)
                                    let selected = " bg-secondary "
                                    if (selectedFriend && friend.account_id === selectedFriend.account_id) {
                                        selected = " bg-primary "
                                    }
                                    return (<Button key={idx} className={`friendProfile ${selected} `} variant="contained" onClick={() => {setSelectedFriend(friend)}}>
                                        {friend.pfp_url !== null && <img className="col-1 pfp float-start" src={`${friend.pfp_url}`} alt="" />}
                                        {friend.pfp_url === null && <img className="col-1 pfp float-start" src="https://via.placeholder.com/300x300" alt="" />}
                                        <p className="col-9 pt-3">{friend.username}</p>
                                    </Button>)
                                })
                            }
                        
                    </div>
                    <div className="ChatBox col-9 p-3">
                        {selectedFriend === undefined && <p>Please select friend to chat with</p>}
                        {selectedFriend !== '' && <ul>
                            {messages.map((message, idx) => {
                                let sent_recieve = ''
                                if (message.senderId === account.account_id) {
                                    sent_recieve = "sent"
                                }
                                else {
                                    sent_recieve = "recieve";
                                }

                                return (<li className={`${sent_recieve} pt-1`}>
                                    <p>{message.content}</p>
                                </li>)
                            })}
                        </ul>}
                    </div>
                </div>
            }
        </section>
    }


    else {
        return <>Loading Chat...</>;
    }

}