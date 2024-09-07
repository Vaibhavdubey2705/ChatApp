import { createContext, useState, useEffect } from "react";
import { baseUrl, getRequest, postRequest } from "../../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({children, user}) =>{      //isme children ke alawa jo user hai woh hame milega app.jsx se jo hamne authContext se uthaya hai taaki wahan jo user ki details hain unka use ham yahan kare paye aur useer ki id ko access kr paye

    const [userChats, setUserChats] = useState([]);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setuserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);

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
        console.log("Potential Chats:", pChats);
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
  
    return <ChatContext.Provider 
      value = {{
        userChats,                   //user ki chats jis jis se hain
        isUserChatsLoading,
        userChatsError,
        potentialChats,
      }}
    >{children}</ChatContext.Provider>
}