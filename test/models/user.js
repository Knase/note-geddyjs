var assert = require('assert')
  , tests
  , User = geddy.model.User;

tests = {

  'after': function (next) {
    // cleanup DB
    User.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var user = User.create({});
    user.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
