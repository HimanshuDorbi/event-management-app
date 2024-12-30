import express from 'express';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api', eventRoutes);

export default app;
