"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Student_1 = require("./models/Student");
const Department_1 = require("./models/Department");
const sequelize = new sequelize_typescript_1.Sequelize('demopost', 'postgres', 'Dharn@123', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
});
sequelize.addModels([Student_1.Student, Department_1.Department]);
exports.default = sequelize;
