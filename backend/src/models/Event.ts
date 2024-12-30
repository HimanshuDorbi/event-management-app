import { Schema, model, Document, Types } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  city: string;
  domain: string;
  authorId: Types.ObjectId;
  attendees: Types.ObjectId[];
}

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  city: { type: String, required: true },
  domain: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  attendees: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
});

const Event = model<IEvent>('Event', eventSchema);

export default Event;
