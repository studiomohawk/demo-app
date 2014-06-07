$(function(){
	var menuType;
	var recomendUser = ["studiomohawk","studiomohawk","studiomohawk"],
	recomendTag = ["javascript","chrome","browser","business"],
	tabclicked = {'user':false,'tag':false,'popular':false};
	console.log(tabclicked['user']);

	clickUser();

	function clickUser(){
		$('[data-menu]').removeClass('menu_active');
		$('[data-menu="user"]').addClass('menu_active');
		$('.tag-content,.popular-content').css('display','none');
		$('.user-content').css('display','block');

		$('#user-search-btn').click(function(){
			searchWord = $('#user-search-word').val();
			$('#user-recomend-area').html('');
			$('#user-element').html('');
			$.ajax({
				type:'GET',
				url:'http://feeds.pinboard.in/json/u:'+searchWord,
				dataType:'jsonp',
				jsonp:'cb',
				success:function(json){

					for(i=0;i<10;i++){
						var title = json[i].d,
						url = json[i].u,
						disc = json[i].n;
						$('<div></div>').html('<a href="'+url+'"<h3>'+title+'</h3></a><p>'+disc+'</p><hr>').appendTo('#user-element');

						console.log(title);
					}

				},
				error:function() {
					alert('もう一度試してください。');
				}
			});
		});
	}

	function clickTag(){
		$('[data-menu]').removeClass('menu_active');
		$('[data-menu="tag"]').addClass('menu_active');
		$('.user-content,.popular-content').css('display','none');
		$('.tag-content').css('display','block');

		$('#tag-search-btn').click(function(){
			searchWord = $('#tag-search-word').val();
			$('#tag-recomend-area').html('');
			$('#tag-element').html('');
			$.ajax({
				type:'GET',
				url:'http://feeds.pinboard.in/json/t:'+searchWord,
				dataType:'jsonp',
				jsonp:'cb',
				success:function(json){

					for(i=0;i<10;i++){
						var title = json[i].d,
						url = json[i].u,
						disc = json[i].n;
						$('<div></div>').html('<a href="'+url+'"<h3>'+title+'</h3></a><p>'+disc+'</p><hr>').appendTo('#tag-element');


					}

				},
				error:function() {
					alert('もう一度試してください。');
				}
			});
		});

	}
	function clickPopular(){
		$('[data-menu]').removeClass('menu_active');
		$('[data-menu="popular"]').addClass('menu_active');
		$('.user-content,.tag-content').css('display','none');
		$('.popular-content').css('display','block');
		$('#popular-element').html('');
		$.ajax({
			type:'GET',
			url:'http://feeds.pinboard.in/json/popular',
			dataType:'jsonp',
			jsonp:'cb',
			success:function(json){

				for(i=0;i<10;i++){
					var title = json[i].d,
					url = json[i].u,
					disc = json[i].n;
					$('<div></div>').html('<a href="'+url+'"<h3>'+title+'</h3></a><p>'+disc+'</p><hr>').appendTo('#popular-element');


				}

			},
			error:function() {
				alert('もう一度試してください。');
			}
		});
	}






	// function switchTab(){
		
	// 	console.log(menuType);
	// 	for(key in tabclicked){
	// 		tabclicked[key]=false;
	// 		console.log(tabclicked[key]);
	// 	}
	// 	tabclicked[menuType]=true;
	// 	console.log(tabclicked);

	// }


	// tab click
	$('.menu').click(function(){
		menuType = $(this).attr('data-menu');
		if(menuType=='user') clickUser();
		if(menuType=='tag') clickTag();
		if(menuType=='popular') clickPopular();

		
		$(this).addClass('menu_active');


		$('#element').html('');
		$.ajax({
			type:'GET',
			url:'http://feeds.pinboard.in/json/'+menuType,
			dataType:'jsonp',
			jsonp:'cb',
			success:function(json){
				if(tabclicked[menuType]==true){
					for(i=0;i<10;i++){
						var title = json[i].d,
						url = json[i].u,
						disc = json[i].n;
						$('<div></div>').html('<a href="'+url+'"<h3>'+title+'</h3></a><p>'+disc+'</p><hr>').appendTo('#element');

						console.log(title);
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				alert('もう一度試してください。');
			}
		});


	});


	$('#search-btn').click(function(){
		var word = $('#search-word').val();
		console.log(word);

		$.ajax({
			type:'GET',
			url:'http://feeds.pinboard.in/json/'+menuType+':'+word,
			dataType:'jsonp',
			jsonp:'cb',
			success:function(json){
				$('#element').html('');
				for(i=0;i<10;i++){
					var title = json[i].d,
					url = json[i].u,
					disc = json[i].n;
					$('<div></div>').html('<a href="'+url+'"<h3>'+title+'</h3></a><p>'+disc+'</p>').appendTo('#element');

					console.log(title);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				alert('もう一度試してください。');
			}
		});


	});


});