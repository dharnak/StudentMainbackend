"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(express_1.default.json());
app.use('/', studentRoutes_1.default);
app.get('/', (_req, res) => {
    res.send('Hi, backend is running in Node with Sequelize');
});
const PORT = process.env.PORT || 5000;
db_1.default.sync({ alter: true }).then(() => {
    console.log('Connected to DB and models synced');
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('DB sync failed:', err);
});
