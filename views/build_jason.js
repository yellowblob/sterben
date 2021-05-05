const fs = require('fs');

const folders = ["html", "help"];

folders.forEach((folder) => {
    readFiles(folder);
});

function readFiles(folder, onFileContent, onError) {
    let exportJson = [];
    let dirname = "views/" + folder + "/";
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
        fs.writeFileSync('views/' + folder + '.json', data);
    });
}