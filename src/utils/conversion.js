const fs = require('fs');
const newFileName = 'all-colors';
const trollColors = require(`./data/${newFileName}`);

const objectArr = trollColors.map(troll => {
    let rgbObj = hexToRGB(troll[0]);
    const obj = {
        name: troll[1],
        hex: troll[0],
        RGB: rgbObj,
        YUV: RGBtoYUV(rgbObj),
        caste: '',
        _id: createUUID()
    }
    return obj;
});

writeJSON(newFileName, objectArr);

function writeJSON(filename, data) {
    const stringified = JSON.stringify(data);
    fs.writeFile(`${filename}.json`, stringified, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}


function hexToYUV(hex) {
    let rgbObj = hexToRGB(hex);
    return RGBtoYUV(rgbObj);
}

function RGBtoYUV(rgbObj) {
    const { r, g, b } = rgbObj;
    const y = r * .299000 + g * .587000 + b * .114000;
    const u = r * -.168736 + g * -.331264 + b * .500000 + 128;
    const v = r * .500000 + g * -.418688 + b * -.081312 + 128;
    return { y, u, v };
}



function hexToRGB(hex) {
    if (hex.charAt(0) === "#") {
        hex = hex.slice(1);
    }

    let red = parseInt(hex.slice(0, 2), 16);
    let blue = parseInt(hex.slice(4, 6), 16);
    let green = parseInt(hex.slice(2, 4), 16);
    return {
        r: red,
        g: green,
        b: blue
    };
}

function createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
