const conn = require('mongoose').connection;

/** Database methods. */
class Database {
  /** Initialise variables required for challenge creation and summaries. */
  constructor() {}
  /**
   * Updates the database
   * @param {String} fields - The list of fields to update.
   * @param {String} values - The list of values to update with.
   * @return {Promise} - Promise object.
   */
  async pgUpdate(fields, values) {
    const pool = new Pool()(async () => {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [1])
      console.log('user:', rows[0])
    })().catch(e =>
      setImmediate(() => {
        throw e
      })
    )
  }
  /**
   * Inserts a record into the database
   * @param  {String} db - The database to insert into.
   * @param {String} info - The data to insert.
   * @return {Promise} - Promise object.
   */
  async dbInsert(db, info) {
    await conn.collection(db).insert(
        info,
        {},
        function(e, docs) {}
    );
  }
  /**
   * Updates the database
   * @param  {String} db - The database to update.
   * @param {String} id - The ID of the field to update.
   * @param {String} info - The data to update with.
   * @return {Promise} - Promise object.
   */
  async dbUpdate(db, id, info) {
    await conn.collection(db).update(
        id,
        info,
        {upsert: true}
    );
  }
  /**
   * Removes a record from the database
   * @param  {String} db - The database to remove from.
   * @param {String} id - The document to remove.
   * @return {Promise} - Promise object.
   */
  async dbRemove(db, id) {
    await conn.collection(db).remove(
        id
    );
  }
  /**
   * Finds a record in the database
   * @param  {String} db - The database to search.
   * @param {String} id - The document to find.
   * @return {Object} - Record according to search term.
   */
  async dbFind(db, id) {
    return await conn.collection(db).findOne(
        id
    );
  }
  /**
   * Sorts records from the database
   * @param {String} db - The database to search.
   * @param {String} param - The search term.
   * @param {String} sort - The field to sort by.
   * @return {Object} - Record according to search term.
   */
  async dbSort(db, param, sort) {
    return await conn.collection(db).find(
        param
    ).sort(sort);
  }
}

module.exports = new Database();
