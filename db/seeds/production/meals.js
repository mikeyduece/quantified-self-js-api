exports.seed = function(knex, Promise) {
  //Deletes ALL existing entries
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
    .then(function() {
      return knex('meals').insert([
        {name: 'Breakfast', created_at: new Date},
        {name: 'Snack', created_at: new Date},
        {name: 'Lunch', created_at: new Date},
        {name: 'Dinner', created_at: new Date}
      ])
    })
}
