//import { useState } from 'react'

//Library  for defining routes
import {Routes, Route, Navigate} from "react-router-dom"

//These are the routes for the Register, Login and Chat
import Chat from "./pages/Chat"
import Register from "./pages/Register"
import Login from "./pages/Login"

//Components
import NavBar from './components/NavBar'
//This is the path to the CSS file within the Bootstrap framework. It specifies the location of the file
// relative to the current project or module.
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap"
import { useContext } from "react"
import { AuthContext } from "./components/context/AuthContext"
import { ChatContextProvider } from "./components/context/chatContext"

function App() {
  const {user} = useContext(AuthContext);
  return (
    //ye prop pass ho jayega chatContext mein, children toh apne aap app ban hi jta hai 
    <ChatContextProvider user = {user}>               
     <NavBar />
     <Container className="text-secondary">
     <Routes>
      <Route path="/" element={user ? <Chat />: <Login />} />
      <Route path="/login" element={user ? <Chat />: <Login />} />
      <Route path="/register" element={user ? <Chat />: <Register />} />
      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
     </Container>
    </ChatContextProvider>

  );
}

export default App
