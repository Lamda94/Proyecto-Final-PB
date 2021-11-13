const mongoose = require('mongoose');
const {Schema} = mongoose;

const menssageSchema = new Schema({
    author:{
        id: Number,
        name: String,
        lastname: String,
        age: Number,
        nickname: String,
        avatar: String,
    },
    text:{
        type: String,
        required: true,
    },
});

const menssageModel = mongoose.model("menssage", menssageSchema);

module.exports = { menssageModel };