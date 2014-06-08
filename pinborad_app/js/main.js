$(function(){
	var menuType;
	$('[data-menu="user"]').addClass('menu_active');
	clickUser();

	function clickUser(){
		$('.tag-content,.popular-content').css('display','none');
		$('.user-content').css('display','block');

		$('#user-search-btn').click(function(){
			searchWord = $('#user-search-word').val();
			if(searchWord!==""){
			loadUserArticle();
		}else{
			$('#user-erorr-msg').html('タグ名を入力してください');
		}
		});

		$('#user-recomend-list > li > a').click(function(){
			searchWord = $(this).html();
			$('#user-search-word').val(searchWord);
			console.log(searchWord);
			loadUserArticle();
		});
	}

	function loadUserArticle(){
		$('#user-erorr-msg').empty();
		$('#user-recomend-area').css('display','none');
		$('#user-element').html('');
		$('.loading').html('<img src="img/ajax-loader.gif">');
		$.ajax({
			type:'GET',
			url:'http://feeds.pinboard.in/json/u:'+searchWord,
			dataType:'jsonp',
			jsonp:'cb',
			success:function(json){
				$('.loading').empty();
				for(i=0;i<10;i++){
					var title = json[i].d,
					url = json[i].u,
					disc = json[i].n;
					$('<div></div>').html('<a href="'+url+'"<h3>'+title+'</h3></a><p class="disc">'+disc+'</p><hr>').appendTo('#user-element');

					console.log(title);
				}

			},
			error:function() {
				alert('もう一度試してください。');
			}
		});
	}



	function clickTag(){
		$('.user-content,.popular-content').css('display','none');
		$('.tag-content').css('display','block');

		$('#tag-search-btn').click(function(){
			searchWord = $('#tag-search-word').val();
			if(searchWord!==""){
				loadTagArticle();
			}else{
				$('#tag-erorr-msg').html('タグ名を入力してください');
			}
		});

		$('#tag-recomend-list > li > a').click(function(){
			searchWord = $(this).html();
			$('#tag-search-word').val(searchWord);
			console.log(searchWord);
			loadTagArticle();
		});


	}

	function loadTagArticle(){
		$('#tag-erorr-msg').empty();
		$('#tag-recomend-area').css('display','none');
		$('#tag-element').html('');
		$('.loading').html('<img src="img/ajax-loader.gif">');
		$.ajax({
			type:'GET',
			url:'http://feeds.pinboard.in/json/t:'+searchWord,
			dataType:'jsonp',
			jsonp:'cb',
			success:function(json){
				$('.loading').empty();
				for(i=0;i<10;i++){
					var title = json[i].d,
					url = json[i].u,
					disc = json[i].n;
					$('<div></div>').html('<a href="'+url+'"<h3>'+title+'</h3></a><p class="disc">'+disc+'</p><hr>').appendTo('#tag-element');

					console.log(title);
				}

			},
			error:function() {
				alert('もう一度試してください。');
			}
		});
	}


	function clickPopular(){
		$('.user-content,.tag-content').css('display','none');
		$('.popular-content').css('display','block');
		$('#popular-element').html('');
		$('.loading').html('<img src="img/ajax-loader.gif">');
		$.ajax({
			type:'GET',
			url:'http://feeds.pinboard.in/json/popular',
			dataType:'jsonp',
			jsonp:'cb',
			success:function(json){
				$('.loading').empty();
				for(i=0;i<10;i++){
					var title = json[i].d,
					url = json[i].u,
					disc = json[i].n;
					$('<div></div>').html('<a href="'+url+'"<h3>'+title+'</h3></a><p class="disc">'+disc+'</p><hr>').appendTo('#popular-element');


				}

			},
			error:function() {
				alert('もう一度試してください。');
			}
		});
	}



	// tab click
	$('.menu').click(function(){
		menuType = $(this).attr('data-menu');
		$('[data-menu]').removeClass('menu_active');
		$(this).addClass('menu_active');
		if(menuType=='user') clickUser();
		if(menuType=='tag') clickTag();
		if(menuType=='popular') clickPopular();
	});


	

});