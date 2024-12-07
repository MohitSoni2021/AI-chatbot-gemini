import React, { useState } from 'react'
import ChatbotIconComponent from './Components/ChatBot/ChatbotIcon'
import { UniversalPropsProvider } from './ContextHooks/DataContext'
import { CHATBOT_PROMPT } from './Components/ChatBot/PromptFile'

const App = () => {



    const [chatbotHistory, setChatbotHistory] = useState(
      [
        {
          role: "user",
          parts: [
            {text:CHATBOT_PROMPT}
          ]
        },
      ]
    ) 



    const [userDetails, setUserDetails] = useState(
      [
        {
          name: "",
          gender: ""
        }
      ]
    )


    const [theme, setTheme] = useState(
      [
        {
          type: "light"
        }
      ]
    )


    const [messageState, setMessageState] = useState([{loading: false}])
    

    let testdata = "This is default data for the chat"


  return (
    <div>

      <UniversalPropsProvider 
        value={
          {
            userDetails,
            setUserDetails,
            theme,
            setTheme,
            messageState,
            setMessageState,
            chatbotHistory,
            setChatbotHistory,
            testdata
          }
        } 
      >

        <ChatbotIconComponent />

      </UniversalPropsProvider>
    </div>
  )
}

export default App
