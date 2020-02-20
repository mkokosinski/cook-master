import React from "react"

import { FooterMenu } from "./FooterMenu"
import Logo from '../Logo/Logo'

import styles from "./Footer.module.scss"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.img}>
      <Logo template='white' />
      </div>

      <div className={styles.text}>
        ©2019 kuchmistrz.pl Wszystkie prawa zastrzeżone Kopiowanie i
        rozpowszechnianie bez zgody kuchmistrz.pl zabronione
      </div>
      <FooterMenu />
    </footer>
  )
}

export default Footer
