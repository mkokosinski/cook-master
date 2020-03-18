import React, { useState } from "react"
import cx from 'classnames'

import styles from "./RatingStars.module.scss"

const RatingStars = ({ rating }) => {
  const [currentRateHover, setCurrentRateHover] = useState(0)
  const [touchedRate, setTouchedRate] = useState(0)

  const createStars = () => {
    let stars = []
    for (let i = 0; i < 5; i++) {
      const starStyle = cx( {
        'far': i >= currentRateHover,
        'fas': i < currentRateHover,
        [styles.starActive]: i < currentRateHover
      });

      const touchedStar = cx('fas', styles.starSaved, {
        [styles.starActive]: i < currentRateHover
      })

      const style = i < touchedRate && touchedRate > currentRateHover ? touchedStar : starStyle;

      stars.push(
        <i
          key={i}
          className={`${style} ${styles.star} fa-star`}
          onMouseEnter={() => setCurrentRateHover(i+1)}
          onClick={() => setTouchedRate(i+1)}
          onMouseLeave={() => setCurrentRateHover(touchedRate)}
        ></i>
      )
    }
    return stars
  }

  return (
    <div>
      {createStars()}
      {currentRateHover}
      {/*             
            <i data-id={1} key={1} className="fas fa-star-half-alt"></i>
            <i data-id={1} key={1} className="fas fa-star"></i> */}
    </div>
  )
}

export default RatingStars
