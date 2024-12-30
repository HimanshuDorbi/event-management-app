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
exports.deleteEvent = exports.updateEvent = exports.cancelRegistration = exports.registerForEvent = exports.getAllEvents = exports.createEvent = void 0;
const mongoose_1 = require("mongoose");
const Event_1 = __importDefault(require("../models/Event"));
//create events
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = new Event_1.default(Object.assign(Object.assign({}, req.body), { authorId: new mongoose_1.Types.ObjectId(req.user.userId) }));
        yield event.save();
        res.status(201).json(event);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createEvent = createEvent;
//fetch all events
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield Event_1.default.find().populate('authorId', 'username email');
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAllEvents = getAllEvents;
//register event
const registerForEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.default.findById(req.params.id);
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
        const userId = new mongoose_1.Types.ObjectId(req.user.userId);
        if (event.attendees.includes(userId)) {
            res.status(400).json({ message: 'Already registered' });
            return;
        }
        event.attendees.push(userId);
        yield event.save();
        res.json({ message: 'Registered successfully', attendees: event.attendees.length });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerForEvent = registerForEvent;
//cancel registration
const cancelRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.default.findById(req.params.id);
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
        const userId = new mongoose_1.Types.ObjectId(req.user.userId);
        const index = event.attendees.indexOf(userId);
        if (index === -1) {
            res.status(400).json({ message: 'Not registered' });
            return;
        }
        event.attendees.splice(index, 1);
        yield event.save();
        res.json({ message: 'Registration cancelled', attendees: event.attendees.length });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.cancelRegistration = cancelRegistration;
// Update event
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.default.findOneAndUpdate({ _id: req.params.id, authorId: req.user.userId }, Object.assign({}, req.body), { new: true });
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
        res.json(event);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateEvent = updateEvent;
// Delete event
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.default.findOneAndDelete({ _id: req.params.id, authorId: req.user.userId });
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
        res.json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteEvent = deleteEvent;
