import AuthContext from "./AuthContext";
import { useState } from "react";

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({
        id: "9f02301a-b82f-4965-b5e0-2760613fd7c0",
        username: null,
        jwtToken: null,
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider