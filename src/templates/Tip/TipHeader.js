import React from 'react'
import styles from './TipHeader.module.scss'

const Header = ({imgSrc, altImg, title}) =>(
    <div className={styles.header}>
      <img src={imgSrc} alt={altImg}/>
      <h1>{title}</h1>
    </div>
  )

  export default Header