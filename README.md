# LegalEase – AI-Powered Legal Platform

A comprehensive full-stack legal management platform that streamlines legal services by connecting clients with lawyers through an intelligent system featuring case management, automated contract generation, AI-powered legal assistance, and secure video consultations.

## 🚀 Features

### Core Functionality
- **Complete Case Management** – Full CRUD operations for managing legal cases, tracking progress, and maintaining detailed case histories
- **Appointment Scheduling** – Seamless booking system for client-lawyer consultations with calendar integration
- **Blog Management** – Legal content publishing system for educational resources and updates
- **Contract Generation** – Automated legal document creation with customizable templates

### Advanced Features
- **AI Legal Chatbot** – RAG-based assistant powered by LangChain and Ollama DeepSeekR1 model that provides:
  - Real-time PDF document querying
  - Explanation of complex legal terminology
  - Context-aware legal guidance
  
- **Smart Contract Workflow** – Automated contract generation system with:
  - Lawyer approval mechanism
  - Instant PDF download for verified documents
  - Template management
  
- **Secure Payment Processing** – Stripe integration for:
  - Appointment booking payments
  - Transaction history tracking
  - Secure payment gateway
  
- **Real-Time Video Consultations** – WebRTC-based video calling system enabling:
  - High-quality lawyer-client meetings
  - Screen sharing capabilities
  - Activated post successful booking and payment

## 🛠️ Tech Stack

### Frontend
- **React** – Dynamic and responsive user interface
- **Modern UI Libraries** – Enhanced user experience

### Backend
- **Node.js** – Server-side JavaScript runtime
- **Express** – Web application framework

### AI & Machine Learning
- **LangChain** – Framework for developing LLM-powered applications
- **Ollama (Local)** – Local LLM runtime environment
- **DeepSeekR1 Model** – Advanced language model for legal domain expertise running locally via Ollama

### Communication
- **WebRTC** – Real-time peer-to-peer video communication

### Payment
- **Stripe** – Secure payment processing

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Ollama (locally installed for running the DeepSeekR1 model)
- Stripe account (for payment processing)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/legalease.git
cd legalease
```

2. **Install dependencies**

For backend:
```bash
cd backend
npm install
```

For frontend:
```bash
cd frontend
npm install
```

3. **Set up environment variables**

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
OLLAMA_BASE_URL=http://localhost:11434
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. **Set up Ollama locally**

If you haven't installed Ollama yet, download and install it:
- Visit [Ollama's official website](https://ollama.ai/) and download the installer for your OS
- Install Ollama on your local machine

Pull and verify the DeepSeekR1 model:
```bash
# Pull the DeepSeekR1 model
ollama pull deepseek-r1

# Verify the model is installed
ollama list

# Start Ollama server (runs on localhost:11434 by default)
ollama serve
```

**Note:** Keep the Ollama server running in a separate terminal while using the application. The AI chatbot requires Ollama to be active on your local machine.

## 🚀 Running the Application

1. **Start Ollama server** (in a separate terminal)
```bash
ollama serve
```
This will start the Ollama server on `http://localhost:11434`

2. **Start the backend server** (in a new terminal)
```bash
cd backend
npm start
```

3. **Start the frontend development server** (in another terminal)
```bash
cd frontend
npm start
```

4. **Access the application**

Open your browser and navigate to `http://localhost:3000`

**Important:** All three services (Ollama, Backend, and Frontend) must be running simultaneously for the application to work properly.

## 📱 Usage

### For Clients
1. Register/Login to your account
2. Browse available lawyers and their specializations
3. Book an appointment and complete payment via Stripe
4. Use the AI chatbot to get instant legal guidance
5. Upload and query legal documents using the RAG system
6. Join scheduled video consultations with your lawyer
7. Track your cases and download verified contracts

### For Lawyers
1. Register as a legal professional
2. Manage your profile and availability
3. Review and approve generated contracts
4. Accept appointment bookings
5. Conduct video consultations with clients
6. Manage cases and client communications
7. Publish legal blogs and resources

## 🤖 AI Chatbot Features

The RAG-based legal assistant provides:
- Document understanding and summarization
- Legal term explanations in simple language
- Context-aware responses based on uploaded PDFs
- Citation of relevant legal clauses
- 24/7 availability for basic legal queries

## 🔐 Security Features

- JWT-based authentication
- Encrypted payment processing via Stripe
- Secure WebRTC connections
- Protected API endpoints
- Data validation and sanitization

## 📂 Project Structure

```
legalease/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── public/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
└── README.md
```

## 👥 Authors

- Rahul Raut - [GitHub Profile](https://github.com/rahulraut1220)

---

**Note:** This project is for educational/portfolio purposes. Ensure compliance with legal regulations and data privacy laws in your jurisdiction before deploying in production.
