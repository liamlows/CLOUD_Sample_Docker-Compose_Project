import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../APIFolder/loginApi';
import LoggedInResponsiveAppBar from '../common/LoggedInResponsiveAppBar';

export const FriendsList = ({ currUser, setCurrUser, pages, settings }) => {

    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);

    const [username, setUsername] = useState(undefined);

    const addFriend = () => {
        // navigate(`/users/${currUser.username}/friends`);
    }
    const goToProfile = (friend) => {
        navigate(`/users/${friend.username}`);
    }
    useEffect(() => {
        // getFriends(currUser.username).then(response => { setFriends(response))
    }, []);

    // if (!friends) {
    //     getProfiles().then(response => { setProfiles(response) })
    //     return <>Loading...</>
    // }

    const signOut = () => {
        console.log("Logging out");
        logout().then(() => setCurrUser(''));
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
                    Add Friend
            </Button>
            <div className='clearfix'></div>
        </div>
        <div className='border-top mb-3'></div>
        {friends.length > 0
            && <table>
                <thead>
                    {friends.map(friend => {
                        <tr key={friend.username}>
                            <td>{friend.username}</td>
                            <td>{friend.firstName}</td>
                            <td>{friend.lastName}</td>
                            <td>
                                <button type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => goToProfile(friend)}>View Profile</button>
                                </td>
                        </tr>
                        })}

                </thead>
            </table>}
        {friends.length === 0 && <h2>You have no friends</h2>}
    </div>
}
