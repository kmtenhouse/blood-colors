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
];

/* const ogColors = [
    {
        name: "red",
        hex: "FF0000",
        r: 255,
        g: 0,
        b: 0
    },
    {
        name: "orange",
        hex: "FF7F00",
        r: 255,
        g: 127,
        b: 0
    },
    {
        name: "yellow",
        hex: "FFFF00",
        r: 255,
        g: 255,
        b: 0
    },
    {
        name: "green-yellow",
        hex: "7FFF00",
        r: 127,
        g: 255,
        b: 0
    },
    {
        name: "green",
        hex: "00FF00",
        r: 0,
        g: 255,
        b: 0
    },
    {
        name: "green-cyan",
        hex: "00FF7F",
        r: 0,
        g: 255,
        b: 127
    },
    {
        name: "cyan",
        hex: "00FFFF",
        r: 0,
        g: 255,
        b: 255
    },
    {
        name: "blue-cyan",
        hex: "007FFF",
        r: 0,
        g: 127,
        b: 255
    },
    {
        name: "blue",
        hex: "0000FF",
        r: 0,
        g: 0,
        b: 255
    },
    {
        name: "blue-magenta",
        hex: "7F00FF",
        r: 127,
        g: 0,
        b: 255
    },
    {
        name: "magenta",
        hex: "FF00FF",
        r: 255,
        g: 0,
        b: 255
    },
    {
        name: "red-magenta",
        hex: "FF007F",
        r: 255,
        g: 0,
        b: 127
    }
]; */


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
    if(hex.charAt(0)==="#") {
        hex = hex.slice(1);
    }

    let red = parseInt(hex.slice(0,2), 16);
    let blue = parseInt(hex.slice(4,6), 16);
    let green = parseInt(hex.slice(2,4), 16);
    return {
        r: red,
        g: green,
        b: blue
    };
}

function bestFit(newColor, colorList) {
    let hex = hexToRGB(newColor);
    let results = [];
    for(let i=0; i< colorList.length; i++) {
        let currentColorRGB = hexToRGB(colorList[i].hex);

        results.push(
            {
                name: colorList[i].name,
                r: currentColorRGB.r-hex.r,
                g: currentColorRGB.g-hex.g,
                b: currentColorRGB.b-hex.b,
                totalDistance: Math.abs( currentColorRGB.r-hex.r)+Math.abs(currentColorRGB.g-hex.g)+Math.abs(currentColorRGB.b-hex.b)
            }
        );   
    }
    //now find our smallest results (in terms of distance from a particular color)
    results = results.sort(function(a, b) {
        return a.totalDistance-b.totalDistance;
    });

    //grab the first item and see if it's a tie...
    const winner = results[0];
    const allWinners = results.filter(item=>item.totalDistance===winner.totalDistance);
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

    let hex = hexToRGB(color.hex);
    let heading3 = document.createElement('h3');
    heading3.innerText = `RGB(${hex.r}, ${hex.g}, ${hex.b})`;
    container.appendChild(heading3);

    let div = document.createElement('div');
    div.style.backgroundColor = `rgb(${hex.r},${hex.g},${hex.b})`;
    div.classList.add("box");
    //append the box to its container
    container.appendChild(div);
    return container;
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
    const allFits = bestFit(color.hex, colorList);

    allFits.forEach(result => {
        console.log(result);
        //get the relevant category
        let target = document.getElementById(result.name);
        console.log("Targeting: ",target);
        console.log(target);
        let newBox = makeOneBox({
            name: color.name,
            hex: color.hex
        });
        target.appendChild(newBox);
    });

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
let rando = getRandomColor(colorNames); //colornames is from another file
placeColor(rando, trollColors); 

