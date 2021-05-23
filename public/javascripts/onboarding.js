import QrScanner from "../javascripts/qr-scanner.js";
import { getAnswers } from "../javascripts/questions.js";
QrScanner.WORKER_PATH = '../javascripts/worker.js';

var requestWorker = new Worker('requestWorker.js');

const standartTimeout = 5000;

const answers0815 = [{
        "question": "Wissen Sie schon, welche Art von Bestattung, Sie sich wünschen? Sarg, Urne oder Körperspende?",
        "answer": {
            "short": "1a",
            "text": "Erdbestattung auf dem Friedhof",
            "price": 2300,
            "sortingIndex": 1
        }
    },
    {
        "question": "Wie wollen Sie angekleidet und gewaschen werden?",
        "answer": {
            "short": "2a",
            "text": "Einkleidung, Waschung: Bestattungsunternehmen",
            "price": 200,
            "sortingIndex": 2
        }
    },
    {
        "question": "Welche Kleidung soll Ihre letzte sein?",
        "answer": {
            "short": "3a",
            "text": "Totengewand: eigene Kleidung",
            "price": 0,
            "sortingIndex": 3
        }
    },
    {
        "question": "Wünschen Sie eine Aufbahrung?",
        "answer": {
            "short": "4a",
            "text": "Aufbahrung",
            "price": 125,
            "sortingIndex": 4
        }
    },
    {
        "question": "Welcher Sarg? Oder welche Urne?",
        "answer": {
            "short": "5b",
            "text": "Sarg Wildeiche",
            "price": 2100,
            "sortingIndex": 5
        }
    },
    {
        "question": "Wer soll das letzte Wort haben?",
        "answer": {
            "short": "6c",
            "text": "Trauerrede: Pfarrer (katholisch), Taxi",
            "price": 70,
            "sortingIndex": 6
        }
    },
    {
        "question": "Wollen Sie eine Traueranzeige veröffentlichen?",
        "answer": {
            "short": "7a",
            "text": "Ja",
            "price": 0,
            "sortingIndex": 7
        }
    },
    {
        "question": "Wenn ja, in welcher Zeitung?",
        "answer": {
            "short": "8d",
            "text": "Traueranzeige in einer Regionalzeitung",
            "price": 2.73,
            "sortingIndex": 8
        }
    },
    {
        "question": "Wie groß (in cm)?",
        "answer": {
            "short": "9c",
            "text": ", 4,5 x 5cm",
            "price": 50,
            "sortingIndex": 9
        }
    },
    {
        "question": "Wie wird die Musik dargeboten?",
        "answer": {
            "short": "10c",
            "text": "Orgel mit",
            "price": 125,
            "sortingIndex": 10
        }
    },
    {
        "question": "Welche Musik soll an Ihrer Beerdigung gespielt werden?",
        "answer": {
            "short": "11a",
            "text": "Chaconne (J.S. Bach)",
            "price": 0,
            "sortingIndex": 11,
            "id": "zNs98hh_v9g",
        }
    },
    {
        "question": "Was gibt es zum Leichenschmaus?",
        "answer": {
            "short": "12a",
            "text": "Belegte Brötchen + Kaffee und Kuchen",
            "price": 19,
            "sortingIndex": 12,
        }
    },
    {
        "question": "Wie viele Gäste?",
        "answer": {
            "short": "13b",
            "text": "für 50 Gäste",
            "price": 50,
            "sortingIndex": 13,
        }
    },
    {
        "question": "Wer kümmert sich um dei Grabpflege?",
        "answer": {
            "short": "14b",
            "text": "Grapflege durch Zugehörigenkreis",
            "price": 1600,
            "sortingIndex": 14,
        }
    },
    {
        "question": "Sterben Sie zu Hause oder im Krankenhaus?",
        "answer": {
            "short": "15b",
            "text": "Transport ab Krankenhaus",
            "price": 30,
            "sortingIndex": 15,
        }
    },
    {
        "question": "In welcher Jahreszeit sterben Sie?",
        "answer": {
            "short": "16c",
            "text": "Blumenkranz mit Sonnenblumen",
            "price": 300,
            "sortingIndex": 16,
        }
    },
];

let scanner;
let interval;
let timer;
let player;
let answers;
let button2;
let insideWidth;
let name;
let audio;
let audioIndex = 1;
let audioMax = 9;
let userCount = 0;
let boardingCount = 0;
let scannedTicket = false;
let totalPrice = 0;
let requestInterval;
let options = {};

jQuery(document).ready(function($) {

    $('#help-toggle').click(() => {
        $("#help").animate({ left: 0 });
        $("body").animate({ "padding-left": "20vw" })
    });

    $('#help-close').click(() => {
        $("#help").animate({ left: "-20vw" });
        $("body").animate({ "padding-left": "0" })
    });

    $('#fullscreen').click(() => {
        openFullscreen();
        $('#help-close').click();
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
            if (data.reload === true) {
                console.log("set Interval");
                requestInterval = setInterval(() => {
                    ask4Task(options);
                }, standartTimeout);
            }
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
                    display_bus_journey_youtube(data);
                    break;
                case 5:
                    display_questionnaire(data);
                    break;
                case 6:
                    display_cemetry_youtube(data);
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
            scannedTicket = false;
        } else {
            $("#content").html(data.html);
            updateHelp(data.help)

            const video = document.getElementById('qr-video');

            $("#check-in").submit(function(event) {
                event.preventDefault();
                let ticketId = $("#ticket-id").val();
                ticketId = ticketId.toLowerCase();
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
                        console.log(result);
                        if (!scannedTicket) {
                            ask4Task({ ticketId: result });
                            scannedTicket = true;
                        }
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

    function display_outside_bus(data) {
        console.log("display bus");
        if (data.status === "go") {
            if (requestInterval) {
                clearInterval(requestInterval);
            }
            requestInterval = setInterval(() => {
                ask4Task(options);
            }, standartTimeout);
            if (scanner) {
                scanner.stop();
            }
            updateHelp(data.help)
            $("#content").html(data.html);
            $('#bbb-frame').fadeOut(() => {
                $('#bbb-frame').remove();
            });
            $("#content").fadeIn();

            startPlay();

        }
        userCount = data.users;
        boardingCount = data.boarded;
        if (data.boarded === 1 || data.boarded === 0) {
            $("#guests").text("Sie sind der erste Gast.");
        } else {
            $("#guests").text(data.boarded + " Gäste sind schon da.");
        }
    }

    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    function startPlay() {
        if (audio == null || audio.paused) {
            let audioIndexString = pad(audioIndex, 2);
            audio = new Audio('/audio/waiting/' + audioIndexString + '.aac');
            audio.play();
            audio.onended = function() {
                console.log('audioIndex:' + audioIndex);
                if (audioIndex <= audioMax) {
                    audioIndex++;
                    startPlay();
                } else {
                    audioIndex = 1;
                    startPlay();
                }
            };
        }
    }

    function display_bus_journey_youtube(data) {
        if (data.status === "go") {
            let button;
            updateHelp(data.help);
            $("#page").after(data.html);
            if (!data.reload) {
                fadeAndStopAudio();
                $('#startJourneyTogether').fadeIn();
            }
            //    after the API code downloads.
            let startSeconds = 0;
            if (data.reload) {
                startSeconds = data.playbackTime;
            }

            player = new YT.Player('player', {

                width: document.body.clientWidth,
                height: window.screen.height,
                videoId: 'YvIZeZ7yREk',
                host: 'https://www.youtube-nocookie.com',
                playerVars: { 'controls': 0, 'fs': 0, 'modestbranding': 1, 'rel': 0, 'showinfo': 0, 'start': startSeconds },
                events: {
                    'onReady': onPlayerReady,

                }
            });


            // 4. The API will call this function when the video player is ready.
            function onPlayerReady(event) {
                if (data.reload) {
                    startBusJourney(event)
                } else {
                    let button = $("#board");
                    button.attr("style", "display: inline !important");
                    button.click(() => {
                        startBusJourney(event);
                    });
                }
            }

            // 5. The API calls this function when the player's state changes.
            //    The function indicates that when playing a video (state=1),
            //    the player should play for six seconds and then stop.
            var done = false;
        }

        if (player.getCurrentTime()) {
            let playbackTime = Math.floor(player.getCurrentTime());
            options = { playbackTime: playbackTime };
        }
    }

    function startBusJourney(event) {
        openFullscreen();
        $("#hide-pip").show();
        event.target.playVideo();
        $("#cover").fadeIn(1500);
        setTimeout(() => {
            $("#vimeo-wrapper-wrapper").show();
        }, 1500);
        setTimeout(() => {
            $("#cover").fadeOut();
        }, 3000);
        let ytEndTimer = setInterval(() => {
            if (player.getCurrentTime() >= 2649) {
                ask4Task({ playback: false, playbackTime: 0 });
                clearInterval(ytEndTimer);
            }
        }, 1000);
    }

    function fadeAndStopAudio() {
        console.log('function called');
        let vol = 1;
        const interval = 100; // 200ms interval
        if (audio.volume == 1) {
            const intervalID = setInterval(function() {
                // Reduce volume by 0.05 as long as it is above 0
                // This works as long as you start with a multiple of 0.05!
                if (vol > 0) {
                    vol -= 0.05;
                    // limit to 2 decimal places
                    // also converts to string, works ok
                    audio.volume = vol.toFixed(2);
                } else {
                    audio.pause();
                    clearInterval(intervalID);
                }
            }, interval);
        }
    }

    function display_questionnaire(data) {
        if (data.status === "go") {
            options = {};
            updateHelp(data.help);
            $("#content").html(data.html);
            $("#vimeo-wrapper-wrapper").fadeOut(() => {
                player.stopVideo();
                $("#vimeo-wrapper-wrapper").remove();
            });
            $("#hide-pip").remove();
            $("#cover").remove();
            setTimeout(() => {
                audio = new Audio('/audio/qr-code.aac');
                audio.play();
            }, 1000)
            $("#null815").click(() => {

                console.log(answers0815);
                showResults(answers0815);



            });

            const video = document.getElementById('qr-video');

            // ####### Web Cam Scanning #######

            QrScanner.hasCamera().then(hasCamera => console.log(hasCamera));

            scanner = new QrScanner(video, (result, error) => {
                if (error) {
                    //console.log(error);
                } else {
                    answers = getAnswers(result.codewords);
                    if (answers !== null) {
                        console.log(answers);
                        showResults(answers);
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

    function showResults(answers) {
        $("#null815").remove();
        $('#qr-scanner').hide();
        $('#message').html("<br>Vielen Dank für Ihre Anfrage. Sie erhalten folgendes Angebot:<br><br><hr><div class='row'><div class='col-1'>Position</div><div class='col-9'>Bezeichnung</div><div class='col-2 text-right'>Preis</div></div><hr>");
        let newHtml = "";
        let answersMinified = "";
        let videoId = "";
        let openStart = false;
        let openEnd = false;
        let index = 1;
        let price;
        let operation;
        let urne = false;
        let anzeige = false;
        answers.forEach((answer) => {
            let questionIndex = parseInt(answer.answer.short.replace(/[a-z]/g, ''));
            let questionChar = answer.answer.short.replace(/[0-9]/g, '');
            switch (questionIndex) {
                case 1:
                    switch (questionChar) {
                        case 'b':
                            openEnd = true;
                            operation = "add";
                            price = answer.answer.price;
                            urne = true;
                        case 'a':
                            console.log("answer a/b");
                            newHtml += "<div class='row'><div class='col-1'>1</div><div class='col-9'>Basispreis</div><div class='col-2 text-right'>2500 €</div></div>";
                            totalPrice += 2500;
                            index++;
                            break;
                        default:
                            if (urne == false)
                                return;
                    }
                    break;
                case 5:
                    if (questionChar == 'b') {
                        return;
                    }
                    break;
                case 7:
                    if (questionChar == 'a') {
                        anzeige = true;
                    }
                    return;
                    break;
                case 8:
                    if (!anzeige) {
                        return
                    } else {
                        openEnd = true;
                        operation = "multiply";
                        price = answer.answer.price;
                    }
                    break;
                case 9:
                    if (!anzeige) {
                        return
                    }
                    break;
                case 10:
                    openEnd = true;
                    operation = "add";
                    price = answer.answer.price;
                    break;
                case 11:
                    videoId = answer.answer.id;
                    break;
                case 12:
                    openEnd = true;
                    operation = "multiply";
                    price = answer.answer.price;
                    break;
                case 14:
                    if (questionChar == 'c')
                        return;
                default:

            }
            if (openStart && price != 0) {
                if (operation == 'add') {
                    price = price + answer.answer.price;
                }
                if (operation == 'multiply') {
                    price = price * answer.answer.price;
                }
            } else {
                price = answer.answer.price;
            }
            newHtml += openStart ? "" : "<div class='row'>";
            newHtml += openStart ? "" : "<div class='col-1'>" + index + "</div>";
            newHtml += openStart ? "" : "<div class='col-9'>"
            newHtml += openStart ? " " : ""
            openStart = false;
            newHtml += answer.answer.text
            newHtml += openEnd ? "" : "</div>";
            newHtml += openEnd ? "" : "<div class='col-2 text-right'>" + price + " €</div>";
            newHtml += openEnd ? "" : "</div>";
            answersMinified += answer.answer.short + " ";
            totalPrice += openEnd ? 0 : price;
            index += openEnd ? -1 : 0;
            openStart = openEnd ? true : false;
            price = openEnd ? price : 0;
            openEnd = false;
            index++;
        });
        newHtml += '<br><br><button id="correct" type="button" class="btn btn-success">Angebot annehmen</button>';
        $("#responseMessage").html(newHtml);
        console.log(answersMinified);
        scanner.stop();
        console.log(videoId);
        ask4Task({ videoId: videoId });
    }

    function fireworks() {
        $('#fireworks-wrapper').fadeIn();
        audio = new Audio('/audio/fireworks.aac');
        audio.play();
        var duration = 12.5 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    function display_cemetry_youtube(data) {
        if (data.status === "go") {
            updateHelp(data.help);

            $("#page").after(data.html);
            totalPrice = Math.floor(totalPrice);
            $("#sum-text").text(totalPrice + '€');
            //    after the API code downloads.


            console.log(document.body.clientWidth);
            console.log(window.screen.height);

            let startSeconds = 0;
            if (data.reload) {
                openFullscreen();
                startSeconds = data.playbackTime;
                $('#help').append('<button id="start-video" type="button" class="btn btn-primary">Play</button>');
                $('#start-video').click(() => {
                    player.playVideo();
                    setTimeout(() => {
                        $("#cover").fadeOut();
                    }, 3000);
                });
            }


            player = new YT.Player('player', {

                width: document.body.clientWidth,
                height: window.screen.height,
                videoId: data.videoId,
                host: 'https://www.youtube-nocookie.com',
                playerVars: { 'controls': 0, 'fs': 0, 'modestbranding': 1, 'rel': 0, 'showinfo': 0, 'start': startSeconds },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });


            // 4. The API will call this function when the video player is ready.
            function onPlayerReady(event) {
                console.log('Playerready');
                if (data.reload) {
                    $("#cover").fadeIn(1500, () => {
                        $("#vimeo-wrapper-wrapper").show();
                    });
                    startCemetry(event)
                } else {
                    button2 = $("#correct");
                    button2.click(() => {
                        audio.pause();
                        fireworks();
                        openFullscreen();
                        $("#cover").fadeIn(1500, () => {

                        });
                        setTimeout(() => { startCemetry(event) }, 11000);
                    });
                }

            }
            done = false;
            let playedName = false;

            function onPlayerStateChange(event) {
                console.log(YT.PlayerState);
                console.log(event.data);
                if (event.data == YT.PlayerState.PLAYING && !done) {
                    console.log("Playing");
                    $('#fireworks-wrapper').fadeOut(1500);
                    if (!data.reload) {
                        fadeAndStopAudio();
                        setTimeout(() => {
                            $("#vimeo-wrapper-wrapper").show();
                        }, 1500);
                    }

                    setTimeout(() => {
                        $("#cover").fadeOut();
                    }, 3000);
                    let ytEndTimer = setInterval(() => {
                        if (player.getCurrentTime() >= 1500) {
                            ask4Task({ playback: false });
                            clearInterval(ytEndTimer);
                        }
                        if (player.getCurrentTime() >= 997 && !playedName) {
                            var audio = new Audio('/audio/names/' + data.name + '.mp3');
                            audio.play();
                            playedName = true;
                        }
                    }, 1000);
                    done = true;
                }
            }



            // 5. The API calls this function when the player's state changes.
            //    The function indicates that when playing a video (state=1),
            //    the player should play for six seconds and then stop.
            var done = false;
        }

        if (player.getCurrentTime()) {
            let playbackTime = Math.floor(player.getCurrentTime());
            options = { playbackTime: playbackTime };
        }
    }

    function startCemetry(event) {
        $("#hide-pip").show();
        console.log("beforeStart")
        event.target.playVideo();
        console.log("afterStart")
    }

    function display_after_talk(data) {
        if (data.status === "go") {
            $("#vimeo-wrapper-wrapper").fadeOut(3000, () => {
                player.stopVideo();
                player.destroy();
                $("#vimeo-wrapper-wrapper").remove();
            });
            updateHelp(data.help)
            $("#content").html(data.html).fadeIn();
            $("#hide-pip").hide();
            clearInterval(requestInterval);
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

    function updateHelp(text) {
        if ($("#help").css("left") === "0px") {
            $("#help").animate({ left: "-20vw" });
            $("body").animate({ "padding-left": "0" }, () => {
                $("#help-content").html(text);
            })
        } else {
            $("#help-content").html(text);
        }
    }

});