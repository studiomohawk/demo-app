$(function(){
	$.ajax({
		type:'GET',
		url:'http://feeds.pinboard.in/json/popular/',
		dataType:'jsonp',
		jsonp:'cb',
		success:function(json){
			var re = $.parseJSON(json);
			var title = json[0].d;
			console.log(title);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$("#XMLHttpRequest").html("XMLHttpRequest : " + XMLHttpRequest.status);
			$("#textStatus").html("textStatus : " + textStatus);
			$("#errorThrown").html("errorThrown : " + errorThrown.message);
		}
	});
});