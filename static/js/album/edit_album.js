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
	$('#upload_back').uploadify({
		'buttonText'	:'背景图上传',
        'height'		:26,
        'preventCaching' : false,
		'queueID'		:'back_upload_queue',
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
			    var div_poster =  $("#back_poster_container").children("div").eq(0);
				div_poster.children("img").attr('src',resp.pic_url);
				var banner_data = {
				          'zIndex':0,
					  'cdn': resp.pic_url,
					  'md5': resp.pic_md5,
				 };
				$("input#back_img").val(JSON.stringify(banner_data));
			}
		}
	});	
	
})