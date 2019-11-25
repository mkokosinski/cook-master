import React from "react"
import { Formik, useFormik } from "formik"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { uploadImg, addRecipe } from "../../services/api"

export const AddRecipeForm = () => {
  const onSubmitHandler = (values, { setSubmitting }) => {
    console.log(formik.values)
    const { name, desc, img } = values
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
    initialValues: { name: "", desc: "", img: "" },
    onSubmit: onSubmitHandler,
  })

  return (
    <div className="card">
      <div className="card-content">
        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="name">
              Nazwa
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Nazwa porady"
                name="name"
                {...formik.getFieldProps("name")}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Textarea"
                name="desc"
                {...formik.getFieldProps("desc")}
              ></textarea>
            </div>
          </div>

          <div className="file">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="img"
                value={formik.values.img.path}
                onChange={event => {
                  formik.setFieldValue("img", event.currentTarget.files[0])
                }}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Dodaj zdjęcie</span>
              </span>
            </label>
          </div>

          <button type="submit" className="button is-success">
            Success
          </button>
        </form>
      </div>
    </div>
  )
}

