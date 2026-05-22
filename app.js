const express = require('express');
const app = express();

app.get('/greet', (req, res) => {
  const name = req.query.name 
    ? String(req.query.name).replace(/[^a-zA-Z0-9 ]/g, '') 
    : 'Guest';
  res.send(`Hello ${name}`);
});

app.listen(3000, () => console.log('Listening on 3000'));