# Pokédex App

A simple full-stack Pokémon tracking app with basic CRUD operations.

## 🧩 Tech Stack

- **Frontend:** React, Vite, Redux
- **Backend:** Node.js, Express
- **State Management:** Redux
- **Dev Tools:** Concurrently, Nodemon

## 📦 Folder Structure

pokedex-app/
├── pokedex-frontend/ # React frontend
├── pokedex-backend/ # Node + Express backend
└── package.json # Root with concurrent dev script


## 🚀 Getting Started

### 1. Clone the repo

git clone "https://github.com/code-here7/PokemonPokedex.git"
cd pokedex-app

### 2. Install dependencies

# Install root dependencies
npm install

# Install frontend
cd pokedex-frontend
npm install

# Install backend
cd ../pokedex-backend
npm install


### 3. Run the app

# From root folder
npm run dev
Frontend runs at: http://localhost:5173/
Backend runs at: http://localhost:1111/


## ✅ Notes

- API does not persist data — all data is stored in-memory.
- Source data is taken from:  
  `pokedex-backend/data/pokedexData.js`
- All interactions (Add, Edit, Delete, Display) happen through the frontend.


## Author
Yashasviny Verma