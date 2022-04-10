import React from "react"
const contextValue=React.createContext({
    token:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
})

export default contextValue