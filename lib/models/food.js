const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function selectAll(){
  return database.raw("SELECT * FROM foods")
}

function createFood(name, calories){
  return database.raw(
    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?) RETURNING id, name, calories',
    [name, calories, new Date]
  )
}

function updateFoodName(name, id) {
  return database.raw(
    'UPDATE foods SET name = ? WHERE id = ? ',
    [name, id]
  )
}

function updateFoodCalories(calories, id) {
  return database.raw(
    'UPDATE foods SET calories = ? WHERE id = ? ',
    [calories, id]
  )
}

function selectFood(id){
  return database.raw("SELECT * FROM foods WHERE id = ?", id)
}

function deleteFood(id) {
  return database.raw("DELETE FROM foods WHERE id = ?", id)
}

module.exports = {selectAll, createFood, selectFood, deleteFood, updateFoodName, updateFoodCalories}
