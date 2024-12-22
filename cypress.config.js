const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "https://www.youtube.com/",
    chromeWebSecurity: false,
  },
  video: false,
});
