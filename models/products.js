let mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
        paymenttype: String,
        name : String,
        id : Number,
        color : String,
        amount: Number,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'productsdb' });

module.exports = mongoose.model('Product', ProductSchema);