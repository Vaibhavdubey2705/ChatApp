# Real-time Chat Application

This is a real-time chat application built using **Node.js**, **Express**, **MongoDB**, and **React**. The application allows users to sign up, log in, create chats, and send real-time messages to other users. The chat history is stored in the database and can be accessed later. The project is currently 70% complete.

## Features

- **User Authentication**: Sign up, log in, and manage users using **JWT (JSON Web Tokens)**.
- **Real-time Messaging**: Send and receive messages in real-time using **Socket.io**.
- **Chat Creation**: Users can create new chats with other registered users.
- **Message History**: Messages are stored and can be retrieved by users at any time.
- **Context Providers**: State management using **React Context API** for authentication and chat data.

## Backend

The backend is powered by **Node.js**, **Express**, and **MongoDB**. The following RESTful routes are available:

### Routes

1. **User Routes (`/api/users`)**
   - **POST /register**: Register a new user.
   - **POST /login**: Log in an existing user.
   - **GET /**: Retrieve all registered users.
   - **GET /:userId**: Find a specific user by ID.

2. **Chat Routes (`/api/chats`)**
   - **POST /**: Create a new chat between users.
   - **GET /:userId**: Get all chats for a specific user.
   - **GET /find/:firstId/:secondId**: Retrieve a specific chat between two users.

3. **Message Routes (`/api/messages`)**
   - **POST /**: Send a new message in a chat.
   - **GET /:chatId**: Retrieve all messages from a specific chat.

### Backend Technologies:
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database to store user data, chats, and messages.
- **JWT**: JSON Web Tokens for user authentication.
- **Socket.io**: Real-time communication between clients and the server.

## Frontend

The frontend is built using **React** and uses the **Context API** for state management. It contains two context providers:

- **authContext**: Manages user authentication (login, registration, and session management).
- **chatContext**: Manages chat creation, chat data, and real-time messages.

### Frontend Structure:

- **AuthContext**:
  - Manages user registration, login, and logout.
  - Persists user data in localStorage.
  - Provides global authentication state.

- **ChatContext**:
  - Manages chat creation and retrieval.
  - Handles real-time message fetching and updates.

### Frontend Technologies:
- **React**: For building interactive user interfaces.
- **Context API**: For global state management.
- **Socket.io**: For real-time messaging.
- **CSS Modules**: For component-based styling.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url/chat-app.git
