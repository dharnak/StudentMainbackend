import 'dotenv/config'
import { Sequelize } from 'sequelize-typescript'
import { Student } from './models/Student'
import { Department } from './models/Department'

const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres',
  logging: false,
  models: [Student, Department],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // needed for Render external DB
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

export default sequelize
