import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../../utils/services";
export const ChatContext = createContext();
import io from "socket.io-client";        //using this io we will create a connection to our server


export const ChatContextProvider = ({children, user}) =>{      //isme children ke alawa jo user hai woh hame milega app.jsx se jo hamne authContext se uthaya hai taaki wahan jo user ki details hain unka use ham yahan kare paye aur useer ki id ko access kr paye

    const [userChats, setUserChats] = useState([]);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setuserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);           //jab bhi ham kisi ki chat pe click krenge toh use currentChat mein daal denge aur woh right side mein chats visible hone lagenegi
    const [messages, setMessages] = useState([]);
    const [ismessagesLoading, setMessagesLoading] = useState(null);
    const [messagesError, setMessagesError] = useState(null);
    
    const [sendTextMessageError, setSendTextMessageError] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null);
    console.log("onlineUsers", onlineUsers);
    

    //to connect client with server using socket
    useEffect(() => {
      const newSocket = io("http://localhost:3000");
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      }
    }, [user]);
    

    //to fire addNewUser event defined in socket index.js
    useEffect(() => {
      if(socket === null) return;
      socket.emit("addNewUser", user?._id)
      socket.on("getOnlineUsers", (res) => {
        setOnlineUsers(res);
      })
    }, [socket])                          //whenever the socket changes that means there was a new connection so we run it again

    //to get users 
    useEffect(() => {
      const getUsers = async () => {
        const response = await getRequest(`${baseUrl}/users`);

        if(response.error)
          return console.log("Error fetching users", response);

        const pChats = response.filter((u) => {
          let isChatCreated = false;

          if(user?._id === u._id) return false;

          if(userChats){
            isChatCreated = userChats?.some((chat)=>{
              return chat.members[0] === u._id || chat.members[1] === u._id
            })
          }

          return !isChatCreated;
        });
        setPotentialChats(pChats);
        
      };
      getUsers();
    }, [userChats]);

    useEffect(() => {
      const getUserChats = async () => {
          if (user?._id) {
              setIsUserChatsLoading(true);
              setuserChatsError(null);
              const response = await getRequest(`${baseUrl}/chats/${user?._id}`);      //chatRoute mein findUserChats ko request bhejenge aur wahan se response aayega 
  
              setIsUserChatsLoading(false);
  
              if (response.error) {
                  return setuserChatsError(response);
              }
  
              setUserChats(response); 
          }
      };
  
      getUserChats(); // You forgot to call the async function
  }, [user]); // Ensure user is correctly passed to the component
  

  useEffect(() => {
    const getMessages = async () => {
        setMessagesLoading(true);
        setMessagesError(null);
        console.log("S", currentChatId)
        const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);      //chatRoute mein findUserChats ko request bhejenge aur wahan se response aayega 
        setMessagesLoading(false);
        if (response.error) {
            return setMessagesError(response);
        }
        setMessages(response);
    };
    getMessages(); 
}, [currentChat]);      //whenever our current chat changes we will be able to show our messages to console


    const sendTextMessage = useCallback(async(textMessage,sender, currentChatId, setTextMessage) => {
       if(!textMessage) return console.log("you must type something...")
       const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
         chatId: currentChatId,
         senderId: sender._id,
         text: textMessage,
      })
    );
    if(response.error) {
          return setSendTextMessageError(response);
    }
    setNewMessage(response)
    setMessages((prev) => [...prev, response])
    setTextMessage("")
    },[])

    const updateCurrentChat = useCallback((chat) =>{
      setCurrentChat(chat);
    },[])

    const createChat = useCallback(async (firstId, secondId) =>{
      const response = await postRequest(
        `${baseUrl}/chats`, 
        JSON.stringify({
          firstId,
          secondId
        })
      );
      if(response.error){
        return console.log("Error Creating chat", response);
      }

      setUserChats((prev) => [...prev, response]);
    }, []);
    return <ChatContext.Provider 
      value = {{
        userChats,                   //user ki chats jis jis se hain
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        ismessagesLoading,
        messagesError,
        messages,
        sendTextMessage,
        onlineUsers
      }}
    >{children}</ChatContext.Provider>
}