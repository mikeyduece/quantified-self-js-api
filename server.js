const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const path = require("path")
const Food = require('./models/foods')
const Meal = require('./models/meals')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://mikeyduece.github.io, https://snayrouz.github.io");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname+'/welcome.html'))
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

app.get('/api/v1/meals', (request, response) => {
  Meal.all()
    .then((data) => {
      console.log(data)
      if(data.rowCount == 0){return response.sendStatus(404)}
      response.json(data.rows)
    })
})

app.get('/api/v1/meals/:meal_id/foods', (request, response) => {
  let meal_id = request.params.meal_id
  Meal.show(meal_id)
    .then((data) => {
      console.log(data)
      if(data.rowCount == 0){return response.sendStatus(404)}
      response.json(data.rows[0])
    })
})

app.post('/api/v1/meals/:meal_id/foods/:id', (request, response) => {
  let mealId = request.params.meal_id
  let id      = request.params.id
  database.raw(`SELECT * FROM foods WHERE id=${id}`)
    .then((data) => {
      if(data.rows.length === 0){
        return response.sendStatus(404)
      }else {
        Meal.post(mealId, id)
          .then((data) => {
            return response.sendStatus(201).json(data.rows[0])
          })
      }
    })
})

app.delete('/api/v1/meals/:meal_id/foods/:id', (request, response) => {
  let mealId = request.params.meal_id
  let id      = request.params.id
  database.raw(`SELECT * FROM foods WHERE id=${id}`)
    .then((data) => {
      if(data.rows.length === 0){
        return response.sendStatus(404)
      }else {
        Meal.delete(mealId, id)
          .then(() => {
            return response.sendStatus(204)
          })
      }
    })
})

  if (!module.parent) {
    app.listen(app.get('port'), () => {
      console.log(`${app.locals.title} is running on ${app.get('port')}.`);
    });
  }

  module.exports = app
