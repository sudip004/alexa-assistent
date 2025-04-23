import React, { createContext, useState } from 'react'
import { main } from '../gimini';

export const datacontext = createContext()

const UserContext = ({ children }) => {
  const [speaking, setSpeaking] = useState(false);
  const [prompt, setPrompt] = useState("listening...");
  const [response, setResponse] = useState(false);


  function speak(text) {
    console.log("text", text);

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'hi-IN';
    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
  }
  // function ai call
  async function aiResponse(prompt) {
    let resultdata = await main(prompt);
    let newText = resultdata.split("**") && resultdata.split("*") && resultdata.replace("google", "sudip") &&
      resultdata.replace("GOOGLE", "sudip") && resultdata.replace("Google", "sudip");
    setPrompt(newText);
    speak(newText);
    setResponse(true);

    setTimeout(() => {
      setSpeaking(false);
    }, 5000)

  }
  // my spaceech record
  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();

  recognition.onresult = (e) => {
    let currIndex = e.resultIndex;
    let transcript = e.results[currIndex][0].transcript;
    setPrompt(transcript);
    takeCommand(transcript.toLowerCase());
  }

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("Opening Youtube");

      setPrompt("Opening Youtube");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000)
    } else {
      aiResponse(command);
    }
  }

  const value = {
    recognition,
    setSpeaking,
    speaking,
    prompt,
    setPrompt,
    response,
    setResponse
  }
  return (
    <div>
      <datacontext.Provider value={value}>
        {children}
      </datacontext.Provider>
    </div>
  )
}

export default UserContext