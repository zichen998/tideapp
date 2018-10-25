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
});
module.exports = server;