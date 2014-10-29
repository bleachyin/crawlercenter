function getCookie(name) {
	var cookieValue = null;
  if (document.cookie && document.cookie != '') {
  	var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
    	var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
      	cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
$(document).ready(function(){
    $('#upload_poster_1').uploadify({
			'buttonText'	:'精灵图',
            'height'		:26,
            'width'         :86,
            'preventCaching' : false,
			'multi'    		:true,
			'queueID'		:'poster_upload_queue',
			'fileSizeLimit'	:3*1024*1024,
			'fileTypeDesc' 	:'Image Files',
			'fileTypeExts'	:'*.gif; *.jpg; *.png',
			'swf'			:'/static/uploadify/uploadify.swf',
			'uploader'		:'/ajax/uploadposter',
			'formData'		:{'user':getCookie('user')},
			'onUploadSuccess'	:function(file, data, response){
				var result = JSON.parse(data);
				for (var i=0;i<result.data.length;++i){
					var resp = result.data[i];
				   // alert(resp.pic_url);
				    var div_poster =  $("#poster_container").children("div").eq(0);
					div_poster.children("img").attr('src',resp.pic_url);
					div_poster.children("input:hidden").val(resp.pic_md5);
				}
			}
		});	
		$('#upload_poster_2').uploadify({
			'buttonText'	:'文字图',
            'height'		:26,
            'width'         :86,
            'preventCaching' : false,
			'multi'    		:true,
			'queueID'		:'poster_upload_queue',
			'fileSizeLimit'	:3*1024*1024,
			'fileTypeDesc' 	:'Image Files',
			'fileTypeExts'	:'*.gif; *.jpg; *.png',
			'swf'			:'/static/uploadify/uploadify.swf',
			'uploader'		:'/ajax/uploadposter',
			'formData'		:{'user':getCookie('user')},
			'onUploadSuccess'	:function(file, data, response){
				var result = JSON.parse(data);
				for (var i=0;i<result.data.length;++i){
					var resp = result.data[i];
				   // alert(resp.pic_url);
				   var div_poster =  $("#poster_container").children("div").eq(1);
					div_poster.children("img").attr('src',resp.pic_url);
					div_poster.children("input:hidden").val(resp.pic_md5);
				}
			}
		});	
		$('#upload_poster_3').uploadify({
			'buttonText'	:'背景图',
            'height'		:26,
            'preventCaching' : false,
            'width'         :86,
			'multi'    		:true,
			'queueID'		:'poster_upload_queue_',
			'fileSizeLimit'	:3*1024*1024,
			'fileTypeDesc' 	:'Image Files',
			'fileTypeExts'	:'*.gif; *.jpg; *.png',
			'swf'			:'/static/uploadify/uploadify.swf',
			'uploader'		:'/ajax/uploadposter',
			'formData'		:{'user':getCookie('user')},
			'onUploadSuccess'	:function(file, data, response){
				var result = JSON.parse(data);
				for (var i=0;i<result.data.length;++i){
					var resp = result.data[i];
				   // alert(resp.pic_url);
				    var div_poster =  $("#poster_container").children("div").eq(2);
					div_poster.children("img").attr('src',resp.pic_url);
					div_poster.children("input:hidden").val(resp.pic_md5);
				}
			}
		});	
		$('#upload_poster_4').uploadify({
			'buttonText'	:'光线图',
            'height'		:26,
            'preventCaching' : false,
            'width'         :86,
			'multi'    		:true,
			'queueID'		:'poster_upload_queue_',
			'fileSizeLimit'	:3*1024*1024,
			'fileTypeDesc' 	:'Image Files',
			'fileTypeExts'	:'*.gif; *.jpg; *.png',
			'swf'			:'/static/uploadify/uploadify.swf',
			'uploader'		:'/ajax/uploadposter',
			'formData'		:{'user':getCookie('user')},
			'onUploadSuccess'	:function(file, data, response){
				var result = JSON.parse(data);
				for (var i=0;i<result.data.length;++i){
					var resp = result.data[i];
				   // alert(resp.pic_url);
				    var div_poster =  $("#poster_container").children("div").eq(3);
					div_poster.children("img").attr('src',resp.pic_url);
					div_poster.children("input:hidden").val(resp.pic_md5);
				}
			}
		});	
		
})