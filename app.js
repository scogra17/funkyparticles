const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));
app.use(express.static('views'));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.get('/particles', (req, res) => {
  res.render('particles', {title: 'Hey', message: 'Hello there!'})
})

app.get('/charm/:count', (req, res) => {
  let c = req.params.count;
  res.render('particles', {c: c, message: 'Halo'})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})