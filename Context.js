import React from 'react';


export const AppContext = React.createContext({
    loggedIn: 'no',
    login: ()=>{}
});