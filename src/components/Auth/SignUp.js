import React from "react"
import { useFormik } from "formik"
import { navigate } from "gatsby"
import * as Yup from "yup"

import { signUpWithEmail, singUpGoogle, isLoggedIn } from "../../services/auth"

import GoogleIcon from "../../images/google-icon.svg"
import styles from "./Auth.module.scss"
import { profile } from "../../helpers/menuLinks"

import "@fortawesome/fontawesome-free/css/all.min.css"

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Niepoprawny adres email")
    .required("Email jest wymagany"),
  password: Yup.string()
    .min(8, "Hasło musi mieć conajmniej 8 znaków")
    .required("Hasło jest wymagane"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Podane hasła nie pasują")
    .required("Potwierdź hasło! "),
})

const SignUp = ({ sourceLink = profile.slug, location }) => {
  const from = location?.state?.from || "/"

  const onSubmitHandler = (values, { setSubmitting }) => {
    const { email, password } = values
    signUpWithEmail(email, password).then(res => {
      navigate(from)
    })
  }

  const formik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "" },
    onSubmit: onSubmitHandler,
    validationSchema,
  })

  const signUpGoogleHandler = () => {
    singUpGoogle().then(res => {
      navigate(from)
    })
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.socialButton}
        role="none"
        onClick={signUpGoogleHandler}
      >
        <GoogleIcon />
        <span style={{ marginLeft: "5px" }}>Zarejestruj przez Google</span>
      </div>
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
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="field">
            <label className="label" htmlFor="password">
              Hasło
            </label>
            <div className="control">
              <input
                className="input"
                placeholder="Hasło"
                id="password"
                name="password"
                type="password"
                {...formik.getFieldProps("password")}
              ></input>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="field">
            <label className="label" htmlFor="confirmPassword">
              Potwierdź hasło
            </label>
            <div className="control">
              <input
                className="input"
                placeholder="Potwierdź hasło"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                {...formik.getFieldProps("confirmPassword")}
              ></input>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div>{formik.errors.confirmPassword}</div>
            ) : null}
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
