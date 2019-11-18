import styles from "./Separator.module.scss"
import React from "react"
import PropTypes from "prop-types"
import cx from 'classnames'

export const separatorDirection = {
  vertical: 0,
  horizontal: 1,
}

const Separator = ({ direction, size = "100%", className }) => {
  const style = direction
    ? { width: size, height: "1px"}
    : { width: "1px", height: size }

    const separatorClass = cx(styles.separator, className)
  return <div className={separatorClass} style={style}></div>
}

Separator.propTypes = {
  size: PropTypes.string,
  direction: PropTypes.objectOf(separatorDirection),
}

export default Separator
