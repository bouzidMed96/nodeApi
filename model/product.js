const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    
    _id:{
        type: Number
    },
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        require:true
    },
    rating:{
        type:Number,
        require:true
    },
    warranty_years:{
        type:Number,
        require:true
    },
    available:{
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model('Product',ProductSchema);