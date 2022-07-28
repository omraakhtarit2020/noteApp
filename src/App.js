import React from 'react'
import MainArea from './MainArea';

const App = () => {
  if(localStorage.getItem("notelist")===undefined){
    localStorage.setItem("notelist","[]");
  }
  return (
    <div className="container mt-5">
     <MainArea/>
    </div>
  )
}

export default App