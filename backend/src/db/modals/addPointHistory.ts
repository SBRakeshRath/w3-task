import mongoose from 'mongoose';

const pointHistorySchema = new mongoose.Schema({
  point: {
    type: Number,
    required: true,
    },
    memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
    },
    date: {
    type: Date,
    default: Date.now,
    },
});

const pointHistory = mongoose.model('addPointHistory', pointHistorySchema);

export default pointHistory;