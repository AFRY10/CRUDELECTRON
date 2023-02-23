const {model, Schema} = require('mongoose');
//req
const taskSchema = new Schema({
    name:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true
    }
})

//
module.exports = model('Task',taskSchema);