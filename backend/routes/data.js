import express from 'express';
import multer from 'multer';
import Data from '../models/Data.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course, date } = req.body;
        const image = req.file ? req.file.filename : null;
        const newData = new Data({ name, email, mobile, designation, gender, course: JSON.parse(course), date, image });
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await Data.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course, date } = req.body;
        const image = req.file ? req.file.filename : null;
        const updatedData = { name, email, mobile, designation, gender, course: JSON.parse(course), date, image };
        const data = await Data.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Data.findByIdAndDelete(req.params.id);
        res.json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
