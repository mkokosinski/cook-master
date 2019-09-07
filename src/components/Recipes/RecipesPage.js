import React, { useEffect } from "react"
import { uploadImg } from "../../services/api";

const Przepisy = () => {
    return (
    <div>
      <label htmlFor="ima">
          Wyślij plik
        <input style={{opacity: 0}} type="file" name="ima" id="ima" onChange={
            (e)=>{uploadImg(e).then(res=>{ console.log(res)})}
            } />
      </label>

    </div>
  )
}

export default Przepisy
