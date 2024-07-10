import ThemeContext from "./ThemeContext";
import { useState } from "react";
import { customThemeBase } from "../theme/customThemeBase.js"

export const ThemeContextProvider = ({ children }) => {

    const [themeContext, setThemeContext] = useState(customThemeBase);

    return (
        <ThemeContext.Provider value={{ themeContext, setThemeContext }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider