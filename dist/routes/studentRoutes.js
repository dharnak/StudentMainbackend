"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Student_1 = require("../models/Student");
const Department_1 = require("../models/Department");
const router = express_1.default.Router();
// POST 31.07.25
router.post('/postData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield Student_1.Student.create(req.body);
        res.status(201).json({ message: 'Data inserted successfully', student });
    }
    catch (error) {
        console.error('Insert error:', error);
        res.status(500).json({ error: 'Insert failed' });
    }
}));
router.get('/GETstudents', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Student_1.Student.findAll({
            include: [{ model: Department_1.Department }],
        });
        res.json(data);
    }
    catch (error) {
        console.error('Fetch failed:', error);
        res.status(500).json({ error: 'Fetch failed' });
    }
}));
router.get('/departments', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield Department_1.Department.findAll({ attributes: ['id', 'name'] });
        res.json(departments);
    }
    catch (error) {
        console.error('Dept fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch departments' });
    }
}));
router.delete('/students/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedCount = yield Student_1.Student.destroy({ where: { id } });
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    }
    catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Delete failed' });
    }
}));
exports.default = router;
