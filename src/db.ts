import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String
})

export const User = mongoose.model('User', userSchema);

// module.exports = {
//     User
// }