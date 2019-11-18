import React from 'react'
import styles from './MobileButton.module.scss'

export const MobileButton = ({children}) => {
    return (
        <button className={`button ${styles.button}`}>
            {children}
        </button>
    )
}