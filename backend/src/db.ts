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
    type: String,
    UserId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true}
})

export const Content = mongoose.model('Content', ContentSchema);
export const LinkModel = mongoose.model('LinkModel', LinkSchema);
