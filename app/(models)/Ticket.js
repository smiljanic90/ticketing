import mongoose, { Schema } from 'mongoose';

mongoose.connect(
  'mongodb+srv://admin:2Tmo9apALKal9Dzm@cluster0.jfozfvm.mongodb.net/TicketDB'
);
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

export default Ticket;
