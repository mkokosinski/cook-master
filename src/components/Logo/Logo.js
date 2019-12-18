import React from "react"
import cx from 'classnames'
import PropTypes from 'prop-types'

import styles from "./Logo.module.scss"

const Logo = ({template}) => {
   const strokeLines = cx(styles.strokeLines, {[styles.strokeWhite] : template ==='white'})
   const strokeCutlery = cx(styles.strokeCutlery, {[styles.strokeWhite] : template ==='white'})
   const text = cx(styles.text, {[styles.textWhite] : template ==='white'})
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="185.26382mm"
      height="80.489243mm"
      viewBox="0 0 185.26382 80.489243"
      version="1.1"
      id="svg8"
      className={`${styles.logoContainer} ${styles.strokeWhite}`}
    >
      <title id="title4794">kmlogo</title>
      <defs id="defs2" />
      <g id="layer2" transform="translate(-16.55317,-78.409739)">
        <g id="g4792" transform="translate(0.99482607)">
          <path
            id="path4517"
            d="m 15.558344,102.6955 h 64.307"
            className={strokeLines}
          />
          <path
            id="path4517-5"
            d="m 15.558344,106.3032 h 64.307"
            className={strokeLines}
          />
          <path
            id="path4517-3"
            d="m 136.51517,102.69549 h 64.307"
            className={strokeLines}
          />
          <path
            id="path4517-5-2"
            d="m 136.51517,106.30319 h 64.307"
            className={strokeLines}
          />
        </g>
      </g>
      <g id="layer3" transform="translate(-16.55317,-78.409739)">
        <g id="g4786">
          <path
            id="path4596-2"
            d="m 98.332983,102.68422 0.219447,20.88324 c -0.01776,-0.009 1.410144,2.14192 3.77457,0 0,-5.06178 -0.0438,-20.88324 -0.0438,-20.88324 -0.0151,0.11233 -1.93076,-2.23906 -3.95013,0 z"
            className={strokeCutlery}
          />
          <path
            id="path4656"
            d="m 100.34168,101.64435 -0.0117,-6.065346"
            className={strokeCutlery}
          />
          <ellipse
            cx="100.32906"
            cy="87.159752"
            rx="5.4667029"
            ry="8.3089361"
            id="path4675"
            className={strokeCutlery}
          />
          <path
            id="path4694"
            d="m 100.3263,124.62255 c 0,0 1.06958,-0.036 2.48983,-1.06247 v -20.86842 c -1.25285,-1.21391 -2.50809,-1.2022 -2.48983,-1.18597"
            className={strokeCutlery}
          />
          <path
            id="path4596-2-4"
            d="m 115.96332,102.68805 0.21945,20.88324 c -0.0178,-0.009 1.41014,2.14192 3.77457,0 0,-5.06178 -0.0438,-20.88324 -0.0438,-20.88324 -0.0151,0.11233 -1.93076,-2.23906 -3.95013,0 z"
            className={strokeCutlery}
          />
          <path
            id="path4656-5"
            d="m 117.97202,101.64818 -0.0117,-6.065339"
            className={strokeCutlery}
          />
          <path
            id="path4694-2"
            d="m 117.95664,124.62638 c 0,0 1.06958,-0.036 2.48983,-1.06247 v -20.86842 c -1.25285,-1.21391 -2.50809,-1.2022 -2.48983,-1.18597"
            className={strokeCutlery}
          />
          <g id="g846" transform="translate(0.12447072)">
            <path
              className={strokeCutlery}
              d="m 123.31623,78.801237 0.002,8.362345 c 0,4.588897 -2.44752,8.308934 -5.4667,8.308936 -3.01918,6e-6 -5.46671,-3.720033 -5.46671,-8.308936 l -0.0196,-8.338956"
              id="path4721-8"
            />
            <path
              className={strokeCutlery}
              d="m 116.21559,79.156731 v 9.787363"
              id="path4721-2"
            />
            <path
              className={strokeCutlery}
              d="m 119.46781,79.174295 v 8.561611"
              id="path4721-2-1"
            />
          </g>
        </g>
        <text
          className={text}
          x="36.125629"
          y="168.35715"
          id="text4772"
          transform="scale(1.0604261,0.94301717)"
        >
          <tspan
            id="tspan4770"
            x="36.125629"
            y="168.35715"
            className={text}
          >
            KUCHMISTRZ
          </tspan>
        </text>
      </g>
    </svg>
  )
}

Logo.propTypes = {
   template: PropTypes.oneOf(['color', 'white', 'black']).isRequired
}

export default Logo