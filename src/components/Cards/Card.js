import React, {useState} from 'react'
import PropTypes from 'prop-types'
import './Card.scss'

export const CardType = {
    jumbo: 'jumbo', twoSide: 'twoSide', min: 'min'
}

const Card = ({ type, title, img, content, link }) => {
    const [isMouseOver, setIsMouseOver] = useState('')
    const onMouseOver = () => {
        setIsMouseOver('is-mouse-over')
    }
    const onMouseLeave = () => 
    {
        setIsMouseOver('')
    }
    return (
        <div className={`card ${type}-card`} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            <h2 className={`${type}-card-title`}> {title}</h2>
            <div className={`${type}-card-img`} style={{backgroundImage: `url(${img})`}}>
            </div>
            <div className={`${type}-card-content ${isMouseOver}`}>
                {content}
            </div>
            <button onClick={()=>console.log(link)} className={`btn ${type}-card-btn  ${isMouseOver}`}>Więcej...</button>
        </div>
    )
}

Card.propTypes = {
    type: PropTypes.oneOf(Object.keys(CardType)).isRequired
}

export default Card
