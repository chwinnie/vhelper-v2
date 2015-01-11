/*WORDPRESS URLS*/
var LIVE_URL = 'http://ec2-54-209-171-188.compute-1.amazonaws.com/wordpress/';
var LOCAL_URL = 'http://localhost/wordpress/';

var rootURL = LOCAL_URL;
var ICON_COUNT = 20;

/*DEV URLS */
var devURL = 'http://localhost/chui-app/www/index.html';

// var getCatIndex = function(callback) {
// 	var method = '?json=get_category_index';

// 	$.ajax({
// 		type: 'GET',
// 		url: rootURL + method,
// 		dataType: 'json',
// 		success: function(data){
// 			 // console.log(JSON.stringify(data.categories)); //debug
// 			var cat_table = jOrder(data.categories).index('slug',['slug'])
// 													.index('id',['id']);
// 			// callback(null, cat_table);
// 			callback(null, data.categories);
// 		},
// 		error: function(error){
// 			console.log(error);
// 			callback(error, null);
// 		}

// 	});
// };

function clearPage(callback) {
	console.log('clearPage');
	$(document).ready(function(){
		$('div.image-container').empty();
		$('div.back-button-container').empty();
		callback(null, null);
	});
}

function getPosts(cat, callback) {

	console.log('getPosts');
	// console.log(cat); //debug

	var method = '?json=get_tag_posts';
	var GET_params = '&slug='+cat+'&count='+ICON_COUNT;

	$(document).ready(function(){
		$.ajax({
			type: 'GET',
			url: rootURL + method + GET_params,
			dataType: 'json',
			success: function(data){
				console.log(data.posts);
				// callback(null, data.posts);

				$.each(data.posts, function(index, value) {
					img_url = value.thumbnail_images.thumbnail.url;
					img_link = devURL + "?cat="; //for next cat

					console.log("value");
					console.log(value); //debug
					// console.log(value.thumbnail);

					if (value.content != '') {
						img_link += cat; 
						img_link += "&content-id=" + value.id;
					} else {
						img_link += value.title.toLowerCase();
					}
					console.log("img_link "+ img_link);

					var HTML = '<hor_li class = "image-item">' +
					 '<img src="'+img_url+'">' + 
					 '<a class="view-link" href="'+img_link+'">' +
					'<p>'+value.title+'</p></hor_li>';

					// var linkHTML = '<a class="view-link" href="'+img_link+'">';

					// if (value.content == '') {
					// 	img_link = "#" + value.title.toLowerCase();
					// 	var linkHTML = '<a class="view-link" href="'+img_link+'">';
					// 	HTML += linkHTML;

					// } else {

					// }
				 	$('div.image-container').append(HTML);



				}); 

				callback(null, data.posts);
			},
			error: function(error){
				callback(error, null);
			}
		});
	});
};

function getContent(content_id, callback) {

	console.log('getContent');
	console.log(content_id);
	// console.log(cat); //debug

	var method = '?json=get_post';
	var GET_params = '&post_id='+content_id;


	$.ajax({
		type: 'GET',
		url: rootURL + method + GET_params,
		dataType: 'json',
		success: function(data){
			console.log(data);

			HTML = data.post["content"];
		 	$('div.image-container').append(HTML); 

			callback(null, HTML);
		},
		error: function(error){
			callback(error, null);
		}
	});
};

function getBackButtonCat(cat, callback) {
	console.log('getBackButtonCat');

	if (cat == 'icons') {
		return callback(null, 'no back button for home page');
	}

	var method = '?json=get_category_index';

	$.ajax({
		type: 'GET',
		url: rootURL + method,
		dataType: 'json',
		success: function(data){
			//console.log(JSON.stringify(data.categories)); //debug
			//console.log(cat); //debug
			var cat_table = jOrder(data.categories).index('SLUG',['slug'])
			 										.index('ID', ['id']);
			var cat_rows = cat_table.where([{slug: cat}]);
			//console.log("cat_rows 	"+JSON.stringify(cat_rows)); //debug
			var parent_id = cat_rows[cat_rows.length-1].parent;
			//console.log("parent_id "+JSON.stringify(parent_id)); //debug

			var par_rows = cat_table.where([{id: parent_id}]);
			var par_slug = par_rows[par_rows.length - 1].slug;
			//console.log("par_slug "+JSON.stringify(par_slug)); //debug
			$('div.back-button-container').append('<button class="action"><a class="view-link" href="'+'?cat='+par_slug+'">Back</button>');
			callback(null, par_slug);

			// if (parent_id == 0) {
			// 	$('div.back-button-container').append('<button class="action"><a class="view-link" href="'+devURL+'">Back</button>');
			// 	callback(null, 'none');
			// } else {
			// 	var par_rows = cat_table.where([{id: parent_id}]);
			// 	var par_slug = par_rows[par_rows.length - 1].slug;
			// 	//console.log("par_slug "+JSON.stringify(par_slug)); //debug
			// 	$('div.back-button-container').append('<button class="action"><a class="view-link" href="'+'?cat='+par_slug+'">Back</button>');
			// 	callback(null, par_slug);
			// }

		},
		error: function(error){
			callback(error, null);
		}

	});
};

function getBackButtonContent(cat, callback) {
	$('div.back-button-container').append('<button class="action"><a class="view-link" href="'+'?cat='+cat+'">Back</button>');
}

// function displayPosts(posts_data) {
// 	$.each(posts_data, function(index, value) {
// 		img_url = value.thumbnail;
// 		img_link = "?cat="; //for next cat

// 	 	$('div.image-container').append('<hor_li class = "imageitem">'+
// 		'<a class="view-link" href="'+img_link+'">' +
// 		 '<img src="'+img_url+'">'+ 
// 		'<p>'+value.title+'</p></hor_li>');
// 	}); 

// };

function displayBackButton(parent_cat) {
	console.log('displayBackButton');
	 	// $('div.back-button-container').append('<button id="backButton" href="'+
	 	// 	"#"+parent_cat+
	 	// 	+'"">Back</button>');
	 	$('div.back-button-container').append('<button class="action"><a class="view-link" href="'+'&icons'+'">Back</button>');

};

function route() {
		$(document).ready(function(){
		$('p').append('Route');
	});
	var params = URI(window.location.search).search(true);
	var cat = params["cat"];
	var content_id = params["content-id"];

	// var cat = URI(window.location.href).fragment();
	console.log('route');
	console.log(cat);
	console.log(content_id);

	if (cat === undefined) {
		cat = 'icons';
	}

	// if (content_id === undefined) {
	// 	if (cat === undefined) {
	// 		cat = 'icons';
	// 	}
	// }

	// var params = URI(window.location.search).search(true);


	if (content_id === undefined) {
		async.series([
			clearPage,
			async.apply(getPosts, cat),
			async.apply(getBackButtonCat, cat)
		]);

	} else {
		async.series([
			clearPage,
			async.apply(getContent, content_id),
			async.apply(getBackButtonContent, cat)
		]);		

	}



};


$(window).on('hashchange', route);
route();
