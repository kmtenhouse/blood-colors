const canonTrolls = [
  ["a10000",  "Aradia"],
  ["9b060c",  "Damara"],
  ["b30701",  "The Handmaid"],
  ["a25203", "Tavros"],
  ["bf5700", "Rufioh"],
  ["9d6402", "The Summoner"],
  ["a1a100",  "Sollux"],
  ["cfcd00",  "Mituna"],
  ["a1a100",  "The Psiioniic"],
  ["336601",  "Nepeta"],
  ["517600",  "Meulin"],
  ["416600",  "The Disciple"],
  ["078446",  "Kanaya"],
  ["009358",  "Porrim"],
  ["078446",  "The Dolorosa"],
  ["008282",  "Terezi"],
  ["009294",  "Latula"],
  ["008282",  "Redglare"],
  ["004182",  "Vriska"],
  ["004182",  "Aranea"],
  ["004182",  "Mindfang"],
  ["0021cb",  "Equius"],
  ["000056",  "Horrus"],
  ["001583",  "Darkleer"],
  ["440a7f",  "Gamzee"],
  ["6600da",  "Kurloz"],
  ["440a7f",  "The Grand Highblood"],
  ["6a006a",  "Eridan"],
  ["7e1a7d",  "Cronus"],
  ["6a006a",  "Dualscar"],
  ["99004d", "Feferi"],
  ["99004d", "Meenah"],
  ["b11262", "Condy"],
  ["fd0101", "Karkat"],
  ["FF0000", "Kankri"],
  ["F70000", "Signless"]
];

const group =  [["523C94", ""],   ["440a7f",  "Gamzee"],
["6600da",  "Kurloz"],];

let result = averageColor(group.map(pair => pair[0]));

//let result = averageColor(["C02B18", "A62F20","B32D29"])

console.log(rgbToHex(result));

function componentToHex(c) {
  console.log(c);
  var hex = Math.floor(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgbObj) {
  const { r, g, b} =rgbObj;
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function averageColor(arr) {
  let sums = {
    r: 0,
    g: 0,
    b: 0
  }
 
  let total = 0;

arr.forEach(element => {
    let hex = hexToRGB(element)
    sums.r += Math.pow(hex.r,2);
    sums.g += Math.pow(hex.g,2);
    sums.b += Math.pow(hex.b,2);
    total++;
});

  return {
    r: Math.sqrt( (sums.r/total )),
    g: Math.sqrt( (sums.g/total )),
    b: Math.sqrt( (sums.b/total ))
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