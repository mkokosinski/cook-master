import React, { useState, useContext } from "react"
import { useFormik } from "formik"
import { navigate, Link } from "gatsby"
import * as Yup from 'yup';

import {
  // signUpWithEmail,
  singUpGoogle,
  // singUpFacebook,
  // isLoggedIn,
  AuthContext,
  signInWithEmail,
} from "../../services/auth"

import GoogleIcon from "../../images/google-icon.svg"
import styles from "./Auth.module.scss"
import { ModalConfirm } from "../Modal/Modal"
import { profile, signUp } from "../../helpers/menuLinks"

import "@fortawesome/fontawesome-free/css/all.min.css"

const validationSchema= Yup.object({
  email: Yup.string().email("Niepoprawny adres email").required("Email jest wymagany"),
  password: Yup.string().required("Hasło jest wymagane")
})

const SignUp = ({location}) => {
  const [isModalActive, setIsModalActive] = useState(false)
  const isLoggedIn = useContext(AuthContext)

  const onSubmitHandler = (values, { setSubmitting }) => {
    const { email, password } = values
    const {from='/'} = location.state
    
    signInWithEmail(email, password).then(res => {
      navigate(from)
    })
  }

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: onSubmitHandler,
    validationSchema
  })

  const signUpGoogleHandler = () => {
    const {from='/'} = location.state

    singUpGoogle().then(res => {
      if (isLoggedIn) {
        navigate(from)
      }
    })
  }

  return (
    <div className={styles.container}>
      <ModalConfirm isActive={isModalActive} />
      <div className={styles.socialButton} onClick={signUpGoogleHandler}>
        <img src={GoogleIcon} alt="Google" /> Logowanie przez Google
      </div>
      {/* TODO: Add Facebook provider log in <div className={styles.socialButton} onClick={singUpFacebook} ><i class="fab fa-facebook"></i>Zarejestruj przez Facebook</div> */}
      <div className={`${styles.formCard}`}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className="field">
            <label className="label" htmlFor="name">
              Adres e-mail
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Adres e-mail"
                name="email"
                {...formik.getFieldProps("email")}
              />
            </div>
            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
          </div>

          <div className="field">
            <label className="label">Hasło</label>
            <div className="control">
              <input
                className="input"
                placeholder="Hasło"
                name="password"
                type="password"
                {...formik.getFieldProps("password")}
              ></input>
            </div>
            {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
          </div>
          <button type="submit" className="button is-success">
            Zaloguj
          </button>
          <Link to={'/app/' + signUp.slug}>Nie mam jeszcze konta</Link>
        </form>
      </div>
    </div>
  )
}
export default SignUp
