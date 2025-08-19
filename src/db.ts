import { Sequelize } from "sequelize-typescript";
import { Student } from "./models/Student";
import { Department } from "./models/Department";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:Dharn@123@localhost:5432/demopost"; 

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  dialectOptions: process.env.DATABASE_URL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
  logging: false,
  models: [Student, Department],
});

export default sequelize;
