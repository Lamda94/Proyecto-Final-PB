const mongoose = require('mongoose');
const {Schema} = mongoose;

const menssageSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    menssage:{
        type: String,
        required: true,
    },
    date:{
        type: Date, 
        default: Date.now 
    },
});

const menssageModel = mongoose.model("menssage", menssageSchema);

module.exports = { menssageModel };