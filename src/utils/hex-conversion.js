export function hexToYUV(hex) {
    let rgbObj = hexToRGB(hex);
    return RGBtoYUV(rgbObj);
}

export function textContrast(hex) {
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

export function RGBtoYUV(rgbObj) {
    const { r, g, b} = rgbObj;
    const y = r * .299000 + g *  .587000 + b * .114000;
    const u = r * -.168736 + g * -.331264 + b * .500000 + 128;
    const v = r * .500000 + g * -.418688 + b * -.081312 + 128;
    return { y, u, v};
}

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

export function hexToHSL(hex) {
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

