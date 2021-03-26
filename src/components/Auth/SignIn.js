import React, { useContext } from "react"
import { useFormik } from "formik"
import { navigate, Link } from "gatsby"
import * as Yup from "yup"

import { singUpGoogle, AuthContext, signInWithEmail } from "../../services/auth"

import GoogleIcon from "../../images/google-icon.svg"
import styles from "./Auth.module.scss"
import { signUp } from "../../helpers/menuLinks"

import "@fortawesome/fontawesome-free/css/all.min.css"
import { toast } from "react-toastify"

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Niepoprawny adres email")
    .required("Email jest wymagany"),
  password: Yup.string().required("Hasło jest wymagane"),
})

const SignUp = ({ location }) => {
  const isLoggedIn = useContext(AuthContext)

  const onSubmitHandler = (values, { setSubmitting }) => {
    const { email, password } = values
    const from = location.state !== null ? location.state.from : "/"

    signInWithEmail(email, password)
      .then(res => {
        showSuccessToast(from)
      })
      .catch(err => {
        console.error("error", err)
        showErrorToast(err.message)
      })
  }

  const showErrorToast = message =>
    toast.error("Wystąpił błąd: " + message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    })

  const showSuccessToast = redirect =>
    toast.success("Poprawnie zalogowano", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      onClose: () => {
        navigate(redirect)
      },
    })

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: onSubmitHandler,
    validationSchema,
  })

  const signUpGoogleHandler = () => {
    const { from = "/" } = location.state

    singUpGoogle()
      .then(res => {
        if (isLoggedIn) {
          showSuccessToast(from)
        }
      })
      .catch(err => {
        console.error("error", err)
        showErrorToast(err.message)
      })
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.socialButton}
        onClick={signUpGoogleHandler}
        role="none"
      >
        <img src={GoogleIcon} alt="Google" /> Logowanie przez Google
      </div>
      <div className={`${styles.formCard}`}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className="field">
            <label className="label" htmlFor="email">
              Adres e-mail
            </label>
            <div className="control">
              <input
                id="email"
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
                id="password"
                className="input"
                placeholder="Hasło"
                name="password"
                type="password"
                {...formik.getFieldProps("password")}
              ></input>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit" className="button is-success">
            Zaloguj
          </button>
          <Link to={"/app/" + signUp.slug}>Nie mam jeszcze konta</Link>
        </form>
      </div>
    </div>
  )
}
export default SignUp
