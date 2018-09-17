# Bingo Challenge

## Setup

### Backend server

From project root:

> cd backend
>
> npm i
>
> npm run start

### Frontend server

From project root:

> cd frontend
>
> npm i
>
> npm run dev

Do *npm run start* to run with production settings.

Backend/API server will run at port 3000 and Frontend will run on port 8080 by default.

These settings can be changed from config files in respective project structure.

## Approach

Frontend uses *React and redux*.

Backend uses *Node.js, with express and Socket.io (to run Ball/number drawing service)*.

### Structure

#### Frontend

    .
    ├── package.json
    ├── src
        ├── actions
        ├── api         # Logic for handling API calls to the backend
        ├── assets
        ├── components
        └──  reducers

#### Backend

    .
    ├── package.json
    ├── server.js
    ├── config          # All server and socket configs
    ├── constants       # Constant strings to be used
    ├── routes          # Express routes
    ├── src             # Logic for the APIs and services
    ├── store           # In-memory stores
    └── utils           # Helper functions

## To Do

* **Move to MongoDB** Currently the data is stored in-memory on the backend and I have already setup methods to store them in a 3-node MongoDB cluster.
* **Add ranking and syncing for multi-player game** I am half-way through it and the logic is already in place on both backend and frontend