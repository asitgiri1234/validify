# Validify

Web dashboard to connect a Salesforce org and manage Account validation rules remotely. This repository is a **mock MVP**: the UI and Express API are wired end-to-end; Salesforce OAuth and live APIs are planned for a later milestone.

## Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios, Lucide React  
- **Backend:** Node.js, Express, CORS, dotenv, express-session  

## Quick start

```bash
npm install
npm run dev
```

- **App:** http://localhost:5173  
- **API:** http://localhost:5000 (proxied to `/api` in development)

Copy `.env.example` to `.env` and adjust values as needed.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Runs Vite + API together |
| `npm run build` | Production build for the frontend |
| `npm start` | Serves `dist` + API (set `NODE_ENV=production` and build first) |

## API (mock)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/auth/login` | Mock login success |
| POST | `/api/logout` | Clears session |
| GET | `/api/validation-rules` | List rules |
| POST | `/api/toggle-rule` | Body: `{ "id": number }` |
| POST | `/api/toggle-all` | Body: `{ "active": boolean }` |
| POST | `/api/deploy` | Mock deploy success |

## License

MIT
