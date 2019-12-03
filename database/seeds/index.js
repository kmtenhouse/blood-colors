
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
        'database/schema/color.js',
        'database/schema/tier.js'
      ]);

      // Clear specified collections
      seeder.clearModels(['Color', 'Tier'], function () {
        try {
          // Callback to populate DB once collections have been cleared
          seeder.populateModels(allSeeds, function () {
            seeder.disconnect();
          });
        }
        catch(e) {
          console.log(e);
          seeder.disconnect();
        }

      });
    }
    catch (err) {
      console.log(err);
      seeder.disconnect();
    }

  });

