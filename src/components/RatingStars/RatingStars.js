import React, { useState } from "react"

import styles from "./RatingStars.module.scss"

const RatingStars = ({ rating }) => {
  const [currentRateHover, setCurrentRateHover] = useState(1)
  const [touchedRate, setTouchedRate] = useState(0)

  const saveRate = ()=>{
    if (touchedRate === 0) {
        setCurrentRateHover(1)
    }
    else if(touchedRate !== currentRateHover){
        
    }

  }

  const createStars = () => {
    let stars = []
    for (let i = 1; i <= 5; i++) {
      const style = i <= currentRateHover ? "fas" : "far"
      stars.push(
        <i
          key={i}
          className={`${style} ${styles.starActive} fa-star`}
          onMouseEnter={() => setCurrentRateHover(i)}
          onClick={() => setTouchedRate(i)}
          onMouseLeave={(saveRate)}
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
