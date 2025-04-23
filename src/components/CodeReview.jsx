import React, { useState, useRef, useEffect } from 'react'
import "./CodeReview.css"
import Editor from "@monaco-editor/react";
import { codeRE } from '../gimini';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const CodeReview = () => {
    const navigate = useNavigate();
    // Function to zoom i
    const editorRef = useRef(null);
    const [fontSize, setFontSize] = useState(16);
    const [code, setCode] = useState("// Paste your code here...");
    const [resultdata, setresultdata] = useState(null);
    const [output, setOutput] = useState("");



    const runCode = () => {
        const result = new Function(code)();
        setOutput(result);
        setresultdata(result)
        console.log("result", result);
    }



    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.updateOptions({ fontSize });
    };

    const handleCodeChange = (value, event) => {
        setCode(value);
    };
    const handelClick = async () => {
        const data = await codeRE(code);
        console.log("data", data);
        setresultdata(data);
    }

    const handelBack = () => {
        navigate("/")
    }
    return (
        <div className='code-main'>
            <button onClick={() => handelBack()} className='backkmain'>Back <FaArrowAltCircleLeft /></button>
            <div className='leftSide-box'>
                <h1 className='headdingop'>Code Review Editor</h1>
                <Editor
                    height="100%"
                    width={"100%"}
                    defaultLanguage="javascript"
                    value={code} // controlled value
                    onChange={handleCodeChange} // update code state
                    theme="vs-dark"
                    options={{
                        wordWrap: "on",
                    }}


                    onMount={handleEditorDidMount}
                />

            </div>
            <div className='RightSide-box'>
                {!resultdata ? <h2>Hey Use  AI For Review Your Code...</h2> :
                    <Editor
                        height="100%"
                        width="100%"
                        defaultLanguage="javascript"
                        value={resultdata}
                        theme="vs-dark"
                        options={{
                            wordWrap: "on",
                        }}
                        onMount={(editor, monaco) => {
                            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
                                noSemanticValidation: true,
                                noSyntaxValidation: true,
                            });
                        }}

                    />
                }
            </div>
            <button onClick={() => handelClick()} className='rivew-btn'>REVIEW</button>
            {/* <button onClick={() => runCode()} className='run-btn'>RUN js Code</button> */}
        </div>
    )
}

export default CodeReview