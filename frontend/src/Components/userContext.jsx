import React, { createContext, useEffect, useMemo, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    

    const context = useMemo(() => ({userData, setUserData}), [userData]);
    
    useEffect(() => {
        if (userData) {
            localStorage.setItem("userData", JSON.stringify(userData));
        } else if (localStorage.getItem("userData")) {
            setUserData(JSON.parse(localStorage.getItem("userData")));
        }
    }, [userData]);
    return <UserContext.Provider value={context}>
        {children}
    </UserContext.Provider>
}   