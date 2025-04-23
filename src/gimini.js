const api_Key = 'AIzaSyBMhynFvc5ZNaQiweeaobKGThWMQQSoEVI';


import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(api_Key); 

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); 

export async function main(prompt) {
  

  try {
   
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }], 
      
      generationConfig: { temperature: 0.7, maxOutputTokens: 20, topP: 0.9 },
    });

    // 4. Process the response correctly
    const response = result.response;
    const text = response.text(); 
    return text;
    

  } catch (error) {
    console.error("Error calling Gemini API:", error);
  }
}


// for code review

export async function codeRE(prompt) {
  
  

  try {
   
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${prompt} code debug and find errors solve it and return only correct code and bullets point of issues that's all` }] }], 
      
      generationConfig: { temperature: 0.7, maxOutputTokens: 1000, topP: 0.9 },
    });

    // 4. Process the response correctly
    const response = result.response;
    const text = response.text(); 
    return text;
    

  } catch (error) {
    console.error("Error calling Gemini API:", error);
  }
}









// const ai = new GoogleGenAI({ apiKey: api_Key });

// export async function main(prompt) {
//   const response = await ai.models.generateContent({
//     model: 'gemini-2.0-flash-001',
//     contents: [{ role: 'user', parts: [{ text: prompt }] }],
//     generationConfig: {
//       maxOutputTokens: 5, // very short response
//       temperature: 0.5,
//       topP: 0.8,
//       topK: 40,
//     },
//   });
//   const data = response.text;
//   console.log("data", data);
//   return data;
// }

