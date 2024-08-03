import { createContext, useCallback, useState, useEffect } from "react";
import { baseUrl, postRequest } from "../../utils/services";

//creating our Auth context and exporting it , we have created a context but we still don't have data 
//to share throughout the application 
export const AuthContext = createContext();

//provider component containing our data
export const AuthContextProvider = ({ children }) => {
    //state for if we successfull register a user
    const [user,setUser] = useState(null);
    //state for rendering the error while registering a user(lec 5)
    const [registerError, setRegisterError] = useState(null);
    //also add some loading status here (lec 5)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
      name : "",
      email: "",
      password: "" 
    });
    
    //this state is for rendering the error when registering a user (lect 5, related to services.js)
    //Checking if it's working
    console.log("Userr", user);
   
    useEffect(() => {
      const storedUser = localStorage.getItem("User");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
    
    //Info represents the data that we input through the form, and this is a Arrow function
    const updateRegisterInfo = useCallback((info) =>{
      //we will call this setRegisterInfo right here and update our register infon using this info
      setRegisterInfo( info);
      //now we can pass this function through our provider
    }, []);

    //now we will create a function to register a user (lec 5), we will now perform post request just by calling
    //postRequest from services.js and passing all the necessary things

    const registerUser = useCallback(async(e)=> {
      e.preventDefault();
      setIsRegisterLoading(true);  //it means that registration process is going on
      setRegisterError(null);      //it means initially no error is there
      //the first parameter is url and it will hit our Register API endpoint and the second argument is a JSON
      //object which will be now our body, so right here we will convert login info and register info to adjacent
      //object using json.stringify and pass registerInfo in it
       const response = await postRequest( `${baseUrl}/users/register`, JSON.stringify(registerInfo))
       setIsRegisterLoading(false);
          if(response.error){
            return setRegisterError(response);
          }
          //agr error nhi mila toh user ko local storage mein save krwa diya, the first parameter is the key
          //let it be User and the second one is JSON objevt
          localStorage.setItem("User", JSON.stringify(response));
          setUser(response);
    }, [registerInfo])


    const logoutUser = useCallback(() =>{
      localStorage.removeItem("User");
      setUser(null);
    },[])

    //whatever we will return is a component provided by the AuthContext object
    return <AuthContext.Provider 
      // This value is accessible in child , here we have child as our APP as we have wrapped it inside our AuthContextProvider.
      //we have set the value as an object user so that we can extract multiple values from here , this value will be accessible
      //in child components , child is app and because have contain login, register and chat pages therefore this value
      //can also be accessible in them

      value={{                    //ye saari values child components use kr payenge 
        user,  
        registerInfo, 
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser                      //use in navbar to logout user
      }} >

         {/* in here we are supposed to pass all other components that will be making use of our authcontext data
         and to get those components we'll be getting them through props, so we will be having
         children prop i.e, components that are the child og this particular component */}
         {children}

         {/* now how do we pass data to this child component, for this we we can include some piece of
         state here  */}
    </AuthContext.Provider>
}

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