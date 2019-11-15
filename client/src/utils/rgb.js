export function hexToRGB(hex) {
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

export function rgbToHex(rgbObj) {
    const { r, g, b } = rgbObj;
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function distance(colorA, colorB) {
    const rgbA = hexToRGB(colorA);
    const rgbB = hexToRGB(colorB);
    //d=sqrt((r2-r1)^2+(g2-g1)^2+(b2-b1)^2)
    const distances = {
        r: Math.pow( (rgbB.r-rgbA.r), 2),
        g: Math.pow( (rgbB.g-rgbA.g), 2),
        b: Math.pow( (rgbB.b-rgbA.b), 2),
    };

    return Math.sqrt( (distances.r + distances.g + distances.b) );
}

function componentToHex(c) {
    console.log(c);
    var hex = Math.floor(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

