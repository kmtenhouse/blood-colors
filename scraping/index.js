'use strict'

const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');


downloadFile('http://chir.ag/projects/name-that-color/ntc_main.js', 'colors.html').then(result=>console.log("Finished")).catch(err=>console.log(err));

async function downloadFile(url, destinationFilename) {
    //const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
    const path = Path.resolve(__dirname, 'download', destinationFilename)
    const writer = Fs.createWriteStream(path)
  
    const response = await Axios({
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
  