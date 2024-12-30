import { Request, Response } from 'express';
import { Types } from 'mongoose';
import Event from '../models/Event';
import { AuthRequest } from '../middleware/authMiddleware';

//create events
export const createEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = new Event({
      ...req.body,
      authorId: new Types.ObjectId(req.user!.userId)
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//fetch all events
export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find().populate('authorId', 'username email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//register event
export const registerForEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    const userId = new Types.ObjectId(req.user!.userId);
    if (event.attendees.includes(userId)) {
      res.status(400).json({ message: 'Already registered' });
      return;
    }

    event.attendees.push(userId);
    await event.save();
    res.json({ message: 'Registered successfully', attendees: event.attendees.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//cancel registration
export const cancelRegistration = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    const userId = new Types.ObjectId(req.user!.userId);
    const index = event.attendees.indexOf(userId);
    if (index === -1) {
      res.status(400).json({ message: 'Not registered' });
      return;
    }

    event.attendees.splice(index, 1);
    await event.save();
    res.json({ message: 'Registration cancelled', attendees: event.attendees.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update event
export const updateEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, authorId: req.user!.userId },
      { ...req.body },
      { new: true }
    );

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete event
export const deleteEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, authorId: req.user!.userId });

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
