import Dashboard from "./Dashboard/Dashboard";
import { Feed } from "./Feed/Feed";

export const PROTECTED_ROUTES = [
    {path:'/dashboard', element: <Dashboard/>},
    {path:'/feed', element: <Feed/>},
    {path:'/farm/:id', element: <Feed/>},
]