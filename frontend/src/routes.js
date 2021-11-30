import { MyProfile } from './Profile/MyProfile';
// import { OtherProfile } from './Profile/OtherProfile';
import { ProfileEditForm } from './Profile/ProfileEditForm';
import { Login } from './Landing/Login';
import { Register } from './Landing/Register';
import { Donations } from './Donations/Donations';
import { NewDonationForm } from './Donations/NewDonationForm';
import { Donation } from './Donations/DonationDetails';


export const ROUTES = [
    {path: '/', exact: true, component: Login},
    {path: '/donations', component: Donations},
    {path: '/register', component: Register},
    {path: '/profile/edit', component: ProfileEditForm},
    {path: '/myprofile/', component: MyProfile},
    // {path: '/profile/:userID', component: OtherProfile},
    {path: '/newdonation', component: NewDonationForm},
    {path: '/donation/:foodDonationID', component: Donation}

];