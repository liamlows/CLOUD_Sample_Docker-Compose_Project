import { createContext, useState, useMemo, useEffect } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [ userName, setUsername ] = useState(null);

    const context = useMemo(()=> ({
        userName,
        setUsername
    }), [userName]);

    // useEffect(() => {
    //     if (userName) {
    //         sessionStorage.userName = userName;
    //     } else if (sessionStorage.userName) {
    //         setUserName(sessionStorage.userName);
    //     }
    // }, [ userName ]);

    return <AppContext.Provider value={ context }>
        {children}
    </AppContext.Provider>
};