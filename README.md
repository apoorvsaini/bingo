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

Backend/API server will run at port 3000 and Frontend will run on port 8080. These settings can be changed from config file.

## Architecture and Approach

Frontend uses *React and redux*.

Backend uses *Node.js, with express and Socket.io (to run Ball/number drawing service)*.