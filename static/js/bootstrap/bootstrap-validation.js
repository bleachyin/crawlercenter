/* =========================================================
 * bootstrap-validation.js 
 * Original Idea: http:/www.newkou.org (Copyright 2012 Stefan Petre)
 * Updated by 不会飞的羊 (https://github.com/FateSheep/Validation-for-Bootstrap)
 * =========================================================
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function($) {
    $.fn.validation = function(options) {
        return this.each(function() {
            globalOptions = $.extend({}, $.fn.validation.defaults, options);
            validationForm(this)
        });
    };
    
    $.fn.validation.defaults = {
        validRules : [
            {name: 'sixchar', validate: function(value) {return ($.trim(value)==''|| $.trim(value).length > 8 );}, defaultMsg: '请输入不超过6个汉字'},
            {name: 'required', validate: function(value) {return ($.trim(value) == '');}, defaultMsg: '请输入内容。'},
            {name: 'number', validate: function(value) {return (!/^[0-9]\d*$/.test(value));}, defaultMsg: '请输入数字。'},
            {name: 'mail', validate: function(value) {return (!/^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/.test(value));}, defaultMsg: '请输入邮箱地址。'},
            {name: 'char', validate: function(value) {return (!/^[a-z\_\-A-Z]*$/.test(value));}, defaultMsg: '请输入英文字符。'},
            {name: 'chinese', validate: function(value) {return (!/^[\u4e00-\u9fff]$/.test(value));}, defaultMsg: '请输入汉字。'}
        ]
    };

    var formState = false, fieldState = false, wFocus = false, globalOptions = {};

    var validateField = function(field, valid) { // 验证字段
        var el = $(field), error = false, errorMsg = '';
        for (i = 0; i < valid.length; i++) {
            var x = true, flag = valid[i], msg = (el.attr(flag + '-message')==undefined)?null:el.attr(flag + '-message');;
            if (flag.substr(0, 1) == '!') {
                x = false;
                flag = flag.substr(1, flag.length - 1);
            }

            var rules = globalOptions.validRules;
            for (j = 0; j < rules.length; j++) {
                var rule = rules[j];
                if (flag == rule.name) {
                    if (rule.validate.call(field, el.val()) == x) {
                        error = true;
                        errorMsg = (msg == null)?rule.defaultMsg:msg;
                        break;
                    }
                }
            }

            if (error) {break;}
        }

        var controls = el.parents('.controls'), controlGroup = el.parents('.control-group'), errorEl = controls.children('.help-block, .help-inline');

        if (error) {
            if (!controlGroup.hasClass('error')) {
                if (errorEl.length > 0) {
                    var help = errorEl.text();
                    controls.data('help-message', help);
                    errorEl.text(errorMsg);
                } else {
                    controls.append('<span class="help-inline">'+errorMsg+'</span>');
                }
                controlGroup.addClass('error');
            }
        } else {
            if (fieldState) {
                if (errorEl.length > 0) {
                    var help = controls.data('help-message');
                    if (help == undefined) {
                        errorEl.remove();
                    } else {
                        errorEl.text(help);
                    }
                }
                controlGroup.attr('class','control-group');
            } else {
                if (errorEl.length > 0) {
                    var help = errorEl.text();
                    controls.data('help-message', help);
                }
            }
        }
        return !error;
    };

    var validationForm = function(obj) { // 表单验证方法
        $(obj).submit(function() { // 提交时验证
            if (formState) { // 重复提交则返回
                return false;
            }
            formState = true;
            var validationError = false;
            $('input, textarea', this).each(function () {
                var el = $(this), valid = (el.attr('check-type')==undefined)?null:el.attr('check-type').split(' ');
                if (valid != null && valid.length > 0) {
                    if (!validateField(this, valid)) {
                        if (wFocus == false) {
                            scrollTo(0, el[0].offsetTop - 50);
                            wFocus = true;
                        }

                        validationError = true;
                    }
                }
            });

            //先临时写一个checkbox不能为空的验证
            var war_string="";
            var device = $("input[name='device']");
            if(device.is(':checked')==false){war_string+="请至少选择一种支持设备.\n";validationError=true;}
            var android_box = $("input[name='android_ver']");
            if(android_box.is(':checked')==false){war_string+="请至少选择一种android版本.\n";validationError=true;}
            var category_box = $("input[name^=cat]");
            if(category_box.is(':checked')==false){
                var subcategory_box = $("input[name^=subcat]");
	            if(subcategory_box.is(':checked')==false){
	                war_string+="请至少选择一种类别.\n";validationError=true;
	            }
            }
            var apk_file_name = $("input[name='install_url']").val()
            if (apk_file_name == null ||apk_file_name.length == 0){
            	war_string+="请上传有效的APK文件.\n";validationError=true;
            }
            var icon_url = $("input[name='mibox1_icon_url']").val()
            var icon_tv_url = $("input[name='mitv1_icon_url']").val()
            if ((icon_url == null ||icon_url.length == 0) && (icon_tv_url == null ||icon_tv_url.length == 0)){
            	war_string+="请上传有效的图标文件.\n";validationError=true;
            }	
            
            var screenshots_count = $("#myCarouseItems").children(".item").length
            if (screenshots_count < 3){
                war_string+="视频截图只有"+screenshots_count+"张,不能少于3张.\n";
                validationError=true;
            }
            
            
            if(war_string!="")alert(war_string);
          
            
            
            wFocus = false;
            fieldState = true;

            if (validationError) {
                formState = false; 

                $('input, textarea').each(function() {
                    var el = $(this), valid = (el.attr('check-type')==undefined)?null:el.attr('check-type').split(' ');
                    if (valid != null && valid.length > 0) {
                        el.focus(function() { // 获取焦点时
                            var controls = el.parents('.controls'), controlGroup = el.parents('.control-group'), errorEl = controls.children('.help-block, .help-inline');
                            if (errorEl.length > 0) {
                                var help = controls.data('help-message');
                                if (help == undefined) {
                                    errorEl.remove();
                                } else {
                                    errorEl.text(help);
                                }
                            }
                            controlGroup.attr('class','control-group');
                        });

                        el.blur(function() { // 失去焦点时
                            validateField(this, valid);
                        });
                    }
                });
                
                return false;
            }

            return true;
        });


    };
}(window.jQuery);