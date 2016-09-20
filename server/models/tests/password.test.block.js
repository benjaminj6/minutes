let User = require('../user.model');

module.exports = function(should) {

	return function() {
		beforeEach(function(done) {
			User.remove({}, done);
		});

		it('Valid password given for user creation', function(done) {
			User.create({ username: 'benjamin', password: 'password' }, function(err, user) {
				should.equal(err, null);
				user.password.should.equal('password');
				done();
			});
		});

		it('Invalid password -- non-string', function(done) {
			User.create({ username: 'benjamin', password: {} }, function(err, user) {
				err.errors.password.name.should.equal('CastError');
				err.errors.password.message.should.equal('Cast to String failed for value "{}" at path "password"');
				done();
			});
		});
		
		it('Invalid password -- no password', function(done) {
			User.create({ username: 'benjamin', password: undefined }, function(err, user) {
				err.errors.password.name.should.equal('ValidatorError');
				err.errors.password.message.should.equal('Path `password` is required.');
				done();
			});
		});
	}; 
};



