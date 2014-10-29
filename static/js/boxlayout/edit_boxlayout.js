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
			'buttonText'	:'上传背景图片',
			'height'		:30,
			'width'			:100,
			'multi'    		:true,
			'preventCaching' : false,
			'queueID'		:'snapshot_upload_queue',
			'fileSizeLimit'	:2*1024*1024,
			'fileTypeDesc' 	:'Image Files',
			'fileTypeExts'	:'*.gif; *.jpg; *.png',
			'swf'			:'/static/uploadify/uploadify.swf',
			'uploader'		:'/ajax/uploadposter',
			'formData'		:{'_xsrf':$("input[name='_xsrf']").val(), 'user':getCookie('user')},
			'onUploadSuccess'	:function(file, data, response){
				var result = JSON.parse(data);
				for (var i=0;i<result.data.length;++i){
				    var max_back_index = parseInt($('input#max_back_index').val());
				    max_back_index++;
					var resp = result.data[i];
				    var div_new = "<div class=\"span2 margin-div\" id=\"_back_div_"+max_back_index+"\">"
                    div_new+="<input type=\"hidden\" id=\"back_data_"+max_back_index+"\">";
                    div_new+="<img class=\"poster_img\" src=\""+resp.pic_url+"\">";          
                    div_new+="<img class=\"add_small_icon\" onclick=\"delete_back_poster("+max_back_index+")\" src=\"http://file.market.xiaomi.com/download/679/b914967d79296a62f16da71a62b946b68dfe57b7/minus.png\"></div>";
                    $('input#max_back_index').val(max_back_index);
                    $('#back_poster_container').append(div_new);
                    $('.selectpicker').selectpicker('render');
                    var back_data = {
					   'cdn': resp.pic_url,
					   'md5': resp.pic_md5,
				  };
				  $("input#back_data_"+max_back_index).val(JSON.stringify(back_data));	
			   }
			}
		});	
		
	$('#upload_banner').uploadify({
			'buttonText'	:'上传banner',
            'height'		:26,
            'preventCaching' : false,
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
				    var div_poster =  $("#banner_poster_container").children("div");
					div_poster.find("img").attr('src',resp.pic_url);
					var banner_data = {
						  'cdn': resp.pic_url,
						  'md5': resp.pic_md5,
					 };
					$("#banner_hidden_data").val(JSON.stringify(banner_data));
				}
			}
		});	
		
	$('#upload_icon').uploadify({
			'buttonText'	:'上传icon',
            'height'		:26,
            'preventCaching' : false,
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
				    var div_poster =  $("#icon_poster_container").children("div");
					div_poster.find("img").attr('src',resp.pic_url);
					var icon_data = {
						  'cdn': resp.pic_url,
						  'md5': resp.pic_md5,
					 };
					$("#icon_hidden_data").val(JSON.stringify(icon_data));
				}
			}
		});	
	
})