const express = require('express');
const app = express();
app.get('/greet', (req, res) => {
  const name = req.query.name;
  res.send(`Hello ${name}`);
});

app.listen(3000, () => console.log('Listening on 3000'));