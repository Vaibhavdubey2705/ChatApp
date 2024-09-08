#Real-time Chat Application
This is a real-time chat application built using Node.js, Express, MongoDB, and React. The application allows users to sign up, log in, and engage in real-time chat with other users. The chat history is stored and can be accessed by users later. The project is still under development and is currently 70% complete.

Features
User Authentication: Sign up, log in, and user management using JWT (JSON Web Tokens).
Real-time Messaging: Send and receive messages in real-time using WebSocket.
Chat Management: Users can create chats and view chats with potential users.
Message History: Messages are stored and can be retrieved by users at any time.
Backend
The backend of this chat application is powered by Node.js, Express, and MongoDB. It includes the following routes:

Routes
User Route (/api/user)

User Registration
User Login
Find a specific user by ID
Find all users
Chat Route (/api/chat)

Create a new chat between users
Get all chats for a user
Message Route (/api/message)

Send a new message in a chat
Get all messages in a chat
Frontend
The frontend is built using React with the help of Context API to manage global state:

authContext: Handles user authentication status, login, and logout.
chatContext: Manages the chat data, including the list of chats and messages.
After a user logs in, they can see their profile and a list of chats with other users. Users can also start new chats and exchange messages in real-time.

Technologies Used
Backend:
Node.js: Server-side runtime.
Express: Web framework for routing.
MongoDB: Database to store users, chats, and messages.
JWT: For user authentication and session management.
Frontend:
React: For building user interfaces.
Context API: For managing global state.
Socket.io: For real-time communication between users.
