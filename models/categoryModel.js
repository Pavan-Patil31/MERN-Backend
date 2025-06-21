const mongoose = require('mongoose')


const catSchema = new mongoose.Schema({
    name:{type:String, require:true},
    image:{type:String},
    createdAt:{type:Date, default:Date.now()},
    createdBy:{type:mongoose.Schema.Types.ObjectId, require:true},
    updatedAt:{type:Date, default:Date.now()},
    updatedBy:{type:mongoose.Schema.Types.ObjectId, require:true}

})

const Category = mongoose.model('Category', catSchema)

module.exports= Category;