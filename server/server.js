const createApp = require("./lib/app");
const StateContainer = require("./lib/state-container");

const app = createApp(new StateContainer());

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Running on PORT: ${PORT}`);
});
