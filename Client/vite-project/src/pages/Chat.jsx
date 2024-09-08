import { useContext } from "react";
import { ChatContext } from "../components/context/chatContext"
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../components/context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";

const Chat = () => {
    
  const {user} = useContext(AuthContext);
    const {userChats,
      isUserChatsLoading,
      updateCurrentChat
    } = useContext(ChatContext);
    console.log("UserChats", userChats);
  
    return ( 
      <Container>
       <PotentialChats />
       {userChats && userChats.length > 0 ? (
        <Stack direction="horizontal" gap = {4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>              {/*the message-box is a custom styles defined in index.css */}
             {isUserChatsLoading && <p>Loading Chats...</p>}
             {userChats ?. map((chat, index) =>{                    //UserChat ek array of messages hai between two individuals , map ek ek karke line by line chats uthayega aur unki id leke har baar naya div banayega
               return(
                 <div key = {index} onClick={() => updateCurrentChat(chat)}>
                    <UserChat  chat = {chat} user = {user}/>         {/*userChat componenet mein hamne chat bheji aur user bheja current , userChat mein ye as a prop recieve hue aur fir wahan se ye prop bheji hook ke pass jo recipient user search krega database mein aur return krega */}
                 </div>
               )
             })}
          </Stack>        
          <p>ChatBox</p>
        </Stack>
      ) : (
        <p>No Chats Available</p>
      )}
    </Container> 
    );
}
 
export default Chat;