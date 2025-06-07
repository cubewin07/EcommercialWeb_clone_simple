import { createContext, useState } from "react";
import {ThemeProvider} from "@emotion/react";
import {CssBaseline} from "@mui/material";
import {createTheme} from '@mui/material/styles';


const ThemeContext = createContext()

function ThemeProviderR({children}) {
    const [mode, setMode] = useState('light');
    const theme = createTheme({
        palette: {
            mode
        }
    });

    const toggleMode =() => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }

    return ( 
        <ThemeContext.Provider value={{mode, toggleMode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>    
        </ThemeContext.Provider>
     );
}
  
export default ThemeProviderR;