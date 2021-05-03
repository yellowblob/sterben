const fs = require('fs');
let exportJson = [];

readFiles("views/html/");

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            console.log(err);
            return;
        }
        filenames.forEach(function(filename) {
            if (filename === ".DS_Store") {
              return;
            }
            let content = fs.readFileSync(dirname + filename, 'utf-8')
            exportJson.push(content);
        });
        let data = JSON.stringify(exportJson);
        fs.writeFileSync('views/html.json', data);
    });
}

