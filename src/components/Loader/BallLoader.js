import React from 'react'
import Loader from 'react-loaders'

import './Loaders.scss'


const BallLoader = () => {
    return (
        <Loader type="ball-scale-ripple-multiple" active color='rgba(0,0,0,.1)' />
    )
}

export default BallLoader
