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
		$('#mibox1').uploadify({
		'buttonText'	:'上传盒子图标',
		'height'		:20,
		'width'			:98,
		'preventCaching' : false,
		'queueID'		:'icon_upload_queue',
		'fileSizeLimit'	:256*1024,
		'fileTypeDesc' 	:'Image Files',
		'fileTypeExts'	:'*.gif; *.jpg; *.png',
		'swf'			:'/static/uploadify/uploadify.swf',
		'uploader'		:'/ajax/uploadicon',
		'formData'		:{'_xsrf':$("input[name='_xsrf']").val(), 'user':getCookie('user'),'width':'200','height':'200'},
		'onUploadSuccess'	:function(file, data, response){
			var result = JSON.parse(data);			
			if(result.ret == 1){
				$('#icon_status').text("上传成功");
				$('img#mibox1_img').attr("src", result.url);
				$('input#mibox_md5').val(result.md5);
				$('#mibox1_checkbox').removeAttr("checked");
			}else if(result.ret == 3){
				$('#icon_name').text("");
				$('#icon_status').text("上传失败");
				alert("图片 "+ result.file_name+" 的尺寸不符合要求，请检查!");
			}
			$('div[class="statusBar-icon"]').show();
		}
	});
	$('#mitv1').uploadify({
		'buttonText'	:'上传TV图标',
		'height'		:20,
		'width'			:98,
		'preventCaching' : false,
		'queueID'		:'icon_upload_queue',
		'fileSizeLimit'	:256*1024,
		'fileTypeDesc' 	:'Image Files',
		'fileTypeExts'	:'*.gif; *.jpg; *.png',
		'swf'			:'/static/uploadify/uploadify.swf',
		'uploader'		:'/ajax/uploadicon',
		'formData'		:{'_xsrf':$("input[name='_xsrf']").val(), 'user':getCookie('user'),'width':'284','height':'160'},
		'onUploadSuccess'	:function(file, data, response){
			var result = JSON.parse(data);			
			if(result.ret == 1){
				$('#icon_status').text("上传成功");
				$('img#mitv1_img').attr("src", result.url);
				$('input#mitv_md5').val(result.md5);
			}else if(result.ret == 3){
				$('#icon_name').text("");
				$('#icon_status').text("上传失败");
				alert("图片 "+ result.file_name+" 的尺寸不符合要求，请检查!");
			}
			$('div[class="statusBar-icon"]').show();
		}
	});
});