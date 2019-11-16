// First, parse the data into inputs and outputs
const tiers = require("./tiers.json");
const colors = require("./colors.json");
const fs = require("fs");

const tierList = tiers.map(tier => ({ name: tier.name, _id: tier._id }));
//Next, make a map for color id to index:
const tierMap = {};
tierList.forEach((tier, index) => {
    tierMap[tier._id] = index;
});

//Iterate through the colors and prepare our data sets -- they will be divided basically in two
const alternate = new Array(13).fill(0);
const testSet = [];
const trainingSet = [];

colors.forEach(color => {
    const rgb = hexToRGB(color.hex);
    const { h, s, v } = rgbToHsv(rgb);
    const result = new Array(13).fill(0);
    const hit = tierMap[color.tier];
    result[hit] = 1;

    const dataObj = {
        input: [h, s, v],
        output: result
    };
    if (alternate[hit]) {
        testSet.push(dataObj);
        alternate[hit] = 0;
    }
    else {
        trainingSet.push(dataObj);
        alternate[hit] = 1;
    }
});

fs.writeFile('trainingSet.json', JSON.stringify(trainingSet), (err) => {
    if (err) throw err;
    console.log('Training set saved!');
});

fs.writeFile('testSet.json', JSON.stringify(testSet), (err) => {
    if (err) throw err;
    console.log('Test set saved!');
});


//helper functions
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

function rgbToHex(rgbObj) {
    const { r, g, b } = rgbObj;
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function distance(colorA, colorB) {
    const rgbA = hexToRGB(colorA);
    const rgbB = hexToRGB(colorB);
    //d=sqrt((r2-r1)^2+(g2-g1)^2+(b2-b1)^2)
    const distances = {
        r: Math.pow((rgbB.r - rgbA.r), 2),
        g: Math.pow((rgbB.g - rgbA.g), 2),
        b: Math.pow((rgbB.b - rgbA.b), 2),
    };

    return Math.sqrt((distances.r + distances.g + distances.b));
}

function componentToHex(c) {
    console.log(c);
    var hex = Math.floor(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function RGBtoYUV(rgbObj) {
    const { r, g, b } = rgbObj;
    const y = r * .299000 + g * .587000 + b * .114000;
    const u = r * -.168736 + g * -.331264 + b * .500000 + 128;
    const v = r * .500000 + g * -.418688 + b * -.081312 + 128;
    return { y, u, v };
}

function rgbToHsv(rgbObj) {
    let { r, g, b } = rgbObj;
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h, s, v };
}

function hexToHSL(hex) {
    let { r, g, b } = hexToRGB(hex);

    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta === 0)
        h = 0;
    // Red is max
    else if (cmax === r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax === g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {
        h: h,
        s: s,
        l: l
    };
}