import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createSessionMiddleware } from './config/session.js';
import authRoutes from './routes/authRoutes.js';
import validationRoutes from './routes/validationRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const isProd = process.env.NODE_ENV === 'production';

app.use(
  cors({
    origin: isProd ? process.env.CLIENT_ORIGIN || true : ['http://localhost:5173'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(createSessionMiddleware());

app.use('/api', authRoutes);
app.use('/api', validationRoutes);

if (isProd) {
  const dist = path.join(rootDir, 'dist');
  app.use(express.static(dist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(dist, 'index.html'));
  });
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Validify API listening on http://localhost:${PORT}`);
});
