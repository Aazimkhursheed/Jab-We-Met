# 🎥 Jab We Met — My Zoom Clone Project

Welcome to **Jab We Met**! This is a full-stack, real-time video conferencing application (similar to Zoom or Google Meet) that I built from scratch to explore WebRTC, real-time web sockets, and multi-user video/audio synchronization.

The application allows users to register, sign in, generate custom meeting codes, adjust their audio/video settings in a pre-meeting lobby, and connect with multiple peers simultaneously in a real-time video call interface with screen sharing and instant chat features.

---

## 🚀 Key Features I Implemented

*   **P2P WebRTC Connections**: Uses WebRTC APIs (`RTCPeerConnection`) with a STUN server to establish direct, low-latency video and audio streams between participants.
*   **Signaling Server via Socket.io**: Handles the signaling process (SDP exchanges and ICE candidate sharing) and synchronizes meeting actions in real time.
*   **Persistent User Accounts**: Secure user registration and login flows, using `bcrypt` to hash passwords and local storage to store session tokens securely.
*   **Dashboard & Meeting History**: A clean home panel where users can join/start meetings and view a record of all their past meetings fetched from MongoDB.
*   **Lobby / Waiting Room**: A setup screen that prompts users for media access, rendering a local video preview so they can check their camera and microphone before jumping into the call.
*   **Screen Sharing**: A one-click toggle to share the user's screen in real time with everyone in the room.
*   **Interactive In-Call Chat**: An overlay chat window where users can exchange instant text messages, alongside a notifications badge counting unread messages.
*   **Responsive MUI Interfaces**: Styled using Material UI (MUI) components combined with custom CSS.

---

## 🛠️ How I Built It (Tech Stack)

### Frontend
*   **React (v18)** for building the component-based UI.
*   **React Router (v6)** for page routing (`/`, `/auth`, `/home`, `/history`, and dynamic room URLs `/:url`).
*   **Socket.io Client** to communicate with the signaling server.
*   **Material-UI (MUI)** & **Emotion** for clean icons and layouts.
*   **Axios** for API requests to the backend server.

### Backend
*   **Node.js & Express** to spin up the API and server.
*   **Socket.io** to manage room connections and WebRTC handshakes.
*   **MongoDB & Mongoose** to persist user registration data and meeting history.
*   **Bcrypt** for hashing passwords.
*   **Dotenv** to safely load configuration files.

---

## 📁 How the Code is Structured

```text
Jab We Met/
├── backend/
│   ├── src/
│   │   ├── controllers/      # App logic (managing sockets and user authentication)
│   │   ├── models/           # Mongoose schemas (User & Meeting databases)
│   │   ├── routes/           # REST API routes (login, register, and history queries)
│   │   └── app.js            # Node/Express backend entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── contexts/         # React Context for global auth state
    │   ├── pages/            # View pages (Landing, Auth, Home, History, and VideoMeet)
    │   ├── utils/            # HOCs (auth guards for protecting paths)
    │   ├── App.js            # Main application router
    │   └── environment.js    # Quick-switch configuration for server URL
    └── package.json
```

---

## ⚙️ How to Run the Project Locally

### 1. Set Up the Backend
1. Go to the backend folder:
   ```bash
   cd backend
   ```
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `backend/` directory:
   ```env
   PORT=8000
   
   ```
4. Spin up the server (runs using `nodemon` for hot-reloads):
   ```bash
   npm run dev
   ```

### 2. Set Up the Frontend
1. Open a new terminal and go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the backend connection. If you're running locally, open [frontend/src/environment.js](file:///c:/Users/hp/OneDrive/Desktop/Jab%20We%20Met/frontend/src/environment.js) and make sure `server` points to your local server port (default is `http://localhost:8000`):
   ```javascript
   let IS_PROD = false;
   const server = IS_PROD ? "https://your-production-url.com" : "http://localhost:8000";
   export default server;
   ```
4. Start the React app:
   ```bash
   npm start
   ```
5. Your browser will automatically open `http://localhost:3000`.

---

## 📡 API Endpoints I Created

All API calls are prefixed with `/api/v1/users`:

*   **POST** `/register` — Register a new account. Needs `{ name, username, password }`.
*   **POST** `/login` — Log in and retrieve a session token. Needs `{ username, password }`.
*   **POST** `/add_to_activity` — Save a meeting code to user history. Needs `{ token, meeting_code }`.
*   **GET** `/get_all_activity` — Retrieve the user's meeting history list. Pass `token` as a query parameter.

---

## 🔄 WebRTC Connection flow

To get video and audio running directly between two browsers without sending the video through my server, I set up this Socket.io-based signaling sequence:

1. **Join room**: A user opens `http://localhost:3000/some-meeting-code`. Their browser emits `join-call` through sockets.
2. **Server Broadcast**: The server informs existing participants that a new user has joined.
3. **SDP Exchange**: Existing clients initiate an `RTCPeerConnection` and emit a WebRTC `offer` through sockets. The new user receives the offer, sets it as their remote description, generates a WebRTC `answer`, and sends it back.
4. **ICE Candidate Exchange**: As both browsers look up their network routes via public STUN servers (`stun.l.google.com`), they exchange `ice` candidates through the socket server.
5. **Streaming**: Once the routes match, the media tracks are connected directly peer-to-peer.

## 👨‍💻 Author

### Aazim Khursheed

- GitHub: https://github.com/Aazimkhursheed
- LinkedIn: https://linkedin.com/in/aazim-khursheed-203304294

---
