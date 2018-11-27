const createApp = require("./lib/app");
const StateContainer = require("./lib/state-container");

const app = createApp(new StateContainer());

const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
