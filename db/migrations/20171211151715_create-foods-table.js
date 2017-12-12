exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE foods(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT,
    calories INT,
    created_at TIMESTAMP
  )`
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `TRUNCATE foods RESTART IDENTITY`
  return knex.raw(dropQuery)
};
