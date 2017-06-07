class ExampleMiddleware {
  run(req, res, next, word) {
    console.log(word);
    next();
  }
}

module.exports = new ExampleMiddleware();
