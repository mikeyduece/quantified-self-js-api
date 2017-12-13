const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

module.exports = class Meal {
  static all() {
    return database.raw(`SELECT meals.id, meals.name, json_agg(foods.*) AS foods
                       FROM meals JOIN meal_foods ON meals.id=meal_foods.meal_id
                       JOIN foods ON meal_foods.food_id=foods.id GROUP BY meals.id;`)
  }

  static show(id) {
    return database.raw(`SELECT m.id, m.name, json_agg((SELECT row_to_json(x.*)
                         FROM (SELECT f.id, f.name, f.calories) x)) AS foods
                         FROM meals m JOIN meal_foods mf ON m.id=mf.meal_id
                         JOIN foods f ON mf.food_id=f.id
                         WHERE m.id=${id}
                         GROUP BY m.id`)
  }

  static post(mealId, id) {
    return database.transaction((t) => {
      return database('meal_foods')
        .transacting(t)
        .insert({meal_id: mealId, food_id: id})
        .then((response) => {
          return database('meals')
            .transacting(t)
          update({updated_at: new Date})
        })
        .then(t.commit)
        .then(t.rolback)
    })
  }
}
