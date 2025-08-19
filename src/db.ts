import { Sequelize } from 'sequelize-typescript';
import { Student } from './models/Student';
import { Department } from './models/Department';

const sequelize = new Sequelize('demopost', 'postgres', 'Dharn@123', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

sequelize.addModels([Student, Department]);

export default sequelize;
