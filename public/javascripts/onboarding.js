import QrScanner from "../javascripts/qr-scanner.js";
import { getAnswers } from "../javascripts/questions.js";
QrScanner.WORKER_PATH = '../javascripts/worker.js';

const standartTimeout = 5000;

let scanner;
let interval;
let timer;
let player;

jQuery(document).ready(function($) {

    var elem = document.documentElement;

    /* View in fullscreen */
    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    /* Close fullscreen */
    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }

    $("#start-show").click(() => {
        openFullscreen();
        ask4Task({ reload: true });
    });

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
                case 4:
                    display_bus_journey(data);
                    break;
                default:
            }
        });
    }

    function scan_ticket(data) {
        if (data.status === "rejected") {
            alert("Leider konnten wir Ihre ID keinem für die heutige Vorstellung registrierten Ticket zuordnen.");
        } else {
            $("#page").html(data.html);
            const video = document.getElementById('qr-video');

            $("#check-in").submit(function(event) {
                event.preventDefault();
                let ticketId = $("#ticket-id").val().toLowerCase();
                ask4Task({ ticketId: ticketId });
            });

            // ####### Web Cam Scanning #######

            QrScanner.hasCamera().then(hasCamera => console.log(hasCamera));

            scanner = new QrScanner(video, (result, error) => {
                if (error) {
                    console.log(error);
                } else {
                    if (result.data !== "") {
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
            if (scanner) {
                scanner.stop();
            }
            $("#page").html(data.html);
        } else {
            if (data.queue === 0) {
                $("#queue").text("Sie werden gleich in den nächsten freien Raum weitergeleitet.");
            } else {
                $("#queue").text("Es sind noch " + data.queue + " Personen vor Ihnen in der Schlange");
            }
        }
        clearTimeout(timer);
        timer = setTimeout(function() {
            ask4Task();
        }, standartTimeout);
    }

    function display_boarding_room(data) {

        if (data.status === "go") {
            console.log(data.url);
            $("#page").html(data.html);
            $("#bbb-frame iframe").attr("src", data.url);
        }
        clearTimeout(timer);
        timer = setTimeout(function() {
            ask4Task();
        }, standartTimeout);
    }

    function display_outside_bus(data) {
        if (data.status === "go") {
            $("#page").html(data.html);
            let imageUrl = 'images/bus.jpg'
            $("body").css('background-image', 'url(' + imageUrl + ')');
        }
        clearTimeout(timer);
        timer = setTimeout(function() {
            ask4Task();
        }, standartTimeout);
    }

    function display_bus_journey(data) {
        if (data.status === "go") {
            $("#page").html("");
            $("body").css('background-image', 'none');
            $("body").css('background-color', 'black');
            $("#page").css('margin-top',0);
            $("body").prepend(data.html);
            const options = {
                url: "https://vimeo.com/544568910/1f79c6486b",
                controls: false,
                width: document.body.clientWidth,
                "picture-in-picture": false,
            };

            player = new Vimeo.Player('myVideo', options);

            player.play();
        }
        clearTimeout(timer);
        timer = setTimeout(function() {
            player.getCurrentTime().then(function(seconds) {
                ask4Task({ playbackTime: seconds });
            });
        }, standartTimeout);
    }

    function display_questionnaire(data) {
        
    }

    function display_main_room(data) {
        if (data.status === "go") {
            $("#bbb-frame").html('<iframe src="' + data.url + '" frameborder="0" width="100%" height="100%" scrolling="no" name="bbb" allow="microphone *; camera *"></iframe>');
        }
    }

});