import cx from "classnames"
import { toast } from "react-toastify"
import styles from "./RatingStars.module.scss"

import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../services/auth"


const RatingStars = ({ rating, saveRate }) => {
  const [currentRateHover, setCurrentRateHover] = useState(rating)
  const [touchedRate, setTouchedRate] = useState(rating)
  const { isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    setCurrentRateHover(rating)
    setTouchedRate(rating)
  }, [rating])

  const showSuccessToast = () =>
    toast.success("Dziękujemy za opinię", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    })

  const onClickHandler = rate => {
    if (rate !== touchedRate) {
      setTouchedRate(rate)
      saveRate(rate)
      showSuccessToast()
    }
  }

  const createStars = () => {
    let stars = []
    for (let i = 0; i < 5; i++) {
      const starStyle = cx({
        far: i >= currentRateHover,
        fas: i < currentRateHover,
        [styles.starActive]: i < currentRateHover,
      })

      const touchedStar = cx("fas", styles.starSaved, {
        [styles.starActive]: i < currentRateHover,
      })

      const style =
        i < touchedRate && touchedRate > currentRateHover
          ? touchedStar
          : starStyle

      stars.push(
        <i
          key={i}
          className={`${style} ${styles.star} fa-star`}
          onMouseEnter={() => setCurrentRateHover(i + 1)}
          onClick={() => onClickHandler(i + 1)}
          onMouseLeave={() => setCurrentRateHover(touchedRate)}
        ></i>
      )
    }
    return stars
  }

  return isLoggedIn === true ? <div>{createStars()}</div> : null
}

export default RatingStars
