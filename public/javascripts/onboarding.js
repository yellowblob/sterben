import QrScanner from "../javascripts/qr-scanner.js";
import { getAnswers } from "../javascripts/questions.js";
QrScanner.WORKER_PATH = '../javascripts/worker.js';

const standartTimeout = 5000;

let scanner;
let interval;
let timer;
let player;
let player2
let answers;
let button2;

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
                case 5:
                    display_questionnaire(data);
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
        $("#guests").text(data.boarded + " / " + data.users);
        clearTimeout(timer);
        timer = setTimeout(function() {
            ask4Task();
        }, standartTimeout);
    }

    function display_bus_journey(data) {
        if (data.status === "go") {
            $("#page").after(data.html);

            const options = {
                url: "https://vimeo.com/544568910/1f79c6486b",
                controls: false,
                width: document.body.clientWidth,
                pip: false,
                autopause: false,
                muted: true,
            };

            player = new Vimeo.Player('myVideo', options);
            player.play();

            let button = $("#board");



            player.on('timeupdate', function(data) {
                if (data.seconds >= 1.0) {
                    player.pause();
                    button.attr("style", "display: inline !important");
                    button.click(() => {
                        console.log("clicked");
                        player.setMuted(false);
                        $("#vimeo-wrapper-wrapper").fadeIn(1500);
                        player.play();
                    });

                    player.off('timeupdate');
                }
            });

            player.play();

            player.on('ended', () => {
                ask4Task({ playback: false });
            });
        }
        clearTimeout(timer);
        timer = setTimeout(function() {
            player.getCurrentTime().then(function(seconds) {
                ask4Task({ playbackTime: seconds });
            });
        }, standartTimeout);
    }

    function display_questionnaire(data) {
        $("#page").html(data.html);
        $("#vimeo-wrapper-wrapper").remove();

        $("body").append('<div id="vimeo-wrapper-wrapper"><div id="vimeo-wrapper" class="row h-100"><div id="myVideo" class="col-sm-12 my-auto"></div></div></div>');
        const options = {
            id: 435993761,
            controls: false,
            width: document.body.clientWidth,
            pip: false,
            autopause: false,
            muted: true,
        };

        player = new Vimeo.Player('myVideo', options);

        player.on('timeupdate', function(data) {
            if (data.seconds >= 1.0) {
                player.pause();
                player.off('timeupdate');
            }
        });

        player.play();

        const video = document.getElementById('qr-video');

        // ####### Web Cam Scanning #######

        QrScanner.hasCamera().then(hasCamera => console.log(hasCamera));

        scanner = new QrScanner(video, (result, error) => {
            if (error) {
                //console.log(error);
            } else {
                answers = getAnswers(result.codewords);
                if (answers !== null) {

                    $('#qr-scanner').hide();
                    $('#message').html("Vielen Dank für Ihre Anfrage. Sie erhalten folgendes Angebot:");
                    let newHtml = "";
                    let answersMinified = "";
                    let videoId = "";
                    answers.forEach((answer, index) => {
                        newHtml += "<h4>" + answer.question + "</h4>";
                        newHtml += "<p>" + answer.answer.text + "</p>";
                        answersMinified += answer.answer.short + " ";
                        if (answer.answer.short.includes("11")) {
                            videoId = answer.answer.id;
                        }
                    });
                    newHtml += '<button id="correct" type="button" class="btn btn-success">weiter</button>';
                    $("#responseMessage").html(newHtml);
                    $("body").append('<div id="vimeo-wrapper-wrapper-2"><div id="vimeo-wrapper-2" class="row h-100"><div id="myVideo2" class="col-sm-12 my-auto"></div></div></div>');

                    console.log("VideoId: " + videoId);

                    const options2 = {
                        id: videoId,
                        controls: false,
                        width: document.body.clientWidth,
                        pip: false,
                        autopause: false,
                        muted: true,
                    };

                    player2 = new Vimeo.Player('myVideo2', options2);
                    player2.play();
                    button2 = $("#correct");
                    player2.on('timeupdate', start_video);
                    player2.on('timeupdate', switch_video);

                    console.log(answersMinified);
                    scanner.stop();
                }
            }
        });
        scanner.start();
    }

    const switch_video = function(data) {
        if (data.seconds >= 30) {
            player2.off('timeupdate', switch_video);
            console.log("30");
            player.play();
            $("#vimeo-wrapper-wrapper").show();
            $("#vimeo-wrapper-wrapper-2").hide();
            player2.pause();
        }
    }

    const start_video = function(data) {
        if (data.seconds >= 1.0) {
            player2.pause();
            button2.click(() => {
                console.log("clicked");
                player.setMuted(false);
                player2.setMuted(false);
                $("#vimeo-wrapper-wrapper-2").fadeIn(1500);
                player2.play();
                player2.off('timeupdate', start_video);
            });
        }
    }

    function display_main_room(data) {
        if (data.status === "go") {
            $("#bbb-frame").html('<iframe src="' + data.url + '" frameborder="0" width="100%" height="100%" scrolling="no" name="bbb" allow="microphone *; camera *"></iframe>');
        }
    }

});