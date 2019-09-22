const allFiles = require('require-all')({
    dirname: __dirname + '/json',
    filter: /^[a-zA-Z\-]+\.json$/,
    excludeDirs: /^\.(git|svn)$/,
    recursive: true
});

//make this into an array for export
const seedsArr = [];
for (file in allFiles) {
    seedsArr.push(allFiles[file]);
}

module.exports = seedsArr;