function getRandomColor(colors) {
    console.log(colors.length);
    const randomIndex = Math.floor(Math.random()*colors.length);
    const randomHex = colors[randomIndex][0];
    const randomName = colors[randomIndex][1];
    console.log(randomHex, randomName);
}

function sortColor(hex) {
    
}

const ogColors = ["FF0000", "00FF00", "0000FF"];