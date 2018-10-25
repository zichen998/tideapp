let customers = require('../models/customers');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let db = mongoose.connection;

var mongodbUri ='mongodb://productsdb:xiangqianzou988@ds139883.mlab.com:39883/productsdb';
mongoose.connect(mongodbUri);
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ] on mlab.com');
});

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    customers.find(function(err, customers) {
        if (err)
            res.send(err);
        else
            res.send(JSON.stringify(customers,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    customers.find({ "_id" : req.params.id },function(err, customers) {
        if (err)
            res.json({ message: 'Customer NOT Found!', errmsg : err } );
        // return a suitable error message
        else
            res.send(JSON.stringify(customers,null,5));

    });
}


function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}

router.addCustomer = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var customer = new customers();

    customer.name = req.body.name;// the requested value
    customer.email = req.body.email;// the requested value

    customer.save(function(err) {
        if (err)
            res.json({ message: 'customer NOT Added!', errmsg : err } );// return a suitable error message
        else
            res.json({ message: 'customer Successfully Added!', data: customer });// return a suitable success message
    });
}


router.incrementUpvotes = (req, res) => {

    customers.findById(req.params.id, function(err,customer) {
        if (err)
            res.json({ message: 'customer NOT Found!', errmsg : err } );
        else {
            customer.upvotes += 1;
            customer.save(function (err) {
                if (err)
                    res.json({ message: 'customer NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'customer Successfully UpVoted!', data: customer });
            });
        }
    });
}

router.deleteCustomer = (req, res) => {

    customers.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'customer NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'customer Successfully Deleted!'});
    });
}

router.findTotalVotes = (req, res) => {

    customers.find(function(err,customer) {
        if (err)
            res.send(err);
        else
            res.json({ totalvotes : getTotalVotes(customer) });
    });
}

module.exports = router;