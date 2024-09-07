import { createContext, useCallback, useState, useEffect } from "react";
import { baseUrl, postRequest } from "../../utils/services";

//creating our Auth context and exporting it , we have created a context but we still don't have data 
//to share throughout the application 
export const AuthContext = createContext();

//provider component containing our data
export const AuthContextProvider = ({ children }) => {
    const [user,setUser] = useState(null);                                      //state for if we successfull register a user
    const [registerError, setRegisterError] = useState(null);              //state for rendering the error while registering a user(lec 5)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);     //also add some loading status here (lec 5)
    const [registerInfo, setRegisterInfo] = useState({
      name : "",
      email: "",
      password: "" 
    });
    console.log("registerInfo", registerInfo);

    
    const [loginInfo, setLoginInfo] = useState({
      email: "",
      password: "", 
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
   
    useEffect(() => {
      const storedUser = localStorage.getItem("User");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
    console.log("Userr", user);
    console.log("LoginInfo", loginInfo);


    const updateRegisterInfo = useCallback((info) =>{                                    //Info represents the data that we input through the form, and this is a Arrow function
      setRegisterInfo( info);                                                            //we will call this setRegisterInfo right here and update our register infon using this info
    }, []);                                                                               //now we can pass this function through our provider
    

    const updateLoginInfo = useCallback((info) =>{
      setLoginInfo(info);
    }, []);


    //now we will create a function to register a user (lec 5), we will now perform post request just by calling
    //postRequest from services.js and passing all the necessary things
    const registerUser = useCallback(async(e)=> {
      console.log("form submitted")
      e.preventDefault();
      setIsRegisterLoading(true);                //it means that registration process is going on
      setRegisterError(null);                    //it means initially no error is there   
       const response = await postRequest( `${baseUrl}/users/register`, JSON.stringify(registerInfo))                //the first parameter is url and it will hit our Register API endpoint and the second argument is a JSON object which will be now our body, so right here we will convert login info and register info to adjacent object using json.stringify and pass registerInfo in it
       setIsRegisterLoading(false);
          if(response.error){
            return setRegisterError(response);
          }
          localStorage.setItem("User", JSON.stringify(response));                  //agr error nhi mila toh user ko local storage mein save krwa diya, the first parameter is the key let it be User and the second one is JSON objevt
          setUser(response);
    }, [registerInfo])

    const logoutUser = useCallback(() =>{
      localStorage.removeItem("User");
      setUser(null);
    })
     
    const loginUser = useCallback(async(e) =>{
       e.preventDefault();
       setIsLoginLoading(true);
       setLoginError(null);
       const response = await postRequest(
        `${baseUrl}/users/login`, JSON.stringify(loginInfo)
       );
       
       if(response.error)
         return setLoginError(response)
       
       localStorage.setItem("User", JSON.stringify(response))
       setUser(response);
    }, [loginInfo]);

    //whatever we will return is a component provided by the AuthContext object
    return (
      <AuthContext.Provider
        value={{
          user,
          registerInfo,
          updateRegisterInfo,
          registerUser,
          logoutUser,
          registerError,
          isRegisterLoading,
          loginUser,
          loginInfo,
          updateLoginInfo,
          loginError,
          isLoginLoading
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

// Purpose:
// The purpose of the provided JSX file is to create an authentication context using React's Context API.
// It defines a context (AuthContext) and a provider component (AuthContextProvider) responsible for managing authentication-related data.
// The provider component ensures that authentication-related data (such as user information) is made available to all components within the ChatApp that need access to it.

// What's Happening Inside:
// Inside the AuthContextProvider component:
// It initializes a piece of state called user using the useState hook. This state represents the authenticated user and is initialized with default data (in this case, the user's name is set to "Charles").
// It wraps its children components with the AuthContext.Provider component. This provider component passes down the user state as a value to all its descendant components.
// The children prop represents the child components of AuthContextProvider, i.e., the components nested within it.

// Relation to ChatApp:
// In the context of your ChatApp project, you might have authentication-related features such as user login, registration, or authentication status checks.
// The provided JSX file allows you to manage authentication-related data (like the current user's information) in a centralized manner and share it across different parts of your ChatApp where authentication is required.
// For example, you might have components for user profiles, chat rooms, or settings that need access to the authenticated user's information. By wrapping these components with AuthContextProvider, you can ensure they have access to the user state provided by the context.
// This authentication context setup helps in maintaining a consistent authentication state across your ChatApp and simplifies the process of accessing user information throughout the application.