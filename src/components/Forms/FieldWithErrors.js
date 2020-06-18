import React from 'react'
import { Field, ErrorMessage } from 'formik';

export const FieldWithErrors = ({ type, placeholder, name, label }) => {
    return (
        <div>
            <label className="label" htmlFor={name}>
                {label}
            </label>
            <div className="control">
                <Field
                    className="input"
                    type={type}
                    placeholder={placeholder}
                    name={name}
                />
                <ErrorMessage name={name} />
            </div>
        </div>
    )
}
