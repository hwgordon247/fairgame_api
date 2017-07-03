class UserRoutes {
  constructor(app, userService) {
    this.app = app;
    this.userService = userService;
    this.routes();
  }

  routes() {
    this.app.get('/user', this.getUser.bind(this));
  }

  getUser(req, res) {
    this.userService.getUser(req, res);
  }
}

module.exports = UserRoutes;