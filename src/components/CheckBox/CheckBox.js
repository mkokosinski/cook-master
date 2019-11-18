import React from 'react'
import PropTypes from 'prop-types'

import './CheckBox.css'

const CheckBox = ({name, checked, disabled, children}) => {
    const inputProps = {name, checked, disabled}
    return (
        <label className="control control-checkbox">
            <div className="checkbox-content">{children}</div> 
            <input type="checkbox" {...inputProps} />
            <div className="control_indicator"></div>
        </label>
    )
}

CheckBox.propTypes = {
    disabled: PropTypes.exact("disabled", ""),
    checked: PropTypes.exact("checked", ""),
    name: PropTypes.string
}


export default CheckBox