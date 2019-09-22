function hexToRGB(str) {
    console.log(typeof str);
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
    return (luminosity > 0.179 ? "000000" : "FFFFFF");
}

module.exports = {
    hexToRGB,
    getContrastColor
}