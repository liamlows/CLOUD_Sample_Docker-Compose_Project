// import React, { useState, useEffect } from 'react';
// import { ProfileTable } from './ProfileTable';
// import { BsXLg, BsCheckLg } from 'react-icons/bs'
// import { Link } from 'react-router-dom';
// import './Profile.css';
// import { AccountsRepository } from '../api/AccountsRepository';

// export const OtherProfileInformation = props => {
    
//     const accountsRepository = new AccountsRepository();
//     const [profile, setProfile] = useState([]);


//     useEffect(() => {
//             accountsRepository.getUser(props.userID).then(x => setProfile(x));
//         },
//     [])

      

//     return <>

//         <div>
//             {profile.map((profile, index) => 
//                 <div key={index}>
//                     <p>{profile.username}</p>
//                     <p>{profile.userPassword}</p>
//                     <p>{profile.userType}</p>
//                     <p>{profile.phoneNumber}</p>
//                     <p>{profile.email}</p>
//                 </div>
//             )}
//         </div>

//     </>;

// }