import React from 'react'
import { FaRobot } from 'react-icons/fa'
import './Chatbot.css'
import Markdown from 'markdown-to-jsx'

const ChatbotMessageCardComponent = ({userType, userGender, msg, loader, themeType}) => {

  


  return (
    <div className='relative '>

      <div className={`
      w-fit p-2 rounded-full relative
      flex items-end
      ${  
        (userType == "user")?
        "rounded-br-none ml-auto"
        :
        "rounded-bl-none flex-row-reverse"
      }`}>

        <p className={`
          p-2 rounded-xl text-wrap max-w-80 overflow-x-scroll scrollbar-hidden
          ${
            (userType == "user")?"bg-orange-400":
            "top-0 left-10 bg-gray-400 rounded-bl-none "}
          `}>
              

              <Markdown>
                  {msg}
              </Markdown>

              {
                loader
              }
          </p>


          {
            (userType == "user") ? "" :
            (userGender=="")?
            <FaRobot className={`text-4xl bg-white-400 p-1 min-w-8 rounded-lg ${(themeType=="light")?"text-black":"text-white"}`} />:
            (userGender == "female")? 
            <img src="https://img.freepik.com/premium-vector/people-profile-icon_24877-40756.jpg?ga=GA1.1.1128381972.1732262525&semt=ais_hybrid" width={36} height={36} className='rounded-full'  alt="" />
            :
            <img src="https://img.freepik.com/premium-vector/man-flat-illustration-vector-editable-template_1148251-227.jpg?ga=GA1.1.1128381972.1732262525&semt=ais_hybrid" height={36} width={36}  className='rounded-full' alt="" />
          }

      </div>
      
      

    </div>
  )
}

export default ChatbotMessageCardComponent
