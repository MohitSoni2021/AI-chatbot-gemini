import React, { useState } from 'react'
import ChatbotPlaygroundComponent from './ChatbotPlayground'
import { useUniversalProps } from '../../ContextHooks/DataContext'
import { FaRobot } from 'react-icons/fa'

const ChatbotIconComponent = () => {

  const { userDetails } = useUniversalProps()
  const [hidechatbot, setHidechatbot] = useState("hidden")

  const toggleChatbotView = () => {
    if(hidechatbot == "hidden"){
      setHidechatbot("")
      console.log("Setting hidechatbot")
    }else{
      setHidechatbot("hidden")
      console.log("Hiding chatbot")
    }
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 bg-red-500 p-2 rounded-full text-white">
        <div className='relative'>
          <ChatbotPlaygroundComponent isChatbothidden={hidechatbot} />

          <div className="" onClick={toggleChatbotView}>

          {
                  (userDetails[0].gender == "")?<FaRobot className='text-4xl bg-white-400 p-1 rounded-lg' />:
                  (userDetails[0].gender == "female")? 
                  <img src="https://img.freepik.com/premium-vector/people-profile-icon_24877-40756.jpg?ga=GA1.1.1128381972.1732262525&semt=ais_hybrid" width={36} height={36} className='rounded-full'  alt="" />
                  :
                  <img src="https://img.freepik.com/premium-vector/man-flat-illustration-vector-editable-template_1148251-227.jpg?ga=GA1.1.1128381972.1732262525&semt=ais_hybrid" height={36} width={36}  className='rounded-full' alt="" />
          }

          </div>
        </div>
      </div>
    </>
  )
}

export default ChatbotIconComponent
