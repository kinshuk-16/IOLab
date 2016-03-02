//binfing search button click event
$(document).ready(function() {
	$("#search").on("click", searchClicked);
});

//Event handler for search button clicked
function searchClicked(){
	var query= $("#query").val();
	$("#query").val('');
	//console.log(query);	
	$("#results").empty()
	callAPI(query);
	event.preventDefault();
}
//calling the SoundCloud API using the user's search query - called from event handler of search button click
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			processData(data);
		},'json'
	);
}

//Processing the data returned from the API. 
function processData(data){
	//It renders the first 20 items
	$.each(data,function(index,value){
		if(index <20){
			var title=value.title;
			var artist = value.user.username;
			var picLink = value.artwork_url;
			var songUrl = value.permalink_url;
			$("#results").append("<div class='song'><img src='"+picLink+"'><p>"+title+"<br>"+artist+"</p><button class='play' name ="+songUrl+">Play</button>&nbsp;&nbsp;<button class='add' id="+index+" >Add to Playlist</button>");
		}

	});
	// Event handler for play button
	 $("#results").on('click','.play',function(){
	 	url = this.name;
	 	//console.log(url);
	 	changeTrack(url);
	 });
	 //Event handler for add to playlist button
    $( "#results" ).on( "click",".add", function() {
		addToList(this);
    });
}

//Add to playlist processes the request from event handler add corresponding item to playlist
function addToList(caller){
	var parentDiv = $(caller).parent();
	var playListTrack = $(parentDiv).clone().appendTo( ".sidenav" );
	$(playListTrack).attr({class:'playlist'});
	$(playListTrack).children(".add").remove();
	$("<button class='remove'>Remove</button>").appendTo(playListTrack);
	$("<button class='up'>Up</button>").appendTo(playListTrack);
	$("<button class='down'>Down</button>").appendTo(playListTrack);
	$(playListTrack).prependTo(".sidenav");
}

// Event handler for play button from within playlist
$( ".sidenav" ).on("click", ".play", function() {
		url = this.name;
		//console.log(url);
		changeTrack(url)
    });

// Event handler for remove from playlist
$( ".sidenav" ).on( "click",".remove", function() {
		$(this).parent().remove();
    });
// Event handler for move item up
$( ".sidenav" ).on( "click",".up", function() {
		var box = $(this).parent();
		$(box).insertBefore($(box).prev());
    });
// Event handler for move item down
$( ".sidenav" ).on( "click",".down", function() {
		var box = $(this).parent();
		$(box).insertAfter($(box).next());
    });

// Called on from play event handler. Uses status plugin to play the track using the url that is passed to it
function changeTrack(url) {
	$('#stratus').remove();
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}

