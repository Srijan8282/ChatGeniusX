import './App.css';
import gptLogo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import rocket from './assets/rocket.svg'
import saved from './assets/bookmark.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptImgLogo from './assets/chatgptLogo.svg'
import {sendMsgOpenAI} from './openai'
import { useState,useEffect,useRef } from 'react';


function App() {

  const msgEnd= useRef(null);

  const [input,setInput]=useState("");
  const [messages,setMessages]= useState([
    {
    text:  "hi, I am ChatGeniousX. How can I help you?",
    isBot: true,
    }
  ]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages]);


  const handleSend= async ()=>{
    const text = input;
    setInput('');
    setMessages([...messages,
      {text, isBot: false}
    ])
    const res= await sendMsgOpenAI(text);
    setMessages([...messages,
      {text, isBot:false},
      {text: res, isBot: true}
    ]);
  }
  const handleEnter = async (e)=>{
    if(e.key ==='Enter') await handleSend();

  }
  const handleQuery = async(e)=>{
    const text = e.target.value;
    setMessages([...messages,
      {text, isBot: false}
    ])
    const res= await sendMsgOpenAI(text);
    setMessages([...messages,
      {text, isBot:false},
      {text: res, isBot: true}
    ]);
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className='upperSide'>
              <div className='upperSideTop'><img src={gptLogo} alt='Logo' className='logo'/><span className='brand'>ChatGeniusX</span>
              <button className='midBtn' onClick={()=>{window.location.reload()}}><img src={addBtn} alt='new chat' className='addBtn'/>New Chat</button>
              <div className='upperSideButton'>
                  <button className='query' onClick={handleQuery} value={"What is Programming ?"}><img src={msgIcon} alt='query'/> What is Programming ? </button>
                  <button className='query' onClick={handleQuery} value={"How to use an API ?"}><img src={msgIcon} alt='query'/> How to use an API ? </button>
              </div>
              </div>
        </div>
        <div className='lowerSide'>
            <div className='listItems'><img src={home} alt='' className='listItemsImg'/>Home</div>
            <div className='listItems'><img src={saved} alt='' className='listItemsImg'/>Saved</div>
            <div className='listItems'><img src={rocket} alt='' className='listItemsImg'/>Upgrade to pro</div>
        </div>
      </div>

      <div className='main'>
        <div className='chats'>
          <div className='chat user'>
            <img className='chatImg' src={userIcon} alt=''/><p className='txt'>What is Competitive Programming?</p>
          </div>


          <div className='chat bot'>
            <img className='chatImg' src={gptImgLogo} alt=''/><p className='txt'>Competitive programming is a mind sport where participants solve algorithmic and mathematical problems using computer programming. It involves writing efficient code to solve problems within a stipulated time frame. These competitions test a coder's problem-solving skills, algorithmic knowledge, data structures, and ability to write clean, optimized, and bug-free code.

Participants usually compete individually or in teams, attempting to solve a set of problems of varying difficulty levels within a given time limit. Popular competitive programming platforms like Codeforces, LeetCode, TopCoder, and CodeChef organize contests regularly, providing a platform for programmers to challenge themselves, improve their skills, and sometimes even win prizes or recognition.</p>
          </div>
          {messages.map((message,i)=>
            <div key={i} className={message.isBot?'chat bot':"chat"}>
              <img className='chatImg' src={message.isBot? gptImgLogo:userIcon} alt=''/><p className='txt'>{message.text}</p>
            </div>
          )}
          <div ref={msgEnd}/>
        </div>

        <div className='chatFooter'>
          <div className='inp'>
            <input type='text' placeholder='Send a message...' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/> <button className='send' onClick={handleSend}><img src={sendBtn} alt='send'></img></button>
          </div>
        </div>
        <p className='lastText'> ChatGeniusX may produce incorrect informations about people, places, or facts. ChatGeniusX September 23 Version</p>
      </div>
      
    </div>
  );
}

export default App;

