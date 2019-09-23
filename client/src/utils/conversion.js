const fs = require('fs');
const newFileName = 'allColors';
const trollColors = require(`../../../archive/data/${newFileName}.json`);

console.log(trollColors.length);

const objectArr = trollColors.map(troll => {
    let obj = {
        name: troll[1],
        hex: "#"+troll[0]
    }

    obj.contrastColor = getContrastColor(obj.hex);
    return obj;
});

console.log(objectArr.length);

writeJSON(newFileName, objectArr);

function writeJSON(filename, data) {
    const stringified = JSON.stringify(data);
    fs.writeFile(`${filename}.json`, stringified, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

function hexToRGB(str) {
    if (str.charAt(0) === "#") {
        str = str.slice(1);
    }

    let red = parseInt(str.slice(0, 2), 16);
    let blue = parseInt(str.slice(4, 6), 16);
    let green = parseInt(str.slice(2, 4), 16);
    return {
        r: red,
        g: green,
        b: blue
    };
}

function getContrastColor(hex) {
    let currentRGB = hexToRGB(hex);
    let luminResults = [currentRGB.r, currentRGB.g, currentRGB.b].map(bit => {
        bit = bit / 255.0;
        if(bit <= 0.03928) {
            bit = bit/12.92
        } else {
            bit = Math.pow(((bit+0.055)/1.055), 2.4);
        }
        return bit;
    });
    
    let luminosity = 0.2126 *luminResults[0]+0.7152 * luminResults[1]+ 0.0722 * luminResults[2];
    return (luminosity > 0.179 ? "#000000" : "#FFFFFF");
}

/* 

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
 */