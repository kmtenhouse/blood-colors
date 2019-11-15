const brain = require("brain.js");
//provide optional config object (or undefined). Defaults shown.
var config = {
    binaryThresh: 0.5,     // ¯\_(ツ)_/¯
    hiddenLayers: [3],     // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid' // Supported activation types ['sigmoid', 'relu', 'leaky-relu', 'tanh']
}
//create a simple feed forward neural network with backpropagation
var net = new brain.NeuralNetwork();

net.train([
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] },
    { input: [0, 2], output: [2] },
    { input: [2, 0], output: [2] }
]);

const testData = [[0, 0], [0, 1], [1, 0], [1, 1]];
testData.forEach(item => {
    var output = net.run(item);
    console.log(`${item[0]} XOR ${item[1]} -- guessing this will evaluate to ${output} - ${Math.round(output)}`);
});
