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

function deleteScreenShot(index, indicators, items, form) {
	var deletedIndicatorName = $('#myIndicator'+index)[0];
	var deletedItemName = $('#myItem'+index)[0];
	
	var indicatorColl = $(indicators)[0];
	var itemColl = $(items)[0];
	indicatorColl.removeChild(deletedIndicatorName);
	itemColl.removeChild(deletedItemName);
	var findActiveIndicator = false;
	var findActiveItem = false;
	for (var i=0;i<indicatorColl.childElementCount;++i){
		indicatorChild = indicatorColl.children[i];
		indicatorClass = indicatorChild.getAttribute("class");
		if (indicatorClass == "active"){
			findActiveIndicator = true;
		}
		itemChild = itemColl.children[i];
		itemClass = itemChild.getAttribute("class");
		if (itemClass == "item active"){
			findActiveItem = true;
		}
	}
	
	if (indicatorColl.childElementCount > 0) {
		if (findActiveIndicator == false) {
			indicatorChild = indicatorColl.children[0];
			indicatorChild.setAttribute("class", "active");
		}
		if (findActiveItem == false) {
			itemChild = itemColl.children[0];
			itemChild.setAttribute("class", "item active");
		}
	}
	
	var formName = "input[name='"+form+"']";
	var screen_shots_urls = $(formName).val();
	var screen_shots_objects = JSON.parse(screen_shots_urls);
	delete screen_shots_objects["picture"+index];
	$(formName).val(JSON.stringify(screen_shots_objects));	
}

function delete_video(index, indicators, items, form) {
	var deletedIndicatorName = $('#videoIndicator'+index)[0];
	var deletedItemName = $('#videoItem'+index)[0];
	
	var indicatorColl = $(indicators)[0];
	var itemColl = $(items)[0];
	indicatorColl.removeChild(deletedIndicatorName);
	itemColl.removeChild(deletedItemName);
	var findActiveIndicator = false;
	var findActiveItem = false;
	for (var i=0;i<indicatorColl.childElementCount;++i){
		indicatorChild = indicatorColl.children[i];
		indicatorClass = indicatorChild.getAttribute("class");
		if (indicatorClass == "active"){
			findActiveIndicator = true;
		}
		itemChild = itemColl.children[i];
		itemClass = itemChild.getAttribute("class");
		if (itemClass == "item active"){
			findActiveItem = true;
		}
	}
	
	if (indicatorColl.childElementCount > 0) {
		if (findActiveIndicator == false) {
			indicatorChild = indicatorColl.children[0];
			indicatorChild.setAttribute("class", "active");
		}
		if (findActiveItem == false) {
			itemChild = itemColl.children[0];
			itemChild.setAttribute("class", "item active");
		}
	}
	
	var formName = "input[name='"+form+"']";
	var video_urls = $(formName).val();
	var video_urls_objects = JSON.parse(video_urls);
	delete video_urls_objects["picture"+index];
	$(formName).val(JSON.stringify(video_urls_objects));	
}

function save_playurl(input_id,hidden_data){
    var inputName = "input[name='"+hidden_data+"']";
    var playurl = $("#"+input_id).val();
    var video_urls = $(inputName).val();
	var video_urls_objects = JSON.parse(video_urls);
    var video = video_urls_objects[""+input_id];
    video['playurl'] = playurl;
    $(inputName).val(JSON.stringify(video_urls_objects));	
    alert("成功保存播放地址:"+playurl);
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
				$('#mibox1_img').attr("src", result.url);
				$('#mibox1_checkbox').removeAttr("checked");
				$('#mibox1_checkbox').attr("checked", true);
				$('input[name="mibox1_icon_url"]').val(result.url);
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
				$('#mitv1_img').attr("src", result.url);
				$('#mitv1_checkbox').attr("checked", true);
				$('input[name="mitv1_icon_url"]').val(result.url);
			}else if(result.ret == 3){
				$('#icon_name').text("");
				$('#icon_status').text("上传失败");
				alert("图片 "+ result.file_name+" 的尺寸不符合要求，请检查!");
			}
			$('div[class="statusBar-icon"]').show();
		}
	});
	
	$('#upload_videos').uploadify({
		'buttonText'	:'上传视频截图',
		'height'		:30,
		'width'			:100,
		'multi'    		:true,
		'preventCaching' : false,
		'queueID'		:'video_upload_queue',
		'fileSizeLimit'	:2*1024*1024,
		'fileTypeDesc' 	:'Image Files',
		'fileTypeExts'	:'*.gif; *.jpg; *.png',
		'swf'			:'/static/uploadify/uploadify.swf',
		'uploader'		:'/ajax/uploadscreenshots',
		'formData'		:{'_xsrf':$("input[name='_xsrf']").val(), 'user':getCookie('user')},
		'onUploadSuccess'	:function(file, data, response){
			var result = JSON.parse(data);
			var videos_urls = $("input[name='videos_data']").val();
			var videos_urls_objects = JSON.parse(videos_urls);		
			var indicatorColl = $('#videoCarouselIndicators')[0];
			var itemColl = $('#videoCarouseItems')[0];
			var myCarouselCount = 0;
			if ($(indicatorColl).children('li').length > 0 )
			    myCarouselCount = parseInt(indicatorColl.lastChild.attributes['data-slide-to'].value)+1;
			for (var i=0;i<result.data.length;++i){
				var resp = result.data[i];
				if(resp.ret == 1){
					var newIndex = myCarouselCount++;
					var indicatorObj = document.createElement("li");
					indicatorObj.setAttribute("id",'videoIndicator'+newIndex);
					indicatorObj.setAttribute("data-target", "#videoCarousel");
					indicatorObj.setAttribute("data-slide-to", newIndex);
					var itemObj = document.createElement("div");
					var imgObj = document.createElement("img");
					var captionObj = document.createElement("div");
					imgObj.setAttribute("src", resp.pic_url);
					imgObj.setAttribute("alt", resp.thumbnail_url);
					captionObj.setAttribute("class", "carousel-caption");
					captionObj.innerHTML = '<h4>'+resp.file_name+'</h4>'+
					                       '<input id="picture'+newIndex+'" type="text"  />'+
					                       '<button type="button" class="btn" onclick="return save_playurl('+'\'picture'+newIndex+'\',\'videos_data\')">保存</button>' +
										   '<button type="button" class="btn btn-danger" onclick="return delete_video('+
										   	newIndex +
										   	',\'#videoCarouselIndicators\',\'#videoCarouseItems\',\'videos_data\');">删除</button>';
					itemObj.setAttribute("id",'videoItem'+newIndex);
					itemObj.appendChild(imgObj);
					itemObj.appendChild(captionObj);
					if (newIndex == 0) {
						indicatorObj.setAttribute("class", "active");
						itemObj.setAttribute("class", "item active");
					}
					else {
						itemObj.setAttribute("class", "item");
					}				
					indicatorColl.appendChild(indicatorObj);
					itemColl.appendChild(itemObj);
					
					videos_urls_objects["picture"+newIndex] = {
						'pic_url': resp.pic_url,
						'pic_md5': resp.pic_md5,
						'thumbnail_url': resp.thumbnail_url,
						'thumbnail_md5': resp.thumbnail_md5,
						'playurl':"",
					};					
				}else if(resp.ret == 3){
					alert(resp.file_name+" 图片尺寸不符合要求，请检查!");
				}else{
					alert(resp.file_name+" 上传失败!");
				}	
			}
			$('input[name="videos_data"]').val(JSON.stringify(videos_urls_objects));
		}
	});	
	
	$('#upload_screenshots').uploadify({
		'buttonText'	:'上传应用截图',
		'height'		:30,
		'width'			:100,
		'multi'    		:true,
		'preventCaching' : false,
		'queueID'		:'snapshot_upload_queue',
		'fileSizeLimit'	:2*1024*1024,
		'fileTypeDesc' 	:'Image Files',
		'fileTypeExts'	:'*.gif; *.jpg; *.png',
		'swf'			:'/static/uploadify/uploadify.swf',
		'uploader'		:'/ajax/uploadscreenshots',
		'formData'		:{'_xsrf':$("input[name='_xsrf']").val(), 'user':getCookie('user')},
		'onUploadSuccess'	:function(file, data, response){
			var result = JSON.parse(data);
			var screen_shots_urls = $("input[name='screen_shot']").val();
			var screen_shots_objects = JSON.parse(screen_shots_urls);		
			var indicatorColl = $('#myCarouselIndicators')[0];
			var itemColl = $('#myCarouseItems')[0];
			var myCarouselCount = 0
			if ($(indicatorColl).children('li').length > 0 )
			    myCarouselCount = parseInt($(indicatorColl).children('li:last').attr('data-slide-to'))+1;
			for (var i=0;i<result.data.length;++i){
				var resp = result.data[i];
				if(resp.ret == 1){
					var newIndex = myCarouselCount++;
					var indicatorObj = document.createElement("li");
					indicatorObj.setAttribute("id",'myIndicator'+newIndex);
					indicatorObj.setAttribute("data-target", "#myCarousel");
					indicatorObj.setAttribute("data-slide-to", newIndex);
					var itemObj = document.createElement("div");
					var imgObj = document.createElement("img");
					var captionObj = document.createElement("div");
					imgObj.setAttribute("src", resp.pic_url);
					imgObj.setAttribute("alt", resp.thumbnail_url);
					captionObj.setAttribute("class", "carousel-caption");
					captionObj.innerHTML = '<h4>'+resp.file_name+'</h4>'+
										   '<button type="button" class="btn btn-danger" onclick="return deleteScreenShot('+
										   	newIndex +
										   	',\'#myCarouselIndicators\',\'#myCarouseItems\',\'screen_shot\');">删除</button>';
					itemObj.setAttribute("id",'myItem'+newIndex);
					itemObj.appendChild(imgObj);
					itemObj.appendChild(captionObj);
					if (newIndex == 0) {
						indicatorObj.setAttribute("class", "active");
						itemObj.setAttribute("class", "item active");
					}
					else {
						itemObj.setAttribute("class", "item");
					}				
					indicatorColl.appendChild(indicatorObj);
					itemColl.appendChild(itemObj);
					
					screen_shots_objects["picture"+newIndex] = {
						'pic_url': resp.pic_url,
						'pic_md5': resp.pic_md5,
						'thumbnail_url': resp.thumbnail_url,
						'thumbnail_md5': resp.thumbnail_md5
					};					
				}else if(resp.ret == 3){
					alert(resp.file_name+" 图片尺寸不符合要求，请检查!");
				}else{
					alert(resp.file_name+" 上传失败!");
				}	
			}
			$('input[name="screen_shot"]').val(JSON.stringify(screen_shots_objects));
		}
	});	
	
	$('#upload_package').uploadify({
		'buttonText'		:'上传程序包',
		'fileTypeDesc' 	:'Apk Files',
		'fileSizeLimit'	:0,
		'successTimeout':500000,
		'height'		:30,
		'width'			:100,
		'fileTypeExts'	:'*.apk',
		'preventCaching' : false,
		'swf'				:'/static/uploadify/uploadify.swf',
		'uploader'         :'http://172.27.9.104:80/uploadfile?type=apk&_xsrf='+$("input[name='_xsrf']").val()+"&user="+getCookie('user'),
		'formData'			:{'_xsrf':$("input[name='_xsrf']").val(), 'user':getCookie('user')},
		
		'onSelect':function(file) {
		    var arr = new Array();
            arr = file.name.split(" ");
            if(arr.length != 1){
		         $('#upload_package').uploadify('cancel');
		         alert("请去掉文件名中的空格！");
		    }
            return;
        },
		'onUploadProgress' : function(file,fileBytesLoaded,fileTotalBytes,
                            queueBytesLoaded,swfuploadifyQueueUploadSize) {
           if (fileBytesLoaded >= fileTotalBytes){
              $('#upload_status').text("Apk文件已经上传到服务器中!请等待服务器处理。");
           }
        },
		'onUploadSuccess': function(file, data, response){
			var result = JSON.parse(data);
			$('#file_name').text(result.file_name);
			$('#file_size').text(result.format_file_size);
			if (result.ret == 1){
				$('#upload_status').text('上传成功');
			}else{
				$('#upload_status').text('上传失败');
			}
			$('#statusBar-upload').show();
			
			if (result.ret != 1){
			    if(result.flag == -1){
					alert("Package在数据库中已经存在,不允许上传,如需修改，请访问更新应用页面。");			    
			    }
			    return;
			}
			
			$('#upload_status').text('Apk文件正在向CDN中上传，请稍候...');
			//失败直接返回，不要再去强行赋值
  
			$('input[name="byte_size"]').val(result.byte_size);
			$('input[name="upload_time"]').val(result.upload_time);
			$('input[name="install_url_local"]').val(result.install_url_local);
			
			var apk_info = result.apk_info;
			$('input[name="apk_hash"]').val(apk_info.apk_hash)
			$('input[name="package_name"]').val(apk_info.package_name);
			$('input[name="apk_file_name"]').val(result.file_name)
			$('input[name="version_code"]').val(apk_info.version_code);
			$('input[name="version_name"]').val(apk_info.version_name);
			$('input[name="min_sdk_version"]').val(apk_info.min_sdk_version);
			$('input[name="target_sdk_version"]').val(apk_info.target_sdk_version);
			$('input[name="permission"]').val(JSON.stringify(apk_info.permission));
			$('input[name="android_ver"]').each(
					function(){
						var value = $(this).val();						
						var versions = result.compatible_versions
						for (var i=0; i<versions.length; i++ ){
							if(value == versions[i]){
								$(this).attr("checked", true);
							}
						}
					}
			);	
			
			$('input[name="install_url"]').val("");
            $.ajax({
              type:'POST',
              url:'/ajax/apktocdn',
              timeout: 600000,
              data:{'_xsrf':$("input[name='_xsrf']").val(), 'user':getCookie('user'),
                    'install_url_local':result.install_url_local,'filename':result.file_name},
              dataType: 'json',
              success:function(data){
                   if(data.ret == 2){
                       $('#upload_status').text('上传到CDN失败');
                   } else {     
	                    $('input[name="install_url"]').val(data.install_url);
	                    $('#upload_status').text('Apk文件已经成功上传到CDN中！');
	                    alert('Apk文件已经成功上传到CDN中！');
                }
               }
             }); 	
		}
	});
	
	var screen_shot_json_str = $('input[name="screen_shot"]').val()
	var videos_json_str = $('input[name="videos_data"]').val()
	var permission_json_str = $('input[name="permission"]').val()
	if(!screen_shot_json_str)$('input[name="screen_shot"]').val(JSON.stringify({}));	
	if(!videos_json_str)$('input[name="videos_data"]').val(JSON.stringify({}));	
	if(!permission_json_str)$('input[name="permission"]').val(JSON.stringify({}));	
	
	
});