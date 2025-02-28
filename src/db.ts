import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {type: String, unique:true},
    password: String
})

export const User = mongoose.model('User', UserSchema);

const ContentSchema = new Schema({
    link: String,
    title: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    UserId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

export const Content = mongoose.model('Content', ContentSchema);
