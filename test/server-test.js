let pry = require('pryjs')
let assert = require('chai').assert
let app = require('../server')
let environment = process.env.NODE_ENV || 'test'
let configuration = require('../knexfile')[environment]
let database = require('knex')(configuration)
let request = require('request')


describe('Server', function(){
  before(function(done) {
    this.port = 3000;
    this.server = app.listen(this.port, function(err, result) {
      if (err) { return done(err); }
      done();
    });
    this.request = request.defaults({baseUrl: 'http://localhost:3000'})
    database.raw(
      'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
      ["Sausage", 999, new Date]
    ).then(() => done())
  })

  after(function(done) {
    database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(() => {
        done()
        this.server.close()
      })
  })

  it('should exist', function(done) {
    assert(app)
    done()
  });

  describe('GET /api/v1/foods', function() {
    it('should return 404 is resource not found', function(done) {
      this.request.get('/api/v1/foods', function(error, response){
        if (error) { done(error) }
        assert.notEqual(response.statusCode, 404)
        done()
      })
    });
  })
})
