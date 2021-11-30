import { Route } from "react-router";
import { Redirect } from "react-router";

export const PrivateRoute = ({component: Component, ...rest}) => {
    const loggedInUser = localStorage.getItem("adminLogin");
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            loggedInUser=="true" ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};