const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

module.exports = class Food {
  static all() {
    return database.raw('SELECT * FROM foods')
  }

  static show(id) {
    return database.raw("SELECT * FROM foods WHERE id=?", [id])
  }

  static post(name, calories) {
    return database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?,?,?) RETURNING name, calories',
      [name, calories, new Date])
  }

  static delete(id) {
    return database.raw('DELETE FROM foods WHERE id=?', [id])
  }

  static update(id, name, calories) {
    return database.raw(`UPDATE foods
                         SET name=?, calories=?, updated_at=?
                         WHERE id=?`, [name, calories, date, id])
  }
}
