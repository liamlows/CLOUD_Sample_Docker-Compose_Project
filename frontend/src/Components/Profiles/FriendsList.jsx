// Library Imports
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Component Imports
import LoggedInResponsiveAppBar from '../common/LoggedInResponsiveAppBar';

// Method Imports
import { getAccountbyId, getFriends, logout } from '../../APIFolder/loginApi';
import Cookies from "js-cookie";

export const FriendsList = (props) => {
    // Navigate Object
    const navigate = useNavigate();

    // Component Variables
    const [account, setAccount] = useState({});
    const [friends, setFriends] = useState(undefined);

    // Initial Load
    useEffect(() => {
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
                console.log("FL cook", Cookies.get("account_id"))
                props.setNavigated(true);
                navigate('/');
            }
        }
    }, []);
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
                        console.log(frRes);
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
            console.log("Temp Friends", temp_friends)
            setFriends([...temp_friends]);
            
        })
    }

    

    // Component Methods
    const goToProfile = (friend) => {
        navigate(`/users/${friend.account_id}`);
    }

    const signOut = () => {
        console.log("Logging out");
        logout().then(() => {
            localStorage.setItem("currUser", "{}")
            navigate('/');
        });
    }
    const readyToDisplay = () => {
        console.log("Friends", friends)
        if(JSON.stringify(account) === "{}")
        {
            //god I hate that the problem was loading too fast
            return false;
        }
        if(friends === undefined)
        {
            return false
        }
        return true
    }

    // const display = friend => {
    //     if(friend.account_id === account.account_id)
    //     {
    //         return false;
    //     }
    //     return true;
    // }

    // HTML
    if(readyToDisplay()){
    return <div>
        <LoggedInResponsiveAppBar
                pages={props.pages}
                settings={props.settings}
                signOut={() => signOut()}
                account_id={JSON.parse(localStorage.getItem("currUser")).account_id}
                account_type={JSON.parse(localStorage.getItem("currUser")).role.role_type} />

        <div className='container border-0 mb-3'>
            <h1 className='mt-3 col-6 float-start '>Friends List <span className='text-secondary'>({friends.length})</span></h1>
            <Button variant="contained"
                className='bg-success float-end fs-4 col-3 m-3'
                onClick={() => navigate('/users')}
                endIcon={<AddIcon />}>
                Add A Friend
            </Button>
            <div className='clearfix'></div>
        </div>
        <div className='border-top mb-3'></div>
        {console.log(friends)}
        {friends.length > 0
            && <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First</th>
                        <th>Last</th>
                    </tr>
                </thead>
                <tbody>
                    {friends.map(friend => {
                    
                    if(friend.account_id !== account.account_id){
                        return <tr key={friend.username} className="container">
                        <td>{friend.username}</td>
                        <td>{friend.first_name}</td>
                        <td>{friend.last_name}</td>

                        <td>
                            <Button variant="contained"
                                className="btn btn-warning"
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => goToProfile(friend)}>
                                View Profile
                            </Button>
                        </td>
                    </tr>
                    }
                    else{
                        return <div></div>
                    }
                        
    })}

                </tbody>
            </table>}
        {friends.length === 0 && <h2>You have no friends</h2>}
    </div>
    }
    else
    {
        return <>Loading...</>
    }
}
