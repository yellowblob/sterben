jQuery(document).ready(function($) {

	const interval = setInterval(function() {
         console.log("requested");
   		$.get("/board", function(data, status){
   			console.log(data.status);
   			if(data.status === "go"){
   				console.log(data.url);
   				clearInterval(interval);
   				$("#page").html("");
   				$("#bbb-frame").html('<iframe src="' +  data.url +'" frameborder="0" width="100%" height="100%" scrolling="no" name="bbb" allow="microphone *; camera *"></iframe>');
   				checkForMainRoom();
   			} else {
   				if (data.queue === 0){
   					$("#queue").text("Sie werden gleich in den nächsten freien Raum weitergeleitet.");
   				} else {
   					$("#queue").text("Es sind noch " + data.queue + " Personen vor Ihnen in der Schlange");
   				}
   			}
  		});
	}, 5000);

	function checkForMainRoom() {
		const mainRoomInterval = setInterval(function() {
			$.get("/main", function(data, status){
				if(data.status === "go"){
					clearInterval(mainRoomInterval);
					$("#bbb-frame").html('<iframe src="' +  data.url +'" frameborder="0" width="100%" height="100%" scrolling="no" name="bbb" allow="microphone *; camera *"></iframe>');
				}
			});
		}, 5000);
	}

});