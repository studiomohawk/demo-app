$(function(){
	var menuType;
	var recomendUser = ["studiomohawk","studiomohawk","studiomohawk"];
	var recomendTag = ["javascript","chrome","browser","business"];
	$('.menu').click(function(){
		$(this).addClass('menu_active');
		 menuType = $(this).attr('data-menu');
		if(menuType!=='popular'){
			$('.form-group,#recomend-area').css('display','block');
			if(menuType=="u"){
				$('#recomend-area > p').html('おすすめのユーザー');
				for(i=0;i<recomendUser.length;i++){
					$('li').html(recomendUser[i]).appendTo('#recomend-list');
				}
				
			}
		}else{
			$('.form-group,#recomend-area').css('display','none');
			
		}


		$('#element').html('');
		$.ajax({
			type:'GET',
			url:'http://feeds.pinboard.in/json/'+menuType,
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