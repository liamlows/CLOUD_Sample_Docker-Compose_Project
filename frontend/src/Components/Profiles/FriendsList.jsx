import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FriendsList = ({ currUser, setCurrUser, setLoadedUser }) => {

    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);

    const [username, setUsername] = useState(undefined);

    const goToProfile = profile => {
        setLoadedUser(profile);
        // navigate(`/users/${profile.username}`);
    }

    const addFriend = () => {
        // navigate(`/users/${currUser.username}/friends`);
    }

    useEffect(() => {
        // getFriends(currUser.username).then(response => { setFriends(response))
    }, []);

    // if (!friends) {
    //     getProfiles().then(response => { setProfiles(response) })
    //     return <>Loading...</>
    // }

    return <div>
        <div className='container border-0 mb-3'>
            <h1 className='mt-3 col-6 float-start '>Friends List <span className='text-secondary'>(0)</span></h1>
            <button type='button' className='btn btn-success float-end fs-4 col-3 m-3'><AddIcon sx={{ color: 'white' }} />Add Friend</button>
            <div className='clearfix'></div>
        </div>
        <div className='border-top mb-3'></div>
        {friends.length > 0 
            && <table>
                <thead>
                    <tr>
                        <th>

                        </th>
                    </tr>
                </thead>
            </table>}
        {friends.length === 0 && <h2>You have no friends</h2>
    </div>
}
