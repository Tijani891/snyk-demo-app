const validator = require('validator');
const express = require('express');
const app = express();
app.get('/greet', (req, res) => {
  const name = req.query.name;
  res.send(`Hello ${name}`);
});
app.get('/exec', (req, res) => {
  const cmd = req.query.cmd;
  const exec = require('child_process').exec;
  exec(cmd, (err, stdout) => {
    res.send(stdout);
  });
});
app.listen(3000, () => console.log('Listening on 3000'));