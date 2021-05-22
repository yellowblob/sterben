var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/sterben';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const fs = require('fs');
var csv = require('csv-parser');
const users = require('./models/user');

const csv_source = process.argv[2];
let reverse = false;

if (process.argv[3]) {
    const option = process.argv[3];
    switch (option) {
        case "-reverse":
            reverse = true;
            break;
        default:
    }
}
let index = -1;

if (!reverse) {
    fs.createReadStream(csv_source)
        .pipe(csv(['ID']))
        .on('data', (data) => {
            
            users.findOne({ ticketId: data.ID }, (err, user) => {
                if (err) {
                    console.log("error on: " + data.ID);
                } else {
                    if (user == null) {
                        console.log("couldn't find: " + data.ID);
                    }
                    try {
                        if (fs.existsSync("./public/audio/names/" + user.name + ".mp3")) {
                            //console.log(user.name + " OK")
                        } else {
                            console.log("couldn't find:" + user.name);
                        }
                    } catch (err) {

                        console.log(data.ID);
                    }
                }
            });
            index++;
        })
        .on('end', () => {
            console.log(index + " Tickets checked");
        });
} else {
    let results = [];
    fs.createReadStream(csv_source)
        .pipe(csv(['ID']))
        .on('data', (data) => {
            results.push(data.ID);
            index++;
        })
        .on('end', () => {
            users.find({}, (err, userArray) => {
                if (err) {
                    console.log(err);
                } else {
                    userArray.forEach((user)=>{
                        let result = results.indexOf(user.ticketId);
                        if(result === -1){
                            console.log("couldn't find:" + user.name + " " + user.ticketId);
                        } else {
                            console.log("all fine with: " + user.name);
                        }
                    });
                }
                
            });
            console.log(index + " Tickets checked");
        });
}