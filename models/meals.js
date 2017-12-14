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
    return database.raw(`INSERT INTO meal_foods AS mf (meal_id, food_id)
                         VALUES (${mealId}, ${id})`)
    return database.raw(`UPDATE meals SET updated_at=?
                         WHERE meals.id=${mealId}`,[new Date])
  }

  static delete(mealId, id) {
    return database.raw(`DELETE FROM meal_foods AS mf WHERE oid = (SELECT oid FROM meal_foods WHERE mf.meal_id=${mealId} AND mf.food_id=${id} LIMIT 1)`)
    // return database.raw(`DELETE FROM meal_foods AS mf
    //                    WHERE mf.meal_id=${mealId} AND mf.food_id=${id} LIMIT 1`)
  }
}
