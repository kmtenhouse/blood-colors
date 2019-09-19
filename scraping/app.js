const trollColors = [
    {
        name: "rust",
        hex: "a10000",
    },
    {
        name: "bronze",
        hex: "a25203",
    },
    {
        name: "gold",
        hex: "a1a100",
    },
    {
        name: "lime",
        hex: "678900",
    },
    {
        name: "olive",
        hex: "336601",
    },
    {
        name: "jade",
        hex: "078446"
    },
    {
        name: "teal",
        hex: "008282"
    },
    {
        name: "cerulean",
        hex: "004182"
    },
    {
        name: "blue",
        hex: "0021cb"
    },
    {
        name: "indigo",
        hex: "440a7f"
    },
    {
        name: "violet",
        hex: "6a006a"
    },
    {
        name: "fuchsia",
        hex: "99004d"
    },
    {
        name: "black",
        hex: "000000"
    },
    {
        name: "gray",
        hex: "808080"
    },
    {
        name: "karkat",
        hex: "FF0000"
    }
];



function getRandomColor(colors) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    console.log(colors[randomIndex]);
    const randomHex = colors[randomIndex][0];
    const randomName = colors[randomIndex][1];
    console.log(randomHex, randomName);
    return {
        name: randomName,
        hex: randomHex
    };
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
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
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
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {
        h: h,
        s: s,
        l: l,
        hslString: `hsl(${h}, ${s}%, ${l}%)`
    };
}


function bestFitRGB(newColor, colorList) {
    let hex = hexToRGB(newColor);
    let results = [];
    for (let i = 0; i < colorList.length; i++) {
        let currentColorRGB = hexToRGB(colorList[i].hex);

        results.push(
            {
                name: colorList[i].name,
                r: currentColorRGB.r - hex.r,
                g: currentColorRGB.g - hex.g,
                b: currentColorRGB.b - hex.b,
                totalDistance: Math.abs(currentColorRGB.r - hex.r) + Math.abs(currentColorRGB.g - hex.g) + Math.abs(currentColorRGB.b - hex.b)
            }
        );
    }
    //now find our smallest results (in terms of distance from a particular color)
    results = results.sort(function (a, b) {
        return a.totalDistance - b.totalDistance;
    });

    //grab the first item and see if it's a tie...
    const winner = results[0];
    const allWinners = results.filter(item => item.totalDistance === winner.totalDistance);
    return allWinners;
}

function makeOneBox(color) {
    let container = document.createElement('div');
    let heading = document.createElement('h3');
    heading.innerText = color.name;
    container.appendChild(heading);

    let heading2 = document.createElement('h3');
    heading2.innerText = color.hex;
    container.appendChild(heading2);

    let hsl = hexToHSL(color.hex);
    let heading4 = document.createElement('h3');
    heading4.innerText = `${hsl.hslString}`;
    container.appendChild(heading4);

    let div = document.createElement('div');
    div.style.backgroundColor = hsl.hslString; 
    div.classList.add("box");
    //append the box to its container
    container.appendChild(div);
    return container;
}

function makeSmolBox(color) {
    let hex = hexToRGB(color.hex);
    let div = document.createElement('div');
    div.style.backgroundColor = `rgb(${hex.r},${hex.g},${hex.b})`;
    div.classList.add("small-box");
    return div;
}

function makeCategories(colorList, target) {

    for (color of colorList) {
        //get our target

        let heading = document.createElement('h3');
        heading.innerText = "Category:";
        let newCat = makeOneBox(color);
        newCat.prepend(heading);
        //these are categories, so we give them unique ids
        newCat.setAttribute('id', color.name);
        target.appendChild(newCat);
    }
}


function placeColor(color, colorList) {
    //assumes color is a color object with a name and hex only!
    const allFits = bestFitRGB(color.hex, colorList); //bestFitRGB(color.hex, colorList);
    let countNoFits = 0;
    if (allFits.length > 1) {
        countNoFits++;
    } else {
        let target = document.getElementById(allFits[0].name);
        let newBox = makeSmolBox({
            name: color.name,
            hex: color.hex
        });
        target.appendChild(newBox);
    }
    let noFits = document.getElementById('nofit');
    noFits.innerText = countNoFits;
}

//MAIN CODE TO RUN
//Display our base categories
let display = document.getElementById("display");
makeCategories(trollColors, display);

//Test: place all the existing colors
/*  for(color of trollColors) {
    placeColor(color, trollColors);
}  */

//Now, get a random color and place it
//let rando = getRandomColor(colorNames); //colornames is from another file
for (let k = 0; k < colorNames.length; k++) {
    const currentHex = colorNames[k][0];
    const currentName = colorNames[k][1];
    placeColor({
        name: currentName,
        hex: currentHex
    }, trollColors);
}

