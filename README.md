# 🧠 TypingMind Clone – AI Chat Interface with Model & Plugin Management

A TypingMind-style AI Chat Interface that supports full **CRUD** functionality for **AI Models** and **Plugins**, along with a mock **chat interface** where users can select models/plugins and simulate AI responses.

## 🚀 Features

### ✅ Models and Plugins CRUD
- **Models**: Add, edit, delete, and list AI models (e.g., GPT-3.5, GPT-4)
- **Plugins**: Manage plugin tools like `webSearch`, `fileReader`, etc.
- Built using **Express** and **MongoDB** with **Mongoose**
- React frontend with clean UI and form validations

### 💬 Chat Interface
- TypingMind-like interface
- Pick a model from dropdown
- Choose one or more plugins
- Type a message and get a **mocked AI response**
- Fully responsive layout

### 🔐 (Optional) Authentication
- Basic email-password login and registration


## 🛠️ Tech Stack

| Frontend   | Backend       | Database |
|------------|---------------|----------|
| React + Axios + TailwindCSS | Node.js + Express | MongoDB + Mongoose |

---

## ⚙️ Setup Instructions

### 📁 Clone the Repo

```bash
git clone https://github.com/pranavkamat7/TypingMindClone.git
cd typingmind-clone

📦 Backend Setup
cd backend
npm install
# Add your MongoDB URI in .env
npm start

🌐 Frontend Setup
cd frontend
npm install
# Set VITE_REACT_APP_BACKEND_BASEURL in .env
npm run dev



