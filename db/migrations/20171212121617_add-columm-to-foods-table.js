
exports.up = function(knex, Promise) {
  let alterQuery = `ALTER TABLE foods ADD updated_at TIMESTAMP`
  return knex.raw(alterQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `TRUNCATE foods RESTART IDENTITY`
  return knex.raw(dropQuery)
};
