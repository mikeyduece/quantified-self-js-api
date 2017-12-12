const Food = require('../models/food')

function getFoods(request, response, next){
  Food.selectAll()
  .then(function(data){
    if (data.rowCount == 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
}

function getFood(request, response, next) {
  let id = request.params.id
  Food.selectFood(id)
  .then(function(data){
    if (data.rowCount == 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
}

function postFood(request, response, next){
  let params = request.body.food

  Food.createFood(params['name'], params['calories'])
  .then(function(data){
    if (data.rowCount == 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
}

function patchFood(request, response, next) {
  let id = request.params.id
  let params = request.body.food

  if(params['name'] != null){
    Food.updateFoodName(params['name'], id)
    .then(function(data){
      if (data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows)
    })
  } else if(params['calories'] != null){
    Food.updateFoodCalories(params['calories'], id)
    .then(function(data){
      if (data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows)
    })
  }

}

function deleteFood(request, response, next){
  let id = request.params.id
  Food.deleteFood(id)
  .then(function(data){
    if (data.rowCount == 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
}

module.exports = {getFoods, getFood, postFood, deleteFood, patchFood}
