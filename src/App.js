import {motion, AnimatePresence} from 'framer-motion';
import { useState } from 'react';
import './App.css';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
   <div className="App">
    <motion.div 
    transition={{layout: { duration: 1, type:"spring"}}}
    onClick={() => setIsOpen(!isOpen)} 
    style={{borderRadius: "1rem", boxShadow: '0px 10px 30px rgba(0,0,0)'}}  
    className="card">
    <motion.h2 layout="position">Card Animation 🚀</motion.h2>
    <AnimatePresence>
    {isOpen && (
    <motion.div 
    initial={{opacity: 0}} 
    animate={{opacity: 1}} 
    transition={{duration: 1}}
    exit={{ opacity: 0}}
    className="expand"
    layout
    > 
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi maxime asperiores culpa, omnis vel, repellat atque doloribus, quis in est facilis magni. Ut suscipit culpa corrupti similique possimus nulla sit.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, quam.
      </p>
    </motion.div>
   
   
    )}
    </AnimatePresence>
    </motion.div>
    
   </div>
  );
}



export default App;
