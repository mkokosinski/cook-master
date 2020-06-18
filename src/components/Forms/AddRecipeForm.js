import React, { useState } from "react"
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { uploadImg, addRecipe } from "../../services/api"
import * as Yup from 'yup';

import * as MultistepForm from "../MultistepForm/MultistepForm"
import BallLoader from "../Loader/BallLoader"

import styles from "./Forms.module.scss"
import { FieldWithErrors } from "./FieldWithErrors";

const AddRecipeFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 znaki!')
    .required('To pole jest wymagane'),
  desc: Yup.string()
    .min(3, 'Minimum 3 znaki!')
    .required('To pole jest wymagane'),
  steps: Yup.array().of(
    Yup.object().shape({
      desc: Yup.string().min(3, 'Minimum 3 znaki!').required('To pole jest wymagane')
    })
  ).min(2, 'Podaj przynajmniej 2 kroki!')
});

export const AddRecipeForm = () => {
  const [previewSrc, setPreviewSrc] = useState(null)
  const [imgIsUploading, setImgIsUploading] = useState(false)

  

  const onSubmitHandler = async (values, { setSubmitting }) => {
    console.log("submit", values)
    const { name, desc, steps, ingredients } = values;
    const recipe = {
      name, desc, img: previewSrc, steps, ingredients
    }
    console.log("Submit:", recipe);

    // const res = await addRecipe(recipe)
    setSubmitting(false)
  }

  const uploadImage = async img => {
    setImgIsUploading(true)
    const uploadedImgPath = await uploadImg(img)
    setPreviewSrc(uploadedImgPath)
    setImgIsUploading(false)
  }

  return (
    <div className="card">
      <div className="card-content">
        <Formik
          initialValues={{
            name: "",
            desc: "",
            img: "",
            steps: [{ name: "step1", label: "Krok 1", desc: '' }, { name: "step2", label: "Krok 2", desc: '' }],
            ingredients: [
              { name: "ingredient", label: "Składnik 1", value: "" },{ name: "ingredient", label: "Składnik 2", value: "" },
            ],
          }}
          validationSchema={AddRecipeFormSchema}
          onSubmit={onSubmitHandler}
        >
          {({ values, setFieldValue, errors, touched, handleSubmit}) => (
            <Form>
              <MultistepForm.Form>
                <MultistepForm.Step step={1}>
                  <div className="field">
                    <FieldWithErrors
                      type="text"
                      placeholder="Nazwa przepisu"
                      name="name"
                      label="Nazwa"
                    />
                  </div>

                  <div className="field">
                    <label className="label">Opis</label>
                    <div className="control">
                      <Field
                        component="textarea"
                        className="textarea"
                        placeholder="Krótki opis przepisu"
                        name="desc"
                      />
                    </div>
                  </div>

                  <div className="file">
                    <label className="file-label">
                      <Field
                        className="file-input"
                        type="file"
                        name="img"
                        value={values.img.path}
                        onChange={event => {
                          uploadImage(event.currentTarget.files[0])
                        }}
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">Dodaj zdjęcie</span>
                      </span>
                    </label>

                    {imgIsUploading && <BallLoader />}

                    {previewSrc && (
                      <div className={styles.previewImg}>
                        <img src={previewSrc} alt="Uploaded img preview" />
                      </div>
                    )}
                  </div>
                </MultistepForm.Step>

                <MultistepForm.Step step={2}>
                  <FieldArray name="steps">
                    {({ push, remove }) => (
                      <div>
                        {values.steps.map((step, index) => (
                          <>
                            <label className="label" htmlFor="name">
                              {step.label}
                            </label>
                            <div className="field is-grouped" key={index}>
                              <div className="control is-expanded">
                                <Field
                                  className="input"
                                  type="text"
                                  placeholder="Jaki jest kolejny krok?"
                                  name={`steps[${index}].desc`}
                                />
                              </div>
                              <ErrorMessage name={`steps[${index}].desc`} />

                              {values.steps.length === index + 1 && index > 1 && (
                                <div className="control">
                                  <button
                                    type="button"
                                    className="button"
                                    onClick={() => {
                                      remove(index)
                                    }}
                                  >
                                    -
                                  </button>
                                </div>
                              )}
                            </div>
                          </>
                        ))}
                        <button
                          type="button"
                          className="button"
                          onClick={() =>
                            push({
                              name: `step${values.steps.length + 1}`,
                              label: `Krok ${values.steps.length + 1}`,
                              value: "",
                            })
                          }
                        >
                          +
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </MultistepForm.Step>

                <MultistepForm.Step step={3}>
                  Składniki:
                  <FieldArray name="ingredients">
                    {({ push, remove }) => (
                      <>
                        {values.ingredients.map((ingredient, index) => (
                          <>
                            <label className="label" htmlFor="name">
                              {ingredient.label}
                            </label>
                            <div className="field is-grouped">
                              <div className="control is-expanded">
                                <input
                                  className="input"
                                  type="text"
                                  placeholder="Wpisz nazwę"
                                  name={`ingredients[${index}].name`}
                                />
                                <input
                                  className="input"
                                  type="text"
                                  placeholder="Podaj ilość"
                                  name={`ingredients[${index}].quantity`}
                                />
                                <input
                                  className="input"
                                  type="text"
                                  placeholder="Wybierz jednostkę"
                                  name={`ingredients[${index}].unit`}
                                />
                              </div>
                              {values.ingredients.length === index + 1 &&
                                index > 1 && (
                                  <div className="control">
                                    <button
                                      type="button"
                                      className="button"
                                      onClick={() => {
                                        remove(index)
                                      }}
                                    >
                                      -
                                    </button>
                                  </div>
                                )}
                            </div>
                          </>
                        ))}
                        <button
                          type="button"
                          className="button"
                          onClick={() =>
                            push({
                              name: `ingredient${values.ingredients.length +
                                1}`,
                              label: `Składnik ${values.ingredients.length +
                                1}`,
                              value: "",
                            })
                          }
                        >
                          +
                        </button>
                      </>
                    )}
                  </FieldArray>
                </MultistepForm.Step>

                <MultistepForm.Buttons handleSubmit={handleSubmit} />
              </MultistepForm.Form>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
