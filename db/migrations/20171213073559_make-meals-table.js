
exports.up = function(knex, Promise) {
  let createMeals = `CREATE TABLE meals(
                     id SERIAL PRIMARY KEY NOT NULL,
                     name TEXT,
                     created_at TIMESTAMP,
                     updated_at TIMESTAMP
                     )`
  return knex.raw(createMeals)
};

exports.down = function(knex, Promise) {
  let dropQuery = `TRUNCATE foods RESTART IDENTITY`
  return knex.raw(dropQuery)
};
