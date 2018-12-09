let mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
        size: String,
        name : String,
        id : Number,
        color : String,
        amount: Number,
        upvotes: {type: Number, default: 0},
        url: String
    },
    { collection: 'products' });

module.exports = mongoose.model('Product', ProductSchema);
