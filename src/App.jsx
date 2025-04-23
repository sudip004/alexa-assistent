import React, { useContext } from 'react'
import "./App.css"
import va from "./assets/ai.png"
import { FaMicrophoneAlt } from "react-icons/fa";
import { datacontext } from './context/UserContext';
import speekingImg from "./assets/speak.gif"
import aires from "./assets/aiVoice.gif";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// work on context api


const App = () => {
  const navigate = useNavigate();
  const handleClickreview = () => {
    navigate("/code-review");
  };
  let {recognition,speaking,setSpeaking,prompt,response,setPrompt,setResponse} =useContext(datacontext);


  return (
    <div className="main">
      <button className='btn-review'onClick={()=>handleClickreview()}>Code Review <FaArrowCircleRight/></button>
      <img src={va} alt="" id='shifra'/>
      <span>I'm Alexa,Your Advance Virtual Assistant</span>
      {
        !speaking ? 
        <button onClick={()=>{setResponse(false),setPrompt("listenning..."),recognition.start(),setSpeaking(pre => !pre)}}>Click here <FaMicrophoneAlt/></button> :
        <div className='response'>
          {
            !response ? <img src={speekingImg} alt="" id='speak'/> :
            <img src={aires} alt="" id='aires'/>
          }
          <p>{prompt}</p>
        </div>
      }
    </div>
  )
}

export default App