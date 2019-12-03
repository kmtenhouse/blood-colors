const brain = require("brain.js");
const trainData = require("./trainingSet.json");
const getAccuracy = require('./accuracy');
const testData = require("./testSet.json"); 
const trolls = require("./canonTrolls.json");

//Conversion for the end
const tiers = require("./tiers.json");
const tierList = tiers.map(tier => ({ name: tier.name, _id: tier._id }));

// https://github.com/BrainJS/brain.js
//create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork({
  activation: 'sigmoid', // activation function
  hiddenLayers: [9],
  iterations: 20000,
  learningRate: 0.6 // global learning rate, useful when training using streams
});

net.train(trainData);

const accuracy = getAccuracy(net, testData);
console.log('accuracy: ', accuracy); 

//Now we see how it does on real data!
trolls.forEach(troll => {
  const { h, s, v } = troll.hsv;
  var output = net.run([h, s, v]);
  //Find the largest possible output...
  let biggestChance = output[0];
  let chanceIndex = 0;
  for (let i = 0; i < output.length; i++) {
    if (biggestChance < output[i]) {
      biggestChance = output[i];
      chanceIndex = i;
    }
  }
  console.log(`${troll.name}'s canon caste is ${troll.canonCaste}
  Neural net believes it should be: ${tierList[chanceIndex].name} (${biggestChance})`);
});



