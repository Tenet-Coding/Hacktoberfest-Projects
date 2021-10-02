import React, { useState, useEffect } from 'react'
import SingleColor from './SingleColor'


import Values from 'values.js'

function App() {
  const getColors = ()=> {
    if(sessionStorage.getItem('colors')){
    return  sessionStorage.getItem('colors')
    }
    else{
    sessionStorage.setItem('colors', "#49a6e9")
    }
  }
 const [color, setColor] = useState(getColors);
 const [error, setError] = useState(false);
 const [colors, setColors] = useState([]);
 const [Alert, setAlert] = useState(false);

 useEffect(() => {
  let newColors = new Values(getColors()).all(10);
  console.log(newColors);
    setColor(getColors);
    setColors(newColors)
    
  }, [])
  const handleSubmit = (e)=> {
    e.preventDefault();
    
    try {
      setError(false);
      sessionStorage.setItem('colors', color);
      let newColors = new Values(color).all(10);
      console.log(newColors);
     
      setColors(newColors)
    } catch (error) {
      console.log(error);
      setError(true);
      // setColors([]);
      
    }

  }


 return(
    <>

      <header className="container">
        <div className={`alert-msg ${Alert && "active"}`
        } >Copied To Clipboard</div>
        

        <form  className="form" onSubmit={handleSubmit}>
          <label htmlFor="color"><h3 className ="colorHeader">Color Generator</h3></label>
          
          <input type="text" name="color" id="color"
          className={`${error ? "error" : null}`}
          
        
          onChange= {(e) => setColor((e.target.value))} value={color} />
          <button className="btn">Submit</button>
        </form>
      
      </header>
      <article className="colors">
       {
         colors.map((color, index) => {
           const hexColor = color.hex;
           return(
             <SingleColor key={index} {...color } hexColor = {hexColor} alert_msg = {Alert}
              index = {index} alert = {setAlert}></SingleColor>
           )
         })
       }
      </article>
    </>

 )

}

export default App
