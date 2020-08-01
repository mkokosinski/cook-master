import React from "react"

import styles from "./UserProfile.module.scss"
import { signOut, signIn, signUp } from "../../helpers/menuLinks"
import { signOutHandler } from "../Auth/SignOut"
import { Link } from "gatsby"

import Icon from "../../images/userProfile.svg"

export const UserProfile = () => {
  return <div></div>
}

export const UserProfileButton = () => {
  return (
    <div className={styles.userProfileButton}>
      <Icon />
    </div>
  )
}
