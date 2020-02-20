import React, { useState } from "react"
import { useFormik } from "formik"
import { navigate } from "gatsby"
import * as Yup from 'yup';

import {
  signUpWithEmail,
  singUpGoogle,
  // singUpFacebook,
  isLoggedIn,
} from "../../services/auth"

import GoogleIcon from "../../images/google-icon.svg"
import styles from "./Auth.module.scss"
import { ModalConfirm } from "../Modal/Modal"
import { profile } from "../../helpers/menuLinks"

import "@fortawesome/fontawesome-free/css/all.min.css"

const validationSchema= Yup.object({
  email: Yup.string().email("Niepoprawny adres email").required("Email jest wymagany"),
  password: Yup.string().min(8,"Hasło musi mieć conajmniej 8 znaków").required("Hasło jest wymagane"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Podane hasła nie pasują").required("Potwierdź hasło! ")
})

const SignUp = ({ sourceLink = profile.slug }) => {
  //TODO Modal to confirm accounts merge
  // const [isModalActive, setIsModalActive] = useState(false)

  const onSubmitHandler = (values, { setSubmitting }) => {
    const { email, password } = values
    signUpWithEmail(email, password).then(res => {
      navigate("/app/")
    })
  }

  const formik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "" },
    onSubmit: onSubmitHandler,
    validationSchema
  })

  const signUpGoogleHandler = () => {
    singUpGoogle().then(res => {
      console.log(res)
      if (isLoggedIn()) {
        console.log("cool")
        navigate("/app/")
      }
    })
  }

  return (
    <div className={styles.container}>
      {/* <ModalConfirm isActive={isModalActive} /> */}
      <div className={styles.socialButton} onClick={signUpGoogleHandler}>
        <img src={GoogleIcon} alt="Google" /> Zarejestruj przez Google
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

          <div className="field">
            <label className="label">Potwierdź hasło</label>
            <div className="control">
              <input
                className="input"
                placeholder="Potwierdź hasło"
                type="password"
                name="confirmPassword"
                {...formik.getFieldProps("confirmPassword")}
              ></input>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
          </div>

          <button type="submit" className="button is-success">
            Zarejestruj
          </button>
        </form>
      </div>
    </div>
  )
}
export default SignUp
