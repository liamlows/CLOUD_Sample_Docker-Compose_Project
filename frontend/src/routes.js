import { Profile } from './Profile/Profile';
import { ProfileEditForm } from './Profile/ProfileEditForm';
import { Login } from './Landing/Login';
import { Register } from './Landing/Register';


export const ROUTES = [
    {path: '/', exact: true, component: Login},
    {path: '/register', component: Register},
    {path: '/profiles/edit', component: ProfileEditForm},
    {path: '/profiles/:userID', component: Profile},

];