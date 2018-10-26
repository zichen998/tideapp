let chai = require('chai');
let chaiHttp = require('chai-http');

let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));
describe('products', function (){
    describe('GET /products',  () => {
        it('should return all the products in an array', function(done) {
            chai.request(server)
                .get('/products')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(3);
                    let result = _.map(res.body, (products) => {
                        return { name: products.name,
                            amount: products.amount }
                    });
                    expect(result).to.include( {  name: "Air Jordan 1*Off-White", amount: 1600  } );
                    expect(result).to.include( { name: "Supreme*CDG boxlogo", amount: 1600  } );
                    expect(result).to.include( { name: "Fragment design", amount: 1600  } );

                    done();
                });
        });
    });
    describe('POST /products', function () {
        it('should return confirmation message and update datastore', function(done) {
            let product = {
                paymenttype: 'Direct' ,
                amount: 1600,
                upvotes: 0
            };
            chai.request(server)
                .post('/products')
                .send(product)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('product Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/products')
                .end(function (err, res) {
                    let result = _.map(res.body, (product) => {
                        return {
                            paymenttype: product.paymenttype,
                            amount: product.amount
                        };
                    });
                    expect(result).to.include({paymenttype: 'Direct', amount: 1600});
                    done();
                });
        });
});
    describe('PUT /products/name/vote', () => {
        it('should return a message and the product upvoted by 1', function(done) {
            chai.request(server)
                .put('/products/5bd2e4597c992c4e74424b0e/vote')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message',"product Successfully UpVoted!");
                    expect(res.body.data.upvotes).to.equal(2);
                    done();
                });
        });

    });
});
module.exports = server;