import React from "react"
import { Field, ErrorMessage, useFormikContext, getIn } from "formik"
import cx from "classnames"

// export const FieldWithErrors = ({ type, placeholder, name, label, component, className = "input" }) => {
export const FieldWithErrors = props => {
  const context = useFormikContext()

  const className = props.className || "input"
  const { name, label } = props;

  const hasError = getIn(context.errors, name)
  const isTouched = getIn(context.touched, name)

  const redOutline = hasError && isTouched ? true : false
  const inputClass = cx(className, { "is-danger": redOutline })

  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}

      <div className="control">
        <Field className={inputClass} {...props} />
        <p className="help is-danger">
          <ErrorMessage name={name} />
        </p>
      </div>
    </div>
  )
}
