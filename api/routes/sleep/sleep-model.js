const db = require("../../../data/dbConfig");
const { isIterable } = require("../../../api/utils/utils");

module.exports = { find, findBy, insert, update, remove };

// prettier-ignore
function find(query) {
  // Timestamps run from 1900-01-01 to 9999-12-31
  let { start = -2208970800000, end = 253402232400000 } = query ? query : {};
  return db("sleep as s")
    .whereBetween("s.sleep_start", [start, end])
    .orderBy("s.sleep_start")
}

// prettier-ignore
function findBy(field, query) {
  // Timestamps run from 1900-01-01 to 9999-12-31
  // Pagination support helps with scalability 
  let { start = -2208970800000, end = 253402232400000, limit = 5000, page = 1 } = query ? query : {};
  const rowOffset = limit * (page - 1);
  return db("sleep as s")
    .where(field)
    .whereBetween("s.sleep_start", [start, end])
    .offset(rowOffset)
    .limit(limit)
    .orderBy("s.sleep_start")
}

function insert(trace) {
  return db("sleep")
    .insert(trace)
    .returning("id")
    .then(async res => {
      if (isIterable(res)) {
        const traces = [];
        for (let id of res) {
          const trace = await findBy({ id });
          trace && traces.push(trace[0]);
        }
        return traces;
      } else {
        return await findBy({ id: res });
      }
    });
}

function update(id, changes) {
  delete changes.id;
  return db("sleep")
    .where({ id })
    .update(changes)
    .returning("id")
    .then(async res => {
      if (isIterable(res)) {
        const traces = [];
        for (let id of res) {
          const trace = await findBy({ id });
          trace && traces.push(trace[0]);
        }
        return traces;
      } else {
        return await findBy({ id });
      }
    });
}

// prettier-ignore
function remove(id) {
  return db("sleep")
    .where({ id })
    .delete()
    .returning("*")
    .then(res => {
      return res
    })
}
