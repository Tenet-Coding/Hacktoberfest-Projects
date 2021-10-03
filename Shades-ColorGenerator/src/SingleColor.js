import React, {useEffect, useRef} from 'react';

function SingleColor({rgb, alert, weight, index, hexColor}) {
  const colorContainer = useRef(null);
 useEffect(() => {
   
    const timeout = setTimeout(()=> {
       alert(false)
     }, 1000)
   
   return () => {
    clearTimeout(timeout);
   }
 })

  let bcg = rgb.join(',');
  console.log(bcg);
  console.log(`rgb(${bcg})`)


  return(
    <div className={`singleColor color ${index>=10 && 'color-light'}`} style={{backgroundColor :`rgb(${bcg})`}} >
      <p className="percent-value">{weight}</p>
      <p className="color-value">#{hexColor}</p>
     <p className={`alert ${index>=10 && 'color-light'}`} ref={colorContainer} onClick={()=>{
       alert(true);
      navigator.clipboard.writeText(`#${hexColor}`)
    }}><i className="far fa-copy"></i></p> 
    </div>
  )
}

export default SingleColor;