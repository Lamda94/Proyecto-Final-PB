import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({ 
    name: String,
    password: String,  
});

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };