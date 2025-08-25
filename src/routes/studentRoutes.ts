import express from 'express';
import { Student } from '../models/Student';
import { Department } from '../models/Department';


const router = express.Router();

// POST 31.07.25

router.post('/postData', async (req, res) => {
  try {
    const {
      id,
      firstname,
      lastname,
      address,
      class: studentClass,
      busnumber,
      fees,
      gender,
      departmentId,
    } = req.body;

    // ✅ Check if department exists
    const department = await Department.findByPk(departmentId);
    if (!department) {
      return res.status(400).json({ error: 'Invalid departmentId' });
    }

    // ✅ Create student
    const student = await Student.create({
      id,
      firstname,
      lastname,
      address,
      class: studentClass,
      busnumber,
      fees,
      gender,
      departmentId,
    });

    res.status(201).json({ message: 'Data inserted successfully', student });
  } catch (error: any) {
    console.error('Insert error:', error);
    res.status(500).json({ error: error.message || 'Insert failed' });
  }
});

router.get('/GETstudents', async (_req, res) => {
  try {
    const data = await Student.findAll({
      include: [{ model: Department }],
    });
    res.json(data);
  } catch (error) {
    console.error('Fetch failed:', error);
    res.status(500).json({ error: 'Fetch failed' });
  }
});

router.get('/departments', async (_req, res) => {
  try {
    const departments = await Department.findAll({ attributes: ['id', 'name'] });
    res.json(departments);
  } catch (error) {
    console.error('Dept fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

router.delete('/students/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await Student.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
