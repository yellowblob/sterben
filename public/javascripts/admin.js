jQuery(document).ready(function($) {
    const interval = setInterval(function() {
        $.get("/admin/refresh", function(data, status) {
            $("#activeBoardings").html("");
            for (var i = 0; i < data.length; i++) {
                var newhtml = "<div class='row'>";
                newhtml += "<div class='col'>" + data[i]._id + "</div>";
                newhtml += "<div class='col'>" + data[i].boardingRoom + "</div>";
                newhtml += "<div class='col'><button type='button' class='btn btn-primary' id='" + data[i]._id + "'>Send to main</button></div>";
                newhtml += "</div";
                $("#activeBoardings").append(newhtml);
                $('#' + data[i]._id).click(function() {
                    send2main(this.id);
                });
            }
        });
    }, 5000);

    $("#start-journey").click(() => {
        console.log("click");
        $.get("/admin/startJourney", function(data, status) {
            if (data.status === "go") {
                $("#start-journey").removeClass("btn-primary").addClass("btn-success");
                setTimeout(function() {
                    $("#start-journey").removeClass("btn-success").addClass("btn-primary");
                }, 5000);
            }
        });
    });

    function send2main(id) {
        $.get("/admin/setmain", { id: id });
    }
});