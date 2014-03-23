var assert = require('assert')
  , tests
  , Article = geddy.model.Article;

tests = {

  'after': function (next) {
    // cleanup DB
    Article.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var article = Article.create({});
    article.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
