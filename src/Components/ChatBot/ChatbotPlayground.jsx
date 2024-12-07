import React, { useEffect, useRef, useState } from 'react'
import ChatbotMessageCardComponent from './ChatbotMessageCard'
import { IoSend } from 'react-icons/io5'
import { FaRobot } from 'react-icons/fa'
import { ChatbotConversation } from '../../_Chatbot_utils/ChatbotConfiguration'
import { useUniversalProps } from '../../ContextHooks/DataContext'
import { ThreeDots } from 'react-loader-spinner'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import './Chatbot.css'








const ChatbotPlaygroundComponent = ({isChatbothidden}) => { 
  

  //Getting value of the context hook variablels
  const { setUserDetails,chatbotHistory, userDetails, setChatbotHistory, setMessageState, messageState,theme,setTheme } = useUniversalProps()
  
  // creating references and state variables
  const [userInputQuery, setUserInputQuery] = useState()
  const [startingPoint, setStartingPoint] = useState(1)
  const chatAreaRef = useRef(null)


  // Function to change the theme of the chatbot
  const changeChatbotTheme = () => {
    if(theme[0].type == "light"){
      setTheme((prev)=>[{type:"dark"}])
    }else{
      setTheme((prev)=>[{type:"light"}])
    }
  }


  // Function to send user's input to the chatbot 
  const getData =() => {
    let userQueryCopy = userInputQuery;
    setUserInputQuery("")
    setMessageState((prev)=>[{loading:true}])
    setChatbotHistory((prev) => prev.concat([{role:"user", parts:[{text:userInputQuery  }]}]))
    ChatbotConversation(userQueryCopy, setUserInputQuery, setUserDetails, chatbotHistory, setChatbotHistory)
    .then(()=>setMessageState((prev)=>[{loading:false}]))
  }


  // useEffect that will scroll the chats automatically down
  useEffect(() => {      
    chatAreaRef.current?.lastElementChild?.scrollIntoView()
  }, [chatbotHistory, getData]);


  // useEffect to initialize the chatbot with a predefined message
  useEffect(()=>{
    ChatbotConversation("", setUserInputQuery, setUserDetails, chatbotHistory, setChatbotHistory);
  }, [])



  return (
    <div className={`absolute w-96 max-sm:w-[350px] bottom-16 -right-4  max-sm:h-10/12  max-sm:overflow-x-hidden ${isChatbothidden}`}>

      {/* Main chatbot area container */}
      <div className={`border-2 rounded-lg w-fit overflow-hidden  max-sm:w-full 
        ${
          (theme[0].type == 'light')? "border-gray-600 bg-white": "border-green-300 bg-black"
        }
        `}>
          
        <div className={`
          flex gap-3 items-center justify-between p-2 
          ${
            (theme[0].type=="light")?"bg-orange-500  text-white":"bg-green-300 text-black"
          }
          `}>

          
          <div className="flex gap-3 items-center">

            {
              (userDetails[0].gender == "")?<FaRobot className='text-4xl bg-white-400 p-1 rounded-lg' />:
              (userDetails[0].gender == "female")? 
              <img src="https://img.freepik.com/premium-vector/people-profile-icon_24877-40756.jpg?ga=GA1.1.1128381972.1732262525&semt=ais_hybrid" width={36} height={36} className='rounded-full'  alt="" />
              :
              <img src="https://img.freepik.com/premium-vector/man-flat-illustration-vector-editable-template_1148251-227.jpg?ga=GA1.1.1128381972.1732262525&semt=ais_hybrid" height={36} width={36}  className='rounded-full' alt="" />
            }




            

            <div className=''>
              <h1 className='font-bold'>

                {
                  (userDetails[0].gender == "")?"I am Carina-AI":
                  (userDetails[0].gender == "male")?"I am Suraj":"I am Shabina"
                }

              </h1>
              <p className='text-sm'>Your Shopping Assistant</p>
            </div>

          </div>

            <div className='cursor-pointer' onClick={changeChatbotTheme} >
            {
              (theme[0].type == "light")?<MdLightMode className='text-2xl'/>:<MdDarkMode className='text-2xl'/>
            }
            </div>
          
        </div>


        <div className="h-96 p-2  flex-col gap-3 overflow-y-scroll scrollbar-hidden" ref={chatAreaRef}>



          {
            chatbotHistory.map((msg, id)=>{
              return(
                (id>startingPoint)?
                <ChatbotMessageCardComponent 
              key={id} 
              userType={msg.role} 
              userGender={userDetails[0].gender}
              themeType={theme[0].type}
              msg={msg.parts[0].text} />
                :
                ""
              )
            })
          }

          {
            (messageState[0].loading)?
             <ChatbotMessageCardComponent 
              key={"id"} 
              userGender={userDetails[0].gender}
              userType={userDetails[0].gender}
              themeType={theme[0].type}
              loader = {<ThreeDots width={30} height={30} color="#fff"/>}/>
            
            :""
          }

        </div>


      


        <div className={`p-2 border-t-2 ${(theme[0].type=="light")?"border-black":"border-white"}`}>
          <div className={`flex p-1 border-2 rounded-full items-center gap-2 ${(theme[0].type=="light")?"border-black text-black":"border-white text-white"}`}>
            <input type="text" className='bg-transparent border-none outline-none w-full p-1 ' placeholder='Type a message...' 
              value={userInputQuery}
              onChange={e=>{setUserInputQuery(e.target.value); setStartingPoint(2)}}
              onKeyDown={(e)=>{
                if(e.key == "Enter"){
                  getData()  
                  e.preventDefault() 
                }
              }}
            />
            <IoSend  className='text-2xl cursor-pointer'
              onClick={getData}
            
            />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ChatbotPlaygroundComponent
