import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccountbyUsername, getFriends, logout } from '../../APIFolder/loginApi';
import LoggedInResponsiveAppBar from '../common/LoggedInResponsiveAppBar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Cookies from 'js-cookie';

export const FriendsList = ({ currUser, setCurrUser, pages, settings, setNavigated }) => {

    const navigate = useNavigate();
    const [friends, setFriends] = useState(false);

    const goToProfile = (friend) => {
        navigate(`/users/${friend.username}`);
    }
    useEffect(() => {
        getFriends().then(response => { friendsSetter(response) });
    }, [currUser]);

    const friendsSetter = new_friends =>
    {
        console.log(new_friends);
        setFriends(new_friends);
    }

    if (!friends) {
        return <>Loading...</>
    }

    if (!currUser) {
        let username = Cookies.get("username");
        if (username) {
            getAccountbyUsername(username)
                .then(account => {
                    if (account) {
                        setCurrUser(account);
                    }
                    else {
                        console.log("User is null after request");
                        setCurrUser('');
                    }
                });
        }
        else {
            setCurrUser('');
            setNavigated(true);
            navigate('/');
        }
    }


    const signOut = () => {
        console.log("Logging out");
        logout().then(() => {
            navigate('/');
            setCurrUser('');
        });
    }
    const profileNav = () => {
        navigate(`users/${currUser.username}`);
    }
    const accountNav = () => {
        navigate(`accounts/${currUser.username}`);
    }



    return <div>
        <LoggedInResponsiveAppBar
            pages={pages}
            settings={settings}
            signOut={() => signOut()}
            username={currUser.username}
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
                    {friends.map(friend => {
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
                    })}

                </thead>
            </table>}
        {friends.length === 0 && <h2>You have no friends</h2>}
    </div>
}
