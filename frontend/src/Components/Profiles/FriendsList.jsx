// Library Imports
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Component Imports
import LoggedInResponsiveAppBar from '../common/LoggedInResponsiveAppBar';

// Method Imports
import { getFriends, logout } from '../../APIFolder/loginApi';

export const FriendsList = (props) => {
    // Navigate Object
    const navigate = useNavigate();

    // Component Variables
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("currUser")));
    const [friends, setFriends] = useState(false);

    // Initial Load
    useEffect(() => {
        if (JSON.stringify(account) === "{}") {
            navigate('/');
            props.setNavigated(true);
        }
        getFriends().then(res => { friendsSetter(res); });
    }, []);

    // Conditions
    if (!friends) {
        return <>Loading...</>
    }

    // Component Methods
    const friendsSetter = (new_friends) => {
        console.log(new_friends);
        setFriends(new_friends);
    }
    const goToProfile = (friend) => {
        navigate(`/users/${friend.username}`);
    }

    const signOut = () => {
        console.log("Logging out");
        logout().then(() => {
            localStorage.setItem("currUser", "");
            navigate('/');
        });
    }
    const profileNav = () => {
        navigate(`users/${account.username}`);
    }
    const accountNav = () => {
        navigate(`accounts/${account.username}`);
    }

    // HTML
    return <div>
        <LoggedInResponsiveAppBar
            pages={props.pages}
            settings={props.settings}
            signOut={() => signOut()}
            username={account.username}
            profileNav={() => profileNav()}
            account={() => accountNav()} />

        <div className='container border-0 mb-3'>
            <h1 className='mt-3 col-6 float-start '>Friends List <span className='text-secondary'>(0)</span></h1>
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
            && <table>
                <thead>
                    {friends.map(friend => 
                        <tr key={friend.username}>
                            <td>{friend.username}</td>
                            <td>{friend.firstName}</td>
                            <td>{friend.lastName}</td>

                            <td>
                                <Button variant="contained"
                                    className="btn btn-secondary"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => goToProfile(friend)}>
                                    View Profile
                                </Button>
                            </td>
                        </tr>
                    )}

                </thead>
            </table>}
        {friends.length === 0 && <h2>You have no friends</h2>}
    </div>
}
