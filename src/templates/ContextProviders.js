import React, { useState, useEffect } from "react"

import { AuthContext, isAuthorized } from "../services/auth"

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn:
      typeof window !== "undefined" && window
        ? localStorage.getItem("user") !== null
        : false,
    user:
      typeof window !== "undefined" && window
        ? { user: localStorage.getItem("user") }
        : {},
  })
  useEffect(() => {
    isAuthorized(setCurrentUser)
  }, [])
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  )
}
