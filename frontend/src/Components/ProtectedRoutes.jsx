import { Cart } from "./Cart/Cart";
import { Checkout } from "./Checkout/Checkout";
import Dashboard from "./Dashboard/Dashboard";
import EventPage from "./EventPage/EventPage";
import FarmItemAdder from "./FarmItemAdder/FarmItemAdder";
import FarmPage from "./FarmPage/FarmPage";
import { Feed } from "./Feed/Feed";

export const PROTECTED_ROUTES = [
    {path:'/dashboard', element: <Dashboard/>},
    {path:'/feed', element: <Feed/>},
    {path:'/farms/:id', element: <FarmPage/>},
    {path:'/add', element: <FarmItemAdder/>},
    {path:'/event/:id', element: <EventPage/>},
    {path:'/cart', element: <Cart/>},
    {path:'/checkout', element:<Checkout/>}

]