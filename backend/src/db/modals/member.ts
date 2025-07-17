import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: String,
});

const Member = mongoose.model('Member', memberSchema);

export default Member;