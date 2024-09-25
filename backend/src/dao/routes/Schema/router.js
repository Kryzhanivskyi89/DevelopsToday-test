import { Router } from "express";

export class MyRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {}

  getRouter() {
    return this.router;
  }

  get(path, permissions, ...functions) {
    this.router.get(
      path,
      this.myResponses,
      this.access(permissions),
      functions
    );
  }

  post(path, permissions, ...functions) {
    this.router.post(
      path,
      this.myResponses,
      this.access(permissions),
      functions
    );
  }

  put(path, permissions, ...functions) {
    this.router.put(
      path,
      this.myResponses,
      this.access(permissions),
      functions
    );
  }

  delete(path, permissions, ...functions) {
    this.router.delete(
      path,
      this.myResponses,
      this.access(permissions),
      functions
    );
  }

  myResponses = (req, res, next) => {
    res.success = (response) =>
      res.json({ status: "success", response, code: 200 });
    res.clientError = (error) =>
      res.json({ status: "Client error", error, code: 400 });
    res.authenticationError = (error) =>
      res.json({ status: "Authentication error", error, code: 401 });
    res.authorizationError = (error) =>
      res.json({ status: "Authorization error", error, code: 403 });

    next();
  };
  access(permissions = ["PUBLIC"]) {
    return (req, res, next) => {
      if (permissions.includes("PUBLIC")) return next();
    };
  }
}
