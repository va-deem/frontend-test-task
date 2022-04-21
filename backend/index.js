const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5010;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/events', (req, res) => {
  let data = JSON.parse(fs.readFileSync('./data/events.json'));
  res.json({ items: data })
})

app.post('/resources', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/resources.json'));
  const body = req.body;

  let result = [];

  if (body && body.ids) {
    for (const id of body.ids) {
      const found = findById(data, id);

      if (found) {
        result.push(found);
      }
    }
  }

  res.json({ items: result });
})

function findById(array, id) {
  let result;

  for (const item of array) {
    if (item.id === id) {
      result = item;
      break;
    }
  }

  return result;
}

app.listen(port, () => console.log(`Listening http://localhost:${port}!`));