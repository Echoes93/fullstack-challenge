const express = require("express");
const bodyParser = require("body-parser");
const StateContainer = require("./state-container");
const rootRouter = require("./router");

const createApp = (container) => {
  if (!(container instanceof StateContainer)) {
    throw new TypeError("createApp() requires a StateContainer instance");
  };

  const app = express();
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(StateContainer.withState(container));
  app.use(rootRouter);
  
  return app;
};

module.exports = createApp;
