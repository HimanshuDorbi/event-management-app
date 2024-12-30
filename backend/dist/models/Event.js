"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    city: { type: String, required: true },
    domain: { type: String, required: true },
    authorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'User', default: [] },
});
const Event = (0, mongoose_1.model)('Event', eventSchema);
exports.default = Event;
