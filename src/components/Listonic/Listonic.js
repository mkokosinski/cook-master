import React from 'react'

import styles from './Listonic.module.scss'

   

const Listonic = ({closeListonic, title, ingredients}) => {
    const api = 'https://app.listonic.com/widget.html#!/widget/'
    const site= 'https:%252f%252fcook-master.netlify.com%252fprzepis%252f'
    console.log(ingredients);
    
    const ingredientsNames = ingredients.map(ingr => ingr.name)
    const uri = `${api}${site}${title.replace(/ /g,'-')}/${encodeURI(title)}/${encodeURI(ingredientsNames.join('%3CBR%3E'))}`
    return (
      <div className={styles.container} >
        <button className={styles.closeBtn} onClick={closeListonic}></button>
        <iframe
          src={uri}
          frameBorder="0"
        ></iframe>
      </div>
    )
  }

  export default Listonic

  