import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({
    sensor: String,
});

export default mongoose.model('wawawaw', dataSchema);