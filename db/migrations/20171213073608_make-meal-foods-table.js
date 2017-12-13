
exports.up = function(knex, Promise) {
  let createJoins = `CREATE TABLE meal_foods(
                     id SERIAL PRIMARY KEY NOT NULL,
                     meal_id INT,
                     food_id INT
                     )`
  return knex.raw(createJoins)
};

exports.down = function(knex, Promise) {
  let dropQuery = `TRUNCATE foods RESTART IDENTITY`
  return knex.raw(dropQuery)
};
