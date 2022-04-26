import { createContext, useState, useMemo, useEffect } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [ email, setEmail ] = useState(null);

    const context = useMemo(()=> ({
        email,
        setEmail
    }), [email]);

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