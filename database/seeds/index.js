
// Require the mongoose seeder package
const seeder = require('mongoose-seed');

// Data array containing seed data -- this will include anything within the json directory
const allSeeds = require("./data");

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/bloodcolorsdev',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  function () {

    try {
      // Load all available Mongoose models
      seeder.loadModels([
        'database/schema/'
      ]);

      //figure out which collections we are clearing
      const modelsToClear = [];
      for (seed of allSeeds) {
        modelsToClear.push(seed.model);
      }

      // Clear specified collections
      seeder.clearModels(modelsToClear, function () {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(allSeeds, function () {
          seeder.disconnect();
        });

      });
    }
    catch(err) {
      console.log(err);
      seeder.disconnect();
    }
  
  });

