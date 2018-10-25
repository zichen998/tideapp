let mongoose = require('mongoose');

let CustomersSchema = new mongoose.Schema({
        name: String,
        email: String,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'customers' });

module.exports = mongoose.model('Customers', CustomersSchema);