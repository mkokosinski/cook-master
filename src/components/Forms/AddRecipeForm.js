import React, { useState } from "react"
import { Formik, useFormik } from "formik"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { uploadImg, addRecipe } from "../../services/api"

import * as MultistepForm from "./MultistepForm"

let stepsCounter = 1;

export const AddRecipeForm = () => {
  const [steps, setSteps] = useState(['Krok 1'])

  const onSubmitHandler = (values, { setSubmitting }) => {
    console.log("submit", formik.values)
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

  const StepInput = ({name}) => {
    return (
      <div className="field">
        <label className="label" htmlFor="name">
          {name}
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Jaki jest kolejny krok?"
            name={name}
            {...formik.getFieldProps(name)}
          />
        </div>
      </div>
    )
  }

  const addStep = () =>{
    setSteps([...steps, 'Krok ' + ++stepsCounter])
  }

  return (
    <div className="card">
      <div className="card-content">
        <form onSubmit={formik.handleSubmit}>
          <MultistepForm.Form>


            <MultistepForm.Step step={1}>
              <div className="field">
                <label className="label" htmlFor="name">
                  Nazwa
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Nazwa przepisu"
                    name="name"
                    {...formik.getFieldProps("name")}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Opis</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Krótki opis przepisu"
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
            </MultistepForm.Step>


            <MultistepForm.Step step={2}>
              {steps.map(step => <StepInput name={step} />)}
              <div className="button" onClick={addStep}>+</div>
            </MultistepForm.Step>



            <MultistepForm.Step step={3}>
              Składniki:
              <div className="field">
                <label className="label" htmlFor="name">
                  Składnik 1
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Nazwa przepisu"
                    name="ingedient1"
                    {...formik.getFieldProps("ingedient1")}
                  />
                </div>
              </div>
            </MultistepForm.Step>


            <MultistepForm.Buttons />
          </MultistepForm.Form>
        </form>
      </div>
    </div>
  )
}
