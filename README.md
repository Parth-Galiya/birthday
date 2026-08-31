# BirthdayBloom

A React/Vite client with an Express/Mongoose server for creating personalized birthday experiences.

## Structure

- `server/` — Express API + MongoDB/Mongoose model
- `client/` — React + Vite frontend

## Run

### Server

```bash
cd server
npm install
cp .env.example .env
npm start
```

Make sure MongoDB is running.

### Client

```bash
cd client
npm install
npm run dev
```

The client defaults to `http://localhost:5000/api`. Set `VITE_API_URL` if the API is hosted elsewhere.
"# birthday" 
