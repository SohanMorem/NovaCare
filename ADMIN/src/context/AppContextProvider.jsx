import { createContext } from "react";


export const AppContext= createContext()

const AppContextProvider=(props)=>{

    const backendurl=import.meta.env.VITE_BACKEND_URL
    const value={
        backendurl,
    }

    return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
    )
}

export default AppContextProvider