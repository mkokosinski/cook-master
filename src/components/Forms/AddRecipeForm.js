import React, { useState } from "react"
import { Formik, Form, Field, FieldArray } from "formik"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { uploadImg, addRecipe } from "../../services/api"
import * as Yup from "yup"

import * as MultistepForm from "../MultistepForm/MultistepForm"
import BallLoader from "../Loader/BallLoader"

import styles from "./Forms.module.scss"

import { FieldWithErrors } from "./FieldWithErrors"
import { toast } from "react-toastify"
import { navigate } from "gatsby-link"
import { recipes } from "../../helpers/menuLinks"

const AddRecipeFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 znaki!")
    .required("To pole jest wymagane"),
  desc: Yup.string()
    .min(3, "Minimum 3 znaki!")
    .required("To pole jest wymagane"),
  steps: Yup.array()
    .of(
      Yup.object().shape({
        desc: Yup.string()
          .min(3, "Minimum 3 znaki!")
          .required("To pole jest wymagane"),
      })
    )
    .min(2, "Podaj przynajmniej 2 kroki!"),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .min(3, "Minimum 3 znaki!")
          .max(400, "Max: 400")
          .required("Wpisz nazwę"),
        quantity: Yup.number()
          .min(1, "Min: 1")
          .max(10000, "Max: 10000")
          .required("Podaj ilość"),
        unit: Yup.string(),
      })
    )
    .min(2, "Podaj przynajmniej 2 kroki!"),
})

const defaults = {
  quantity: 0,
  unit: "g",
}

export const AddRecipeForm = () => {
  const [previewSrc, setPreviewSrc] = useState(null)
  const [imgIsUploading, setImgIsUploading] = useState(false)
  const [uploadedImg, setUploadedImg] = useState(null)

  const onSubmitHandler = async (values, { setSubmitting }) => {
    const { name, desc, steps, ingredients } = values

    try {
      const savedImgPath = uploadedImg ? await saveImg(uploadedImg) : ""
      const recipe = {
        name,
        desc,
        img: savedImgPath,
        steps,
        ingredients,
      }

      addRecipe(recipe).then(res => {
        toast.success(
          "Poprawnie dodano przepis. Po przejściu weryfikacji i optymalizacji pojawi się w serwisie (zwykle do 5 minut)."
        )
        navigate(`/${recipes.slug}`)
      })
    } catch (error) {
      console.error("Add recpie error:", error)
    }

    setSubmitting(false)
  }

  const saveImg = async img => {
    try {
      const uploadedImgPath = await uploadImg(img)
      return uploadedImgPath
    } catch (error) {
      console.error("Image upload error", error)
    }
  }

  const uploadImage = async img => {
    try {
      setImgIsUploading(true)
      const imgPath = URL.createObjectURL(img)
      setPreviewSrc(imgPath)
      setUploadedImg(img)
      setImgIsUploading(false)
    } catch (error) {
      console.error("Image upload error", error)
    }
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formContent}>
        <Formik
          initialValues={{
            name: "",
            desc: "",
            img: "",
            steps: [
              { name: "step1", label: "Krok 1", desc: "", index: 1 },
              { name: "step2", label: "Krok 2", desc: "", index: 2 },
            ],
            ingredients: [
              {
                name: "",
                label: "Składnik 1",
                quantity: defaults.quantity,
                unit: defaults.unit,
              },
              {
                name: "",
                label: "Składnik 2",
                quantity: defaults.quantity,
                unit: defaults.unit,
              },
            ],
          }}
          validationSchema={AddRecipeFormSchema}
          onSubmit={onSubmitHandler}
        >
          {({ values, setFieldValue, errors, touched, handleSubmit }) => (
            <Form>
              <MultistepForm.Form>
                <div className={styles.progressBar}>
                  <MultistepForm.ProgressBar />
                </div>
                <MultistepForm.Step step={1}>
                  <FieldWithErrors
                    type="text"
                    placeholder="Nazwa przepisu"
                    name="name"
                    label="Nazwa"
                  />

                  {/* 
                      TODO: Implement autosize textarea
                      <Field
                        component={Textarea}
                        className="textarea"
                        placeholder="Krótki opis przepisu"
                        name="desc"
                      /> */}

                  <FieldWithErrors
                    component="textarea"
                    className="textarea is-medium"
                    placeholder="Krótki opis przepisu"
                    name="desc"
                    label="Opis"
                  />

                  <div className="file is-fullwidth">
                    <label
                      className={`file-label ${styles.chooseImgContainer}`}
                    >
                      <Field
                        className={`file-input`}
                        accept="image/*"
                        type="file"
                        name="img"
                        value={values.img.path}
                        onChange={event => {
                          uploadImage(event.currentTarget.files[0])
                        }}
                      />
                      {previewSrc && (
                        <div className={styles.previewImg}>
                          {imgIsUploading ? (
                            <BallLoader />
                          ) : (
                            <img src={previewSrc} alt="Uploaded img preview" />
                          )}
                        </div>
                      )}
                      <span className={`${styles.inputFileCta} file-cta`}>
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span>
                          {previewSrc ? `Zmień zdjęcie` : `Dodaj zdjęcie`}
                        </span>
                      </span>
                    </label>
                  </div>
                </MultistepForm.Step>

                <MultistepForm.Step step={2}>
                  <FieldArray name="steps">
                    {({ push, remove }) => (
                      <div>
                        {values.steps.map((step, index) => (
                          <div key={`step_${index}`}>
                            <FieldWithErrors
                              type="text"
                              placeholder="Jaki jest kolejny krok?"
                              name={`steps[${index}].desc`}
                              label={step.label}
                            />
                          </div>
                        ))}

                        <div className={`${styles.buttons} buttons`}>
                          {values.steps.length > 2 && (
                            <button
                              type="button"
                              className={`${styles.buttonRemove} button`}
                              onClick={() => {
                                remove(values.steps.length - 1)
                              }}
                            >
                              {" "}
                              -
                            </button>
                          )}

                          <button
                            type="button"
                            className={`${styles.buttonAdd} button`}
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
                      </div>
                    )}
                  </FieldArray>
                </MultistepForm.Step>

                <MultistepForm.Step step={3}>
                  <FieldArray name="ingredients">
                    {({ push, remove }) => (
                      <>
                        {values.ingredients.map((ingredient, index) => (
                          <React.Fragment key={`ingr_${index}`}>
                            <label className="label" htmlFor="name">
                              {ingredient.label}
                            </label>
                            <div className="field has-addons has-addons-centered">
                              <div className="control is-expanded">
                                <FieldWithErrors
                                  className="input"
                                  type="text"
                                  placeholder="Nazwa"
                                  name={`ingredients[${index}].name`}
                                />
                              </div>
                              <div className="control">
                                <FieldWithErrors
                                  className="input"
                                  type="number"
                                  min="1"
                                  max="9999"
                                  placeholder="Ilość"
                                  name={`ingredients[${index}].quantity`}
                                />
                              </div>
                              <div className="control">
                                <div className="field">
                                  <div className="select">
                                    <Field
                                      as="select"
                                      placeholder="Wybierz jednostkę"
                                      name={`ingredients[${index}].unit`}
                                    >
                                      <option value="g">g</option>
                                      <option value="ml">ml</option>
                                      <option value="szt">szt.</option>
                                      <option value="cup">szklan.</option>
                                      <option value="box">opak.</option>
                                      <option value="spoon">łyżek</option>
                                    </Field>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        ))}
                        <div className={`${styles.buttons} buttons`}>
                          {values.ingredients.length > 2 && (
                            <button
                              type="button"
                              className={`${styles.buttonRemove} button`}
                              onClick={() => {
                                remove(values.ingredients.length - 1)
                              }}
                            >
                              -
                            </button>
                          )}

                          <button
                            type="button"
                            className={`${styles.buttonAdd} button`}
                            onClick={() =>
                              push({
                                name: "",
                                label: `Składnik ${values.ingredients.length +
                                  1}`,
                                quantity: defaults.quantity,
                                unit: defaults.unit,
                                index: values.ingredients.length + 1,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
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
