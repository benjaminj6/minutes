let configureEnvironment = require('../env');
require('chai');

describe('Environment', function() {
  describe('Production Mode', function() {
    it('Should return production vars', function(done) {
      let env = {
        NODE_ENV: 'production',
        PROD_DATABASE_URL: 'production url',
      };
      
      configureEnvironment(env);
      env.PROD_DATABASE_URL.should.equal(env.PROD_DATABASE_URL);
      done();
    });
  });

  describe('Development Mode', function() {
    it('Should return development environment vars', function(done) {
      let env = {};

      configureEnvironment(env);
      env.NODE_ENV.should.equal('development');
      env.DATABASE_URL.should.equal('mongodb://localhost/time-tracker-dev');
      env.PORT.should.equal(5000);
      done();
    });
  });
});