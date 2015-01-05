var DB_URL = 'http://ec2-54-209-171-188.compute-1.amazonaws.com/wordpress/';
var LOCAL_URL = 'http://localhost/wordpress/';

var rootURL = LOCAL_URL;
var ICON_COUNT = 20;

// function getCatIndex(callback) {
// 	var method = '?json=get_category_index';

// 	$.ajax({
// 	type: 'GET',
// 	url: rootURL + method,
// 	dataType: 'json',
// 	success: function(data){
// 		 // console.log(JSON.stringify(data.categories)); //debug
// 		var cat_table = jOrder(data.categories).index('slug',['slug'])
// 												.index('id',['id']);
// 		callback(null, cat_table);
// 	},
// 	error: function(error){
// 		console.log(error);
// 		callback(error, null);
// 	}

// 	});
// };

var getCatIndex = function(callback) {
	var method = '?json=get_category_index';

	$.ajax({
		type: 'GET',
		url: rootURL + method,
		dataType: 'json',
		success: function(data){
			 // console.log(JSON.stringify(data.categories)); //debug
			var cat_table = jOrder(data.categories).index('slug',['slug'])
													.index('id',['id']);
			callback(null, cat_table);
		},
		error: function(error){
			console.log(error);
			callback(error, null);
		}

	});
};

function getPrevCat(cat, callback) {
	console.log('getPrevCat');

	if (cat === undefined) {
		return callback(null, '');
	}

	var method = '?json=get_category_index';

	$.ajax({
	type: 'GET',
	url: rootURL + method,
	dataType: 'json',
	success: function(data){
		 // console.log(JSON.stringify(data.categories)); //debug
		var cat_table = jOrder(data.categories).index('slug',['slug'])
												.index('id',['id']);
		var prev_cat_id = cat_table.where([{slug: cat}])[0].parent;
		// console.log("prev_cat_id " + prev_cat_id);
		var err_message = 'Category hierarchy not made correctly';
		if (prev_cat_id === undefined || prev_cat_id == 0) {
			return callback(err_message, null);
		} else {
			var prev_cat_slug = cat_table.where([{id: prev_cat_id}])[0];
			cat = prev_cat_slug;
		}
		callback(null, cat);
	},
	error: function(error){
		console.log(error);
		callback(error, null);
	}

	});

};

// function clearPosts(cat, callback) {

// 	$('div.imagecontainer').empty();	
// 	console.log("CAT "+ cat)
// 	callback(null, cat);
// };

var clearPosts = function(callback) {
	$('div.imagecontainer').empty();
}

function getCatPosts(cat, callback) {

	console.log('getCatPosts');
	console.log(cat); //debug

	var method = '?json=get_category_posts';
	var GET_params = '&slug='+cat+'&count='+ICON_COUNT;

	$.ajax({
		type: 'GET',
		url: rootURL + method + GET_params,
		dataType: 'json',
		success: function(data){
			// $('div.imagecontainer').remove();
			$.each(data.posts, function(index, value) {
				var post_cat_table = jOrder(data.categories).index('slug',['slug']);
				var check = cat_table.where([{slug: cat}]);

				console.log(value);

				curr_cat = value.categories[0].slug;
				img_url = value.thumbnail_images.thumbnail.url;
		     	img_link = "?cat=";
		     	
			 	if (curr_cat == cat) {
					//console.log(value.title); //debug

					if (value.content != '') {
						content_param = '&contentid='+value.id;
						img_link += curr_cat + content_param;
					} else if (value.categories.length > 1) {
						subcat = value.categories[1].slug;
						img_link += subcat;

						// prevcat = '&prevcat=' + curr_cat;
						// img_link += prevcat;
					} else {
						img_link += curr_cat;
					}	

					console.log("curr_cat " + curr_cat);
					// console.log("subcat " + subcat);
					console.log(img_link); //debug
			     	$('div.imagecontainer').append('<hor_li class = "imageitem">'+
			     		'<a class="view-link" href="'+img_link+'">' +
         				 '<img src="'+img_url+'">'+ 
          				'<p>'+value.title+'</p></hor_li>');
				} 

		    });	

		},
		error: function(error){
			console.log(error);
		}

	});
};

function route() {
	params = URI(window.location.search).search(true);
	cat = params["cat"];
	content_id = params["content-id"];

	console.log(cat);
	console.log(content_id);
}

// async.waterfall([
// 	getPrevCat(cat),
// 	testFunction(cat)
	

// ]);

// async.waterfall([
// 	getCatIndex,
//     async.apply(getPrevCat, cat),
//     async.apply(clearPosts),
//     async.apply(getCatPosts)
// ], function (err, result) {
//    console.log(result);  
// });

$(window).on('hashchange', route);
route();

