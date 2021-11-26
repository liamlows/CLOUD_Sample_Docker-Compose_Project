import { Profile } from './Profile/Profile';
import { ProfileEditForm } from './Profile/ProfileEditForm';
import { Login } from './Landing/Login';
import { Register } from './Landing/Register';


export const ROUTES = [
    {path: '/', exact: true, component: Login},
    // {path: '/donations', component: Donations},
    {path: '/register', component: Register},
    {path: '/profile/edit', component: ProfileEditForm},
    {path: '/profile/:userID', component: Profile},

];