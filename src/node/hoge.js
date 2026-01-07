const express = require('express');
const app = express();
const port = 5436;


app.get('/', (req, res) => {
  res.send('Hello, World! 2026/01/05 16:27 :5436でブラウザ開けた！！');
});


app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});