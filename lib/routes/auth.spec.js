var request = require('supertest'),
		require = require('really-need');

describe('auth test suite', function() {
	var app =  require('../../index.js');
	
	beforeEach(function(done) {
		//process.env.NODE_ENV = 'test';
		app(6700, function(s) {
			server = s;
			setTimeout(function() {
				done();
			}, 1000);
		});
	});
	
	afterEach(function(done) {
		server.close(done);
	});

	function hasValidToken(res) {
		if (res.status !== 200) throw new Error('Failed to authenticate the user');
		if (!res.body.token) throw new Error('Missing JWT token');
	}
	
	it('provides invalid email error', function testBadEmail(done) {
		request(server)
			.post('/api/auth/login')
			.send({ 'password': 'abc123' })
			.expect(500, { error: 'Invalid email was specified.' }, done);
	});
	
	it('provides invalid password error', function testBadPassword(done) {
		request(server)
			.post('/api/auth/login')
			.send({ 'email': 'abc123' })
			.expect(500, { error: 'Invalid password was specified.' }, done);
	});
	
	it('forbidden on bad password', function testWrongPassword(done) {
		request(server)
			.post('/api/auth/login')
			.send({ 'email': 'stractsimdev@gmail.com', 'password': 'abc123' })
			.expect(403, { error: 'Password does not match for user specified.' }, done);
	});
	
	it('grants token on good credentials', function testGoodCredentials(done) {
		request(server)
			.post('/api/auth/login')
			.send({ 'email': 'stractsimdev@gmail.com', 'password': 'stractsimdev' })
			.expect(hasValidToken)
			.end(done);
	});
});