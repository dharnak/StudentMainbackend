import express from 'express';
import cors from 'cors';
import sequelize from './db';
import studentRoutes from './routes/studentRoutes';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());


app.use('/', studentRoutes);

app.get('/', (_req, res) => {
  res.send('Hi, backend is running in Node with Sequelize');
});

const PORT = 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Connected to DB and models synced');
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('DB sync failed:', err);
});
