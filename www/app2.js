var LIVE_URL = 'http://ec2-54-209-171-188.compute-1.amazonaws.com/wordpress/';
var LOCAL_URL = 'http://localhost/wordpress/';

var rootURL = LOCAL_URL;
var ICON_COUNT = 20;

function getPosts(cat) {
$(document).ready(function(){
    var method = '?json=get_tag_posts';
    var GET_params = '&slug='+cat+'&count='+ICON_COUNT;
    $.ajax({
    	type: 'GET',
    	url: rootURL + method + GET_params,
    	dataType: 'json',
    	success: function(data) {
    		$.each(data.posts, function(index, value) {
	    		$("p").append("<b>"+value.title+"</b>");
    		});

    	}

    });
});
};

getPosts('icons');

// function getPosts(cat) {

// 	console.log('getPosts');
// 	// console.log(cat); //debug


// 	var method = '?json=get_tag_posts';
// 	var GET_params = '&slug='+cat+'&count='+ICON_COUNT;
//     $(document).ready(function(){
//     	$("p").append("<b>IUNNO</b>");
// 		$.ajax({
// 			type: 'GET',
// 			url: rootURL + method + GET_params,
// 			dataType: 'json',
// 			success: function(data){
// 				console.log(data.posts);
// 				// callback(null, data.posts);

// 				$.each(data.posts, function(index, value) {
// 					img_url = value.thumbnail_images.thumbnail.url;
// 					img_link = devURL + "?cat="; //for next cat

// 					console.log("value");
// 					console.log(value); //debug
// 					// console.log(value.thumbnail);

// 					if (value.content != '') {
// 						img_link += cat; 
// 						img_link += "&content-id=" + value.id;
// 					} else {
// 						img_link += cat;
// 					}
// 					console.log("img_link "+ img_link);

// 					var HTML = '<hor_li class = "image-item">' +
// 					 '<img src="'+img_url+'">' + 
// 					 '<a class="view-link" href="'+img_link+'">' +
// 					'<p>'+value.title+'</p></hor_li>';

// 					// var linkHTML = '<a class="view-link" href="'+img_link+'">';

// 					// if (value.content == '') {
// 					// 	img_link = "#" + value.title.toLowerCase();
// 					// 	var linkHTML = '<a class="view-link" href="'+img_link+'">';
// 					// 	HTML += linkHTML;

// 					// } else {

// 					// }
// 					var HTML2 =  '<li class = "image-item"><img src="images/music/Willy Moon.jpg" height='100px'><p>Test</p></li>';
// 				 	$('ul.test').append(HTML2);

	   

// 				}); 

// 			},
// 			error: function(error){
// 				console.log(error);
// 			}
// 		});
// 	});
// };

// getPosts('icons');