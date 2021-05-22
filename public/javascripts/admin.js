jQuery(document).ready(function($) {

    const interval = setInterval(function() {

        $.get("/admin/refresh", function(data, status) {
            const users = data;
            $('#users').html("");
            console.log(data);
            users.forEach((user) => {
                let newhtml = '<div class="row">'
                newhtml += '<div class="col-2">' + user.name + '</div>';
                newhtml += '<div class="col-2">' + user.level + '</div>';
                let lastSeen = new Date().getTime();
                lastSeen = Math.floor((lastSeen - user.lastRequest) / 1000).toString();
                lastSeen = lastSeen.toHHMMSS();
                newhtml += '<div class="col-2">' + lastSeen + '</div>';
                /*newhtml += '<div class="input-group"><select class="custom-select">'
                newhtml += '<option selected>Choose Level</option><option value="0">Reset</option><option value="3">Warteraum</option><option value="4">Die Busfahrt</option><option value="5">Das Angebot</option><option value="6">Der Friedhof</option><option value="7">Das Gespräch</option>'
                newhtml += '</select>'
                newhtml += '<div class="input-group-append"><button class="btn btn-outline-secondary" type="button">Set Level</button></div></div>';*/
                newhtml += '</div>'
                $('#users').append(newhtml);
            });
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

    $("#reload-rooms").click(() => {
        $.get("/admin/reloadRooms", function(data, status) {
            if (data.status === "go") {
                $("#reload-rooms").removeClass("btn-primary").addClass("btn-success");
                setTimeout(function() {
                    $("#reload-rooms").removeClass("btn-success").addClass("btn-primary");
                }, 5000);
            }
        });
    });

    $("#open-rooms").click(() => {
        $.get("/admin/openRooms", function(data, status) {
            if (data.status === "go") {
                $("#open-rooms").removeClass("btn-primary").addClass("btn-success");
                setTimeout(function() {
                    $("#open-rooms").removeClass("btn-success").addClass("btn-primary");
                }, 5000);
            }
        });
    });

    function legacy() {
        $("#activeBoardings").html("");
        for (var i = 0; i < data.length; i++) {
            var newhtml = "<div class='row'>";
            newhtml += "<div class='col'>" + data[i]._id + "</div>";
            newhtml += "<div class='col'>" + data[i].boardingRoom + "</div>";
            newhtml += "<div class='col'><button type='button' class='btn btn-primary' id='" + data[i]._id + "'>Send to main</button></div>";
            newhtml += "</div";
            $("#activeBoardings").append(newhtml);
            $('#' + data[i]._id).click(function() {
                $.get("/admin/setmain", { id: this.id }, function(data, status) {
                    if (data.status === "go") {
                        $('#' + data[i]._id).removeClass("btn-primary").addClass("btn-success");
                        setTimeout(function() {
                            $('#' + data[i]._id).removeClass("btn-success").addClass("btn-primary");
                        }, 5000);
                    }
                });
            });
        }
    }

    String.prototype.toHHMMSS = function() {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }

});