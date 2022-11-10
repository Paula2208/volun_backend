const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'jr5f9h',
  e2e: {
    experimentalSessionAndOrigin: true,
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
