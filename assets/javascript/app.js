$(document).ready(function() {
	var buttons = [];
	buttons.push($('<button class="btn btn-primary" type="char" data-name="Mario">'));
	buttons.push($('<button class="btn btn-primary" type="char" data-name="Link">'));
	buttons.push($('<button class="btn btn-primary" type="char" data-name="Kirby">'));
	buttons.push($('<button class="btn btn-primary" type="char" data-name="Pikachu">'));
	buttons.push($('<button class="btn btn-primary" type="char" data-name="Donkey Kong">'));
	buttons.push($('<button class="btn btn-primary" type="char" data-name="Yoshi">'));
	buttons.push($('<button class="btn btn-primary" type="char" data-name="Samus">'));
	buttons.push($('<button class="btn btn-primary" type="char" data-name="Starfox">'));
	for(var i = 0; i < buttons.length; i++)
	{
		var theName = $(buttons[i]).data("name");
		buttons[i].html(theName);
		$("#buttons").append(buttons[i]);
	}
	$(document).on('click', 'button[type="char"]', function() {
		$("#gifspace").empty();
		var dataName = $(this).data('name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="
		 + dataName + "&api_key=dc6zaTOxFJmzC&limit=10";
		 $.ajax({
		 		url: queryURL,
		 		method: 'GET'
		 }).done(function(response) {
		 		var results = response.data;

		 		for(var i = 0; i < results.length; i++)
		 		{
		 			var nameDiv = $('<div class="item">');
		 			var p = $('<p>Rating: ' + results[i].rating + '</p>');
		 			var nameImage = $('<img class="nameImage">');
		 			nameImage.attr('src', results[i].images.fixed_height_still.url);
		 			nameImage.attr('src-still', results[i].images.fixed_height_still.url);
		 			nameImage.attr('src-animate', results[i].images.fixed_height.url);
		 			nameImage.attr('state', 'still');
		 			nameDiv.append(p);
		 			nameDiv.append(nameImage);
		 			$("#gifspace").prepend(nameDiv);
		 		}
		 });
	});
	$('#submit').on('click', function() {
		var newName = $("#newName").val();
		newName.trim();
		buttons.push($('<button class="btn btn-primary" type="char" data-name="' + newName + '">'));
		for(var i = 0; i < buttons.length; i++)
		{
			var theName = $(buttons[i]).data("name");
			buttons[i].html(theName);
			$("#buttons").append(buttons[i]);
		}
		return false;
	});
	$(document).on('click', '.nameImage', function() {
		var state = $(this).attr('state');
		if(state == 'still')
		{
			$(this).attr('src', $(this).attr('src-animate'));
			$(this).attr('state', 'animate');
		}
		else
		{
			$(this).attr('src', $(this).attr('src-still'));
			$(this).attr('state', 'still');
		}
	});
});