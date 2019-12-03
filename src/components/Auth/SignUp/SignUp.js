import React from "react"
import { useFormik } from "formik"
import "@fortawesome/fontawesome-free/css/all.min.css"
import {signUpWithEmail} from '../../../services/api'

const SignUp = () => {
  const onSubmitHandler = (values, { setSubmitting }) => {
    console.log(formik.values)
    const { email, password } = values
    signUpWithEmail(email, password).then(res => console.log('res',res))
    // uploadImg(img)
    //   .then(uploadedPath => {
    //     const imgPath = uploadedPath
    // const imgPath = 'http://placeimg.com/200/200/any'
    // addRecipe({ name, desc, imgPath }).then(res => {
    //     console.log(res);

    //   setSubmitting(false)
    // })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     setSubmitting(false)
    //   })
  }

  const formik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "" },
    onSubmit: onSubmitHandler,
  })

  return (
    <div className="card">
      <div className="card-content">
        <form onSubmit={formik.handleSubmit}>
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
          </div>

          <button type="submit" className="button is-success">
            Success
          </button>
        </form>
      </div>
    </div>
  )
}
export default SignUp
