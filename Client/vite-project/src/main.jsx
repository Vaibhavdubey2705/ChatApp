import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"
import { AuthContextProvider } from './components/context/AuthContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
   
   {/* By wrapping App inside this AuthContextProvider, the App becomes child and it will be inside our props(AuthContext.jsx) */}
   <AuthContextProvider>
     <App />
   </AuthContextProvider>
   </BrowserRouter>
  </React.StrictMode>,
)
