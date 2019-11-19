'use strict'

const Fs = require('fs');
const Path = require('path');
const axios = require('axios');


downloadFile('http://localhost:3001/api/colors/filter/withtier', 'colors.json').then(result=>console.log("Finished")).catch(err=>console.log(err));

async function downloadFile(url, destinationFilename) {
    const path = Path.resolve(__dirname, destinationFilename)
    const writer = Fs.createWriteStream(path)
  
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
  
    response.data.pipe(writer)
  
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  }
  