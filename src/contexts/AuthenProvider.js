import { createContext, useState, useEffect } from "react";

const AuthenContext = createContext();

function AuthenProvider({ children }) {
    
    const [name, setName] = useState(() => {
        const storedName = localStorage.getItem('name');
        return storedName ? JSON.parse(storedName) : null;
    })

    const [userList, setUserList] = useState(() => {
        const storedUserList = localStorage.getItem('userList');
        return storedUserList ? JSON.parse(storedUserList) : {};
    })

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(()=> {
        if(name) {
            setIsAuthenticated(true);
        }
    }, []);

    const registerUser = (userData) => {
        setUserList((prevUserList) => {
            const updatedUserList = { ...prevUserList, [userData.username]: userData };
            localStorage.setItem('userList', JSON.stringify(updatedUserList));
            return updatedUserList;
        });
    }

    const logout = () => {
        setName(null);
        setIsAuthenticated(false);
        localStorage.removeItem('name');
    }

    const value = {
        name,
        userList,
        registerUser,
        isAuthenticated,
        setIsAuthenticated,
        logout
    };

    return (  
        <AuthenContext.Provider value={value}>
            {children}
        </AuthenContext.Provider>
    );
}

export default AuthenProvider;