import express from 'express';
import cors from 'cors';
import sequelize from './db';
import studentRoutes from './routes/studentRoutes';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/', studentRoutes);   // ✅ correct

app.get('/', (_req, res) => {
  res.send('Hi, backend is running in Node with Sequelize');
});

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
