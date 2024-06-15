import AuthContext from "./AuthContext";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const initialAuthState = {
    id: "",
    username: "",
    jwtToken: "",
};

if (localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
    } else {
        initialAuthState.id = decodedToken.id;
        initialAuthState.username = decodedToken.username;
        initialAuthState.jwtToken = localStorage.getItem("jwtToken");
        console.log(initialAuthState);
    }
}

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(initialAuthState);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider