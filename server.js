const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const Food = require('./models/foods')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.use(bodyParser.json())

app.get('/', (request, response) => {
  response.send('this is the root page')
})

app.get('/api/v1/foods', (request, response) => {
  Food.all()
    .then((data) => {
      if(data.rowCount == 0){return response.sendStatus(404)}
      response.json(data.rows)
    })
})

app.get('/api/v1/foods/:id', (request, response) => {
  let id = request.params.id
  Food.show(id)
    .then((data) => {
      if (data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows[0])
    })
})

app.post('/api/v1/foods', (request, response) => {
  let name = request.body.food.name
  let calories = request.body.food.calories
  Food.post(name, calories)
    .then((data) => {
      return response.sendStatus(201).json(data.rows[0])
    })
})

app.delete('/api/v1/foods/:id', (request, response) => {
  let id = request.params.id
  Food.delete(id)
    .then(() => {
      return response.sendStatus(204)
    })
})

app.put('/api/v1/foods/:id', (request, response) => {
  let id = request.params.id
  let name = request.body.food.name
  let date = new Date
  let calories = request.body.food.calories
  Food.update(id, name, calories)
    .then((data) => {
      return response.sendStatus(202).json(data.rows[0])
    })
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app
