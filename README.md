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

Frontend uses *React and Redux*.

Backend uses *Node.js, with Express and Socket.io (to run Ball/number drawing service and broadcast new ball/number to the clients)*.

### Structure

#### Frontend

    .
    ├── package.json
    └── src
        ├── config.js   # Set how the game should be played
        ├── actions
        ├── api         # Logic for handling API calls to the backend
        ├── assets
        ├── components
        └── reducers

#### Backend

    .
    ├── package.json
    ├── server.js
    ├── config          # All server, game and socket configs
    ├── constants       # Constant strings to be used
    ├── routes          # Express routes
    ├── src             # Logic for the APIs and services
    ├── store           # In-memory stores
    └── utils           # Helper functions

### How it works

The Backend server is the Game Master and has two components:

* API - To generate userIds, generate tickets for the users, validate a bingo claim etc.
* Socket Service - Keep on serving the new balls, push to the clients and keep track of them

On the React frontend the user will start getting the new balls/numbers as they come and frontend will automatically mark them in the Tickets. **User can at any time claim Bingo!, which has to be validated by the backend**.

### SELF MARKING vs MANUAL MARKING

In **frontend/src/config.js**, the MANUAL setting is set to **false** by default. If you want users to manually mark the numbers in tickets as the new ball is drawn, change it to **true**

The user in any case has to press **Shout Bingo!** button to validate the claim.

On the backend, the code to rank the player who submits a valid ticket first is already present, but for now I am only allowing to show that the claim was valid or invalid.

## To Do

* **Improved UI** Although the current UI is responsive to an extent and not that bad, there is a lot of scope for improvement
* **Move to MongoDB** Needs persistence. Currently the data is stored in-memory on the backend and I have already setup methods to store them in a multi-node MongoDB cluster at MongoDB Atlas.
* **Add ranking and syncing for multi-player game** The logic is already in place on both backend and frontend, but needs more testing.