import { Route, Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./userContext";

export const ProtectedRoute = () => {
    return (
        <UserContext.Consumer>
        {
            ({user}) => { 
                return user ? <Outlet /> : <Navigate to="/login" />;
            }
        }
        </UserContext.Consumer>
    )
  };
