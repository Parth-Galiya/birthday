import express from 'express';
import { nanoid } from 'nanoid';
import BirthdayExperience from '../models/BirthdayExperience.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const publicId = nanoid(10);
    const experience = await BirthdayExperience.create({
      ...req.body,
      publicId,
    });
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const experience = await BirthdayExperience.findOne({
      publicId: req.params.id,
    });
    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: 'Birthday experience not found.' });
    }
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
