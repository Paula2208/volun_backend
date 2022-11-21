const { defineConfig } = require("cypress");
const mysql = require('mysql');
const { database } = require('./src/keys');

function queryTestDb(query) {
  const connection = mysql.createConnection(database)
  connection.connect()
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}

module.exports = defineConfig({
  projectId: 'jr5f9h',
  env: {
    home_url: 'http://localhost:8000/',
  },
  e2e: {
    experimentalSessionAndOrigin: true,
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      on('task', {
        queryDb(query) {
          return queryTestDb(query);
        },
      })
    },
  },
});
