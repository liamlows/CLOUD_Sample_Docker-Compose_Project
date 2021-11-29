// import React from 'react';
// import { ProfileTable } from './ProfileTable';
// import { BsXLg, BsCheckLg } from 'react-icons/bs'
// import { Link } from 'react-router-dom';
// import { AccountsRepository } from '../api/AccountsRepository';
// import { NavigationBar } from '../Navigation/NavigationBar';
// import { OtherProfileInformation } from './OtherProfileInformation';
// import './Profile.css';

// export class OtherProfile extends React.Component {

//     accountsRepository = new AccountsRepository();

//     id = 4;

//     // 0, 1, 2, 3, 4
//     userTypes = [
//         "General User", 
//         "Driver",
//         "Soup Kitchen Owner",
//         "RDH Owner",
//         "Admin"
//     ];


//     state = {
//         userID: this.id,
//     }

//     render () {

//         return (
//             <>
//                 <NavigationBar></NavigationBar>
//                 <h2>{this.state.userID}</h2>
//                 <OtherProfileInformation userID={this.state.userID}>
//                 </OtherProfileInformation>
//                 <ProfileTable></ProfileTable>
//             </>
//         )
//     }

//     componentDidMount() { 
//         let userID = this.id;
//         // console.log("ayeyeye")
//         // console.log(this.state.userID);
//         if (userID) {
//             this.accountsRepository.getUser(userID)
//             .then(account => this.setState(account[0]));
//         }
//     }

// }

// export default OtherProfile;
