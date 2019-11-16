module.exports = function (net, testData) {
    let hits = 0;
    testData.forEach((datapoint) => {
        const output = net.run(datapoint.input);
        const outputArray = output.map(item => Math.round(item));
        //[Math.round(output[0]), Math.round(output[1]), Math.round(output[2])];
        let foundHit = true;
        for (let i = 0; i < 13; i++) {
            if (outputArray[i] !== datapoint.output[i]) {
                foundHit = false;
                break;
            }
        }
        if (foundHit) {
            hits += 1;
        }

    });
    return hits / testData.length;
}