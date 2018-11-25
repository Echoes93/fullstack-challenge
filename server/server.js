const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get('/ping', (req, res) => {
  res.send('pong\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
