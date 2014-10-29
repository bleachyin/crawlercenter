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
					   var div_new = "<div class=\"span2 margin-div\" id=\"_back_div_"+max_back_index+
                                  "\"><select class=\"selectpicker\" data-width=\"140px\" style=\"display: none;\">";
                                    div_new+="<option value=\"0\" selected=\"selected\">0</option>";
                       for (var k=1;k<10;k++){
                                 div_new+="<option value=\""+k+"\">"+k+"</option>";
                       }
                       div_new+="</select><input type=\"hidden\" id=\"back_data_"+max_back_index+"\">";
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
	$('#upload_fore').uploadify({
			'buttonText'	:'上传前景图片',
			'height'		:30,
			'width'			:100,
			'multi'    		:true,
			'preventCaching' : false,
			'queueID'		:'back_upload_queue',
			'fileSizeLimit'	: 2*1024*1024,
			'fileTypeDesc' 	:'Image Files',
			'fileTypeExts'	:'*.gif; *.jpg; *.png',
			'swf'			:'/static/uploadify/uploadify.swf',
			'uploader'		:'/ajax/uploadposter',
			'formData'		:{'_xsrf':$("input[name='_xsrf']").val(), 'user':getCookie('user')},
			'onUploadSuccess'	:function(file, data, response){
			    var result = JSON.parse(data);
				for (var i=0;i<result.data.length;++i){
				    var max_index = parseInt($('input#max_fore_index').val());
				    max_index++;
					var resp = result.data[i];
						var div_new = "<div class=\"span2 margin-div\" id=\"_fore_div_"+max_index+"\">"+
                                 "<select class=\"selectpicker\" data-width=\"140px\" style=\"display: none;\">";
                                 div_new+="<option value=\"0\" selected=\"selected\">0</option>";
                        for (var k=1;k<10;k++){
                                 div_new+="<option value=\""+k+"\">"+k+"</option>";
                             }
                       div_new+="</select><input type=\"hidden\" id=\"fore_data_"+max_index+"\">";
                       div_new+="<img class=\"poster_img\" src=\""+resp.pic_url+"\">";          
                       div_new+="<img class=\"add_small_icon\" onclick=\"delete_fore_poster("+max_index+")\" src=\"http://file.market.xiaomi.com/download/679/b914967d79296a62f16da71a62b946b68dfe57b7/minus.png\"></div>";
                       $('input#max_fore_index').val(max_index);
                       $('#fore_poster_container').append(div_new);
                       $('.selectpicker').selectpicker('render');
                       var fore_data = {
						  'cdn': resp.pic_url,
						  'md5': resp.pic_md5,
					  };
					  $("input#fore_data_"+max_index).val(JSON.stringify(fore_data));
				}
			}
		});	
		$('#upload_banner').uploadify({
			'buttonText'	:'Banner上传',
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
				    var div_poster =  $("#banner_poster_container").children("div").eq(0);
					div_poster.children("img").attr('src',resp.pic_url);
					var banner_data = {
						  'cdn': resp.pic_url,
						  'md5': resp.pic_md5,
					 };
					div_poster.children("input:hidden").val(JSON.stringify(banner_data));
				}
			}
		});	
	
})