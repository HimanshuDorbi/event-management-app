import { Router } from 'express';
import { createEvent, getAllEvents, registerForEvent, cancelRegistration, updateEvent, deleteEvent } from '../controllers/eventController';
import { verifyToken, AuthRequest } from '../middleware/authMiddleware';

const router = Router();

router.post('/events', verifyToken, (req, res) => createEvent(req as AuthRequest, res));
router.get('/events', getAllEvents);
router.post('/events/:id/register', verifyToken, (req, res) => registerForEvent(req as AuthRequest, res));
router.delete('/events/:id/cancel', verifyToken, (req, res) => cancelRegistration(req as AuthRequest, res));

router.put('/events/:id', verifyToken, (req, res) => updateEvent(req as AuthRequest, res));

router.delete('/events/:id', verifyToken, (req, res) => deleteEvent(req as AuthRequest, res));

export default router;
