import React, { useState } from "react"
import { Formik, Form, Field, FieldArray } from "formik"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { uploadImg, addRecipe } from "../../services/api"

import * as MultistepForm from "./MultistepForm"
import BallLoader from "../Loader/BallLoader"

import styles from "./Forms.module.scss"

export const AddRecipeForm = () => {
  const [previewSrc, setPreviewSrc] = useState(null)
  const [imgIsUploading, setImgIsUploading] = useState(false)

  const onSubmitHandler = async (values, { setSubmitting }) => {
    console.log("submit", values)
    const { name, desc, steps, ingredients } = values;
    const recipe = {
      name, desc, img: previewSrc, steps, ingredients
    }
      const res = await addRecipe(recipe)
      setSubmitting(false)
  }

  const uploadImage = async img => {
    setImgIsUploading(true)
    const uploadedImgPath = await uploadImg(img)
    console.log(uploadedImgPath)
    setImgIsUploading(false)
    setPreviewSrc(uploadedImgPath)
  }

  return (
    <div className="card">
      <div className="card-content">
        <Formik
          initialValues={{
            name: "",
            desc: "",
            img: "",
            steps: [{ name: "step1", label: "Krok 1", value: "" }],
            ingredients: [
              { name: "ingredient", label: "Składnik 1", value: "" },
            ],
          }}
          onSubmit={onSubmitHandler}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <MultistepForm.Form>
                <MultistepForm.Step step={1}>
                  <div className="field">
                    <label className="label" htmlFor="name">
                      Nazwa
                    </label>
                    <div className="control">
                      <Field
                        className="input"
                        type="text"
                        placeholder="Nazwa przepisu"
                        name="name"
                      />
                    </div>
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
                                  name={`steps[${index}].value`}
                                />
                              </div>
                              {values.steps.length === index + 1 && index > 0 && (
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
                                  placeholder="Nazwa przepisu"
                                  name={`ingredients.${index}.value`}
                                />
                              </div>
                              {values.ingredients.length === index + 1 &&
                                index > 0 && (
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

                <MultistepForm.Buttons />
              </MultistepForm.Form>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
