import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
});

export default mongoose.model('tests', userSchema);