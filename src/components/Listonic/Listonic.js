import React from 'react'

import styles from './Listonic.module.scss'

const Listonic = () => {
    const api = 'https://app.listonic.com/widget.html#!/widget/'
    const uri = `https://www.przepisy.pl/przepis/sledzie-pod-pierzynka2/Śledzie pod pierzynką/filety śledziowe w oleju - 6 sztuka<BR>Sos sa%C5%82atkowy ckowy Knorr - 2 opakowanie<BR>marchewka - 1 sztuka<BR>ziemniaki - 2 sztuka<BR>ALALALALAL - 1 sztuka<BR>ser żółty - 150 gram<BR>ogórki korniszony - 2 sztuka<BR>Majonez Hellmann's Babuni - 200 mililitr<BR>natka pietruszki - 0 unit`
    const encodedUri = encodeURIComponent(uri.replace('%2F', '%252f'));
    
    return (
      <div>
        <iframe
          style={{ height: "300px" }}
          src={`${api}${encodedUri}`}
          frameBorder="0"
        ></iframe>
      </div>
    )
  }

  export default Listonic