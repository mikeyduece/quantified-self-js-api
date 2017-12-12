const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const Foods = require('./lib/controllers/foods')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'
app.locals.secrets = {

}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

module.exports = app

app.get('/api/v1/foods', Foods.getFoods)
app.get('/api/v1/foods/:id', Foods.getFood)
app.post('/api/v1/foods', Foods.postFood)
app.patch('/api/v1/foods/:id', Foods.patchFood)
app.delete('/api/v1/foods/:id', Foods.deleteFood)

if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(app.locals.title + " is running on " + app.get('port') + ".")
  })
}
