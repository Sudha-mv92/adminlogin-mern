import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dataRoutes from './routes/data.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/data', dataRoutes);

mongoose.connect('mongodb://localhost:27017/mernapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
