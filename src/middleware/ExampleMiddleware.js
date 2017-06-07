class ExampleMiddleware {
  constructor(req, res, next, word) {
    console.log(word);
    next();
  }
}

module.exports = ExampleMiddleware;
