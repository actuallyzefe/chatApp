//import ChatComponent from "../components/ChatComponent";
import MessagesComponent from "../components/MessagesComponent";
import ChatComponent from "../components/ChatComponent";

const Homepage = () => {
  return (
    <div className='normal-page-container'>
      <MessagesComponent/>
      <ChatComponent/>
    </div>
  )
}

export default Homepage;