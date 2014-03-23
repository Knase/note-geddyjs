var Articles = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Article.all(function(err, articles) {
      if (err) {
        throw err;
      }
      self.respondWith(articles, {type:'Article'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , article = geddy.model.Article.create(params);

    if (!article.isValid()) {
      this.respondWith(article);
    }
    else {
      article.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(article, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Article.first(params.id, function(err, article) {
      if (err) {
        throw err;
      }
      if (!article) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(article);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Article.first(params.id, function(err, article) {
      if (err) {
        throw err;
      }
      if (!article) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(article);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Article.first(params.id, function(err, article) {
      if (err) {
        throw err;
      }
      article.updateProperties(params);

      if (!article.isValid()) {
        self.respondWith(article);
      }
      else {
        article.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(article, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Article.first(params.id, function(err, article) {
      if (err) {
        throw err;
      }
      if (!article) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Article.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(article);
        });
      }
    });
  };

};

exports.Articles = Articles;
