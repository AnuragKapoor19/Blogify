"use client";

import React, { createContext, useContext, useState } from 'react'

const Context = createContext()

export default function ContextProvider({ children }) {
    const [user, setUser] = useState('');
    const [authenticated, setAuthenticated] = useState(false)

    return (
        <Context.Provider value={{ user, setUser, authenticated, setAuthenticated }}>
            {children}
        </Context.Provider>
    )
}

export const useContextState = () => {
    return useContext(Context)
}


