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
let insideWidth;

jQuery(document).ready(function($) {

    $('#help-toggle').click(() => {
        $("#help").animate({ left: 0 });
        $("body").animate({ "padding-left": "20vw" })
    });

    $('#help-close').click(() => {
        $("#help").animate({ left: "-20vw" });
        $("body").animate({ "padding-left": "0" })
    });

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
        insideWidth = $("#message").width();
        console.log(insideWidth);
        $('#content').fadeOut(() => {
            ask4Task({ reload: true });
        });
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
                case 6:
                    display_cemetry(data);
                    break;
                case 7:
                    display_after_talk(data);
                    break;
                default:
            }
        });
    }

    function scan_ticket(data) {
        if (data.status === "rejected") {
            $("#ticket-id").val("");
            alert("Leider konnten wir Ihre ID keinem für die heutige Vorstellung registrierten Ticket zuordnen.");
        } else {
            $("#content").html(data.html);

            if ($("#help").css("left") === "0px") {
                $("#help").animate({ left: "-20vw" });
                $("body").animate({ "padding-left": "0" }, () => {
                    $("#help-content").html(data.help);
                })
            } else {
                $("#help-content").html(data.help);
            }
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

            let videoWidth, videoHeight;
            let getVideoSize = function() {
                const videoWidth = insideWidth;
                console.log(video.offsetWidth);
                const lineCanvas = document.getElementById('line-canvas');
                const lineContext = lineCanvas.getContext("2d");
                const videoPseudo = { "videoWidth": videoWidth, "videoHeight": video.videoHeight * videoWidth / video.videoWidth }
                lineCanvas.width = videoWidth;
                lineCanvas.height = videoPseudo.videoHeight;
                const liveScanRegion = calculateScanRegion(videoPseudo);
                drawLine(lineContext, liveScanRegion.x, liveScanRegion.y, liveScanRegion.x + liveScanRegion.width, liveScanRegion.y);
                drawLine(lineContext, liveScanRegion.x, liveScanRegion.y + liveScanRegion.width, liveScanRegion.x + liveScanRegion.width, liveScanRegion.y + liveScanRegion.width);
                drawLine(lineContext, liveScanRegion.x, liveScanRegion.y, liveScanRegion.x, liveScanRegion.y + liveScanRegion.height);
                drawLine(lineContext, liveScanRegion.x + liveScanRegion.width, liveScanRegion.y, liveScanRegion.x + liveScanRegion.width, liveScanRegion.y + liveScanRegion.height);

                $("#content").fadeIn();
                $("html, body").animate({ scrollTop: $(document).height() - $(window).height() });
                video.removeEventListener('playing', getVideoSize, false);
            };

            video.addEventListener('playing', getVideoSize, false);

        }
    }

    function drawLine(context, xStart, yStart, xEnd, yEnd) {
        context.beginPath();
        context.moveTo(xStart, yStart);
        context.lineTo(xEnd, yEnd);
        context.lineWidth = 4;
        context.strokeStyle = "#66B441";
        context.stroke();
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
                    console.log(answersMinified);
                    scanner.stop();
                    ask4Task({ videoId: videoId });
                }
            }
        });
        scanner.start();
    }

    function display_cemetry(data) {
        if (data.status === "go") {
            let videoId = data.videoId;
            console.log(videoId);
            $("body").append(data.html);
            const options = {
                id: 435993761,
                controls: false,
                width: document.body.clientWidth,
                pip: false,
                autopause: false,
                muted: true,
            };

            const options2 = {
                id: videoId,
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

            player.on('ended', () => {
                ask4Task({ playback: false });
            });

            player2 = new Vimeo.Player('myVideo-2', options2);
            player2.play();
            button2 = $("#correct");
            player2.on('timeupdate', start_video);
            player2.on('timeupdate', switch_video);
            if (data.reload === true) {
                setTimeout(() => {
                    player.setMuted(false);
                    player2.setMuted(false);
                    $("#vimeo-wrapper-wrapper-2").fadeIn(1500);
                    player2.play();
                    player2.off('timeupdate', start_video);
                }, 1500);
            }
        }
        clearTimeout(timer);
        timer = setTimeout(function() {
            player.getCurrentTime().then(function(seconds) {
                player2.getCurrentTime().then(function(seconds2) {
                    ask4Task({ playbackTime: seconds, playbackTime2: seconds2 });
                });
            });
        }, standartTimeout);
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

    function display_after_talk(data) {
        if (data.status === "go") {
            if (player) {
                player.destroy();
                player2.destroy();
            }
            $("#vimeo-wrapper-wrapper").remove();
            $("#vimeo-wrapper-wrapper-2").remove();
            $("#page").remove();
            $("body").prepend(data.html);
        }
    }

    function calculateScanRegion(video) {
        // Default scan region calculation. Note that this can be overwritten in the constructor.
        const smallestDimension = Math.min(video.videoWidth, video.videoHeight);
        const scanRegionSize = Math.round(3 / 4 * smallestDimension);
        return {
            x: (video.videoWidth - scanRegionSize) / 2,
            y: (video.videoHeight - scanRegionSize) / 2,
            width: scanRegionSize,
            height: scanRegionSize,
        };
    }

});