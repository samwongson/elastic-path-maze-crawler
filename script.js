$(function () {
	var api_key;

	var forward = "SOUTH";
	var right = "WEST";
	var back = "NORTH";
	var left = "EAST";
	var tForward;
	var tBack;
	var tRight;
	var tLeft;
	var junctions = [];

	// function canvasApp() {
	// 	var theCanvas = document.getElementById('canvas');
	// 	var context = theCanvas.getContext("2d");
	

	function turnRight() {
			tForward = forward;
			tBack = back;
			tRight = right;
			tLeft = left
			console.log("Forward is "+ forward);
			forward = tRight;
			right = tBack;
			back = tLeft;
			left = tForward;
			console.log("Right path blocked? "+ rightBlocked(info));
			console.log("Right is free, TURNING RIGHT. forward is now " + forward + "!");
			console.log("Right is "+ right);

	}

	function turnLeft() {
			tBack = back;
			tForward = forward;
			tLeft= left;
			tRight = right;

			forward = tLeft;
			right = tForward;
			back = tRight;
			left = tBack;
			
			console.log("Right and Front blocked. Turn left. Forward is now " + forward + "!");
			console.log ("Right is " + right);

	}

	function turnBack(){

	}

	function move(target){
		console.log("moving: "+target);
		$.ajax({
				type: "POST",
				url: "http://www.epdeveloperchallenge.com/api/move?mazeGuid="+api_key+"&direction="+target,
				dataType: "json",
				success: function(response) {
					console.log("Moved!")
					console.log("x:"+response.currentCell.x);
					console.log("y:"+response.currentCell.y);
					console.log(response.currentCell.note);
					if (!response.currentCell.atEnd){
						crawl(response);
					}				
				}
			})
	}



	function rightBlocked(data) {
		switch (forward) {
			case "SOUTH":
				console.log(data.currentCell.west == "BLOCKED");
				return data.currentCell.west == "BLOCKED";
				break;
			case "EAST":
				console.log(data.currentCell.south == "BLOCKED");
				return data.currentCell.south == "BLOCKED";
				break;
			case "NORTH":
				console.log(data.currentCell.east == "BLOCKED");
				return data.currentCell.east == "BLOCKED";
				break;
			case "WEST": "value", 
				console.log(data.currentCell.north == "BLOCKED");
				return data.currentCell.north == "BLOCKED";
				break;			
			default:
				console.log("hello");
		}

	}

	function frontBlocked(data) {
		switch (forward) {
			case "SOUTH":
				console.log(data.currentCell.south == "BLOCKED");
				return data.currentCell.south == "BLOCKED";
				break;
			case "EAST":
				console.log(data.currentCell.east == "BLOCKED");
				return data.currentCell.east == "BLOCKED";
				break;
			case "NORTH":
				console.log(data.currentCell.north == "BLOCKED");
				return data.currentCell.north == "BLOCKED";
				break;
			case "WEST": "value", 
				console.log(data.currentCell.west == "BLOCKED");
				return data.currentCell.west == "BLOCKED";
				break;	
			default:
				console.log("hello");		
		}
	}

	function leftBlocked(data) {

		switch (forward) {
			case "SOUTH":
				console.log(data.currentCell.east == "BLOCKED");
				return data.currentCell.east == "BLOCKED";
				break;
			case "EAST":
				console.log(data.currentCell.north == "BLOCKED");
				return data.currentCell.north == "BLOCKED";
				break;
			case "NORTH":
				console.log(data.currentCell.west == "BLOCKED");
				return data.currentCell.west == "BLOCKED";
				break;
			case "WEST": "value", 
				console.log(data.currentCell.south == "BLOCKED");
				return data.currentCell.south == "BLOCKED";
				break;
			default:
				console.log("hello");			
		}
	}


	function crawl(info) {
		console.log("Currently facing " + forward);
		if (!rightBlocked(info)) {

			tForward = forward;
			tBack = back;
			tRight = right;
			tLeft = left
			console.log("Forward is "+ forward);
			forward = tRight;
			right = tBack;
			back = tLeft;
			left = tForward;
			// console.log("Right path blocked? "+ rightBlocked(info));
			console.log("Right is free, TURNING RIGHT. forward is now " + forward + "!");
			console.log("Right is "+ right);
			move(forward);
			return;
		} else {
				if (!frontBlocked(info)){
					console.log("Right blocked, forward is free, no change")
					move(forward);
					
				} else {
					if (!leftBlocked(info)){

						tBack = back;
						tForward = forward;
						tLeft= left;
						tRight = right;

						forward = tLeft;
						right = tForward;
						back = tRight;
						left = tBack;
						
						console.log("Right and Front blocked. Turn left. Forward is now " + forward + "!");
						console.log ("Right is " + right);
						move(forward);
						
					} else {
							tBack = back;
							tLeft = left;
							tRight = right;
							tForward = forward;
							back = tForward;
							forward = tBack;
							left = tRight;
							right = tLeft;

							console.log("Dead end. 180. Forward is now " + forward + "!")
							console.log("Right is "+ right);
							move(forward);
							
					}
				}
			}
		}
	

		$.ajax({
			type: "POST",
			url: "http://www.epdeveloperchallenge.com/api/init",
			dataType: "json",
			success: function(response) {
				console.log(response)
				api_key = response.currentCell.mazeGuid
				console.log(api_key);
				console.log("x:"+response.currentCell.x);
				console.log("y:"+response.currentCell.y);
				console.log(response.currentCell.south);
				console.log(rightBlocked(response));
				
				 crawl(response);
				
			}

		})
	
});
