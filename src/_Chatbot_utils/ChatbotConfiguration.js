import { GoogleGenerativeAI } from '@google/generative-ai'
import { BraketFormatChecker } from './AiResponseDataParse';



const genAI = new GoogleGenerativeAI('AIzaSyBka8vNow5KUCY4h0kz_PaY_NEm4ekBVi4');
  
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};






export const ChatbotConversation = async(userInput, setUserInput, setUserDetails,chatbotHistory, setChatbotHistory) => {

  
    const chatSession = model.startChat({
        generationConfig,
        history: chatbotHistory,
      });

      
      try {
        const result = await chatSession.sendMessage(userInput);
      setUserInput("")
      setChatbotHistory((prev)=>prev.concat([{role:"model", parts:[{text:result.response.text()}]}]))
      
      let filterResult = BraketFormatChecker(result.response.text())
      try {
        if(filterResult!=[]){

        setUserDetails(
            [
                {
                  name: filterResult[0].name,
                  gender: filterResult[1].gender
                }
              ]

        )
        }
      } catch (error) {
        
      }
      } catch (error) {
        console.log()
      }

}