"use client";

import React, { createContext, useContext, useState } from 'react'

const Context = createContext()

export default function ContextProvider({ children }) {
    const [user, setUser] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [search, setsearch] = useState('')
    const [currentPage, setcurrentPage] = useState(1)

    return (
        <Context.Provider value={{ user, setUser, authenticated, setAuthenticated, search, setsearch, currentPage, setcurrentPage }}>
            {children}
        </Context.Provider>
    )
}

export const useContextState = () => {
    return useContext(Context)
}


