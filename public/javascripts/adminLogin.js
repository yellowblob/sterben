import QrScanner from "../javascripts/qr-scanner.js";
QrScanner.WORKER_PATH = "../javascripts/worker.js";

let scanner;

jQuery(document).ready(function($) {

    ask4task({ firstLoad: true });
    
    function ask4task(params) {
        $.get("/admin", params, function(data, status) {
            console.log(data);
            if (data.status === "go") {
                startScan();
            } else if (data.status === "rejected") {
                $("#ticket-id").val("");
                scanner.start();
                alert("Leider konnten wir Ihre ID keinem Account zuordnen.");
            } else if (data.status ==="access") {
                location.reload();
            }
        });
    }

    function startScan() {
        const video = document.getElementById('qr-video');
        const insideWidth = $("#message").width();
        $("#check-in").submit(function(event) {
            event.preventDefault();
            let ticketId = $("#ticket-id").val().toLowerCase();
            ask4task({ ticketId: ticketId });
        });

        // ####### Web Cam Scanning #######

        QrScanner.hasCamera().then(hasCamera => console.log(hasCamera));

        scanner = new QrScanner(video, (result, error) => {
            if (error) {
                console.log(error);
            } else {
                if (result.data !== "") {
                    scanner.stop();
                    console.log(result.data);
                    ask4task({ ticketId: result.data });
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

            video.removeEventListener('playing', getVideoSize, false);
        };

        video.addEventListener('playing', getVideoSize, false);
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

    function drawLine(context, xStart, yStart, xEnd, yEnd) {
        context.beginPath();
        context.moveTo(xStart, yStart);
        context.lineTo(xEnd, yEnd);
        context.lineWidth = 4;
        context.strokeStyle = "#66B441";
        context.stroke();
    }

});