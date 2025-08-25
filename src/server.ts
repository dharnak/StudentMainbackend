import express from 'express';
import cors from 'cors';
import sequelize from './db';
import studentRoutes from './routes/studentRoutes';

const app = express();

// ✅ Allowed origins (local + vercel frontend)
const allowedOrigins = [
  'http://localhost:3000',
  'https://student-main-m4kcfg8ey-dharneeshs-projects-37b47a50.vercel.app',
  'https://studentmainfrontend.onrender.com',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS not allowed for this origin'), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ✅ include OPTIONS
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Handle preflight requests globally
app.options('*', cors());

app.use(express.json());

// ✅ Routes
app.use('/', studentRoutes);

app.get('/', (_req, res) => {
  res.send('Hi, backend is running in Node with Sequelize 🚀');
});

// ✅ Start server after DB sync
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('✅ Connected to DB and models synced');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB sync failed:', err);
  });
