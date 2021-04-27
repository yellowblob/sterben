import QrScanner from "../javascripts/qr-scanner.js";
import { getAnswers } from "../javascripts/questions.js";
QrScanner.WORKER_PATH = '../javascripts/worker.js';

const standartTimeout = 5000;

let scanner;
let interval;
let timer;

jQuery(document).ready(function($) {

    ask4Task();
    
    function ask4Task(params) {
        $.get("/board", params, function(data, status) {
            console.log(data);
            var level = data.level;
            switch (level) {
                case 0:
                    scan_ticket(data);
                    break;
                case 1:
                    display_queue(data);
                    break;
                case 2:
                    display_boarding_room(data);
                    break;
                case 3:
                    display_outside_bus(data);
                    break;
                default:
            }
        });
    }

    function scan_ticket(data) {
        if (data.status === "rejected") {
            $("#responseMessage").text("Leider konnten wir Ihre ID keinem für die heutige Vorstellung registrierten Ticket zuordnen.");
        } else {
            const video = document.getElementById('qr-video');
            const camQrResult = document.getElementById('cam-qr-result');

            // ####### Web Cam Scanning #######

            QrScanner.hasCamera().then(hasCamera => console.log(hasCamera));

            scanner = new QrScanner(video, (result, error) => {
                if (error) {
                    console.log(error);
                } else {
                    let answers = getAnswers(result.codewords);
                    if(answers !== null){
                        console.log(answers);
                        result = result.data.substring(3);
                        ask4Task({ ticketId: result });
                    }
                }
            });
            scanner.start();

            // for debugging
            window.scanner = scanner;
        }
    }

    function display_queue(data) {
        if (data.status === "go") {
            scanner.stop();
            $("#message").html("Willkommen zu Besser Sterben. <span id='queue'>Der Einlass beginnt in kürze.</span><br>Bitte lassen Sie dieses Browserfenster geöffnet und haben Sie einen Augenblick Geduld.");
            $("#qr-scanner").hide();
            $("#responseMessage").hide();
        } else {
            if (data.queue === 0) {
                $("#queue").text("Sie werden gleich in den nächsten freien Raum weitergeleitet.");
            } else {
                $("#queue").text("Es sind noch " + data.queue + " Personen vor Ihnen in der Schlange");
            }
        }
        clearTimeout(timer);
        timer = setTimeout(function(){
            ask4Task();
        }, standartTimeout);
    }

    function display_boarding_room(data) {

        if (data.status === "go") {
            console.log(data.url);
            $("#page").html("");
            $("#bbb-frame").html('<iframe src="' + data.url + '" frameborder="0" width="100%" height="100%" scrolling="no" name="bbb" allow="microphone *; camera *"></iframe>');
            setTimeout(ask4Task);
        }
        clearTimeout(timer);
        timer = setTimeout(function(){
            ask4Task();
        }, standartTimeout);
    }

    function display_outside_bus(data) {

        if (data.status === "go") {
            $("#bbb-frame").html('<iframe src="' + data.url + '" frameborder="0" width="100%" height="100%" scrolling="no" name="bbb" allow="microphone *; camera *"></iframe>');
        }
    }

});