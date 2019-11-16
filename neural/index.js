const brain = require("brain.js");
const trainData = require("./trainingSet.json");
const getAccuracy = require('./accuracy');
const testData = require("./testSet.json");

// https://github.com/BrainJS/brain.js
//create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork({
  activation: 'sigmoid', // activation function
  hiddenLayers: [3, 3],
  iterations: 20000,
  learningRate: 0.5 // global learning rate, useful when training using streams
});

net.train(trainData);

const accuracy = getAccuracy(net, testData);
console.log('accuracy: ', accuracy);