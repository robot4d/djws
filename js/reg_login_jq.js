var valid_user_name = new Boolean("false");
var valid_user_pwd = new Boolean("false");
var valid_user_repwd = new Boolean("false");
var valid_user_mail = new Boolean("false");
var valid_code = new Boolean("false");
var valid_user_real_name = new Boolean("true");
var valid_user_sfz = new Boolean("true");

$(window).ready(function(){

if (window.location.href.indexOf('reg.php') >= 0){
    $("#login_name").blur( function () { check_user_name(); } ); 
    $("#login_password").blur( function () { check_user_pwd(); } ); 
    $("#relogin_pwd").blur( function () { check_user_repwd(); } ); 
    $("#email").blur( function () { check_user_mail(); } ); 
    $("#chk_code").blur( function () { check_code(); } ); 
    $("#ture_name").blur( function () { check_user_real_name(); } ); 
    $("#sfz").blur( function () { check_user_sfz(); } ); 

    $("input").focus(function(){ $(this).attr("class","inputA"); });
    $("input").blur(function(){ $(this).attr("class",""); });
}   
});

function check_all(){

    check_user_name();
    if(!valid_user_name){
       return false; 
    }

    check_user_pwd();
    if(!valid_user_pwd){
        return false;
    }

    check_user_repwd();
    if(!valid_user_repwd){
        return false;
    }

    check_user_mail();
    if(!valid_user_mail){
        return false;
    }

if (window.location.href.indexOf('reg.php') >= 0){
    check_code();
    if(!valid_code){
        return false;
    }
}

    if (valid_user_name && valid_user_pwd && valid_user_repwd && valid_user_mail){
        if (window.location.href.indexOf('reg.php') >= 0){
            if (valid_code){
                //document.forms["myform"].submit();
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }else{
        return false;
    }

}

function check_user_name(){
    var user_name = $("#login_name").val();
    var msg = '';
    var jgpattern =/^[A-Za-z0-9]+$/;    

    show("u_info","正在检查...","black","msgx msgD");

    if (user_name == ''){
        msg = "请填入用户名称！";
    }else if (user_name.length <3 || user_name.length >20){
        msg = '用户名请用字母或数字，字数3到20之间！';
    }else if (user_name.indexOf('4399')>=0){
        msg = '用户名含有非法字符串';
    }else if (!jgpattern.test(user_name)){
        msg = '用户名含有非法字符串';
    }
    
    if (msg != ''){
        show('u_info',msg,'red','msgx msgC');
        valid_user_name = false;
    }else{
        $.ajax({
            type: "GET",
            url: "/api/reg/register.php?action=check&username="+user_name+"&temp="+(Math.round(Math.random()*10000)),
            cache: false,
            success: function(result){
                if (result != 1){
                    show('u_info',"该用户名已经被注册",'red','msgx msgC');
                    valid_user_name = false;
                }else{
                    show("u_info"," ","green","msgx msgB");
                    valid_user_name = true;
                }
            }
        });
    }

}

function check_user_pwd(){
    var user_pwd = $("#login_password").val();
    var msg = ''; 

    show("w_info","正在检查...","black","msgx msgD");
    
    if (user_pwd == ''){
        msg = '用户密码不能为空！';
    }else if(user_pwd.length < 6 || user_pwd.length >20){
        msg = '密码长度不对，请输入6-20位长度的密码！';
    }

    if (msg != ''){
        show('w_info',msg,'red','msgx msgC');
        valid_user_pwd = false;
    }else{
        show('w_info'," ",'green','msgx msgB');
        valid_user_pwd = true;
    }
}

function check_user_repwd(){
    var user_pwd = $("#login_password").val();
    var user_re_pwd = $("#relogin_pwd").val();

    show("p_info","正在检查...","black","msgx msgD");

    if (user_pwd == ''){
        show('p_info'," ",'','msgx');
        valid_user_repwd = false;
    }else if(user_pwd != user_re_pwd){
        show('p_info',"两次密码不一致",'red','msgx msgC');
        valid_user_repwd = false;
    }else{
        show('p_info'," ",'green','msgx msgB');
        valid_user_repwd = true;
    }
}

function check_user_mail(){
    var email = $('#email').val();
    var msg = '';
    var check_mail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;

    show("e_info","正在检查...","black","msgx msgD");

    if (email == ''){
        msg = '请输入电子邮箱！';
    }else if(!check_mail.test(email)){
        msg = '请检查您的电子邮箱格式！|示例：xxx@163.com|或者：xxx@qq.com|或者其他邮箱！';
    }

    if (msg != ''){
        show('e_info',msg,'red','msgx msgC');
        valid_user_mail = false;
    }else{
        $.ajax({
            type: "GET",
            url:"/api/reg/register.php?action=check&email="+email+"&temp="+(Math.round(Math.random()*10000)),
            cache: false,
            success:function(result){
                if (result != 1){
                    show('e_info',"邮箱已被使用",'red','msgx msgC');
                    valid_user_mail = false;
                }else{
                    show("e_info"," ","green","msgx msgB");
                    valid_user_mail = true;
                }
            }
        });
    }
}

function check_code(){
    var code = $('#chk_code').val();
    var msg = '';
    var check_code = /^\d{4}$/;

    show("code_info","正在检查...","black","msgx msgD");

    if (code == ''){
        msg = '请输入验证码！';
    }else if(!check_code.test(code)){
        msg = '验证码不正确！';
    }

    if (msg != ''){
        show('code_info',msg,'red','msgx msgC');
        valid_code = false;
    }else{
        $.ajax({
            type: "GET",
            url:"/api/reg/register.php?action=check&code="+code+"&temp="+(Math.round(Math.random()*10000)),
            cache: false,
            success:function(result){
                if (result != 1){
                    show('code_info',"验证码不正确！",'red','msgx msgC');
                    valid_code = false;
                }else{
                    show("code_info"," ","green","msgx msgB");
                    valid_code = true;
                }
            }
        });
    }
}

function check_user_real_name(){
    var real_name = $('#ture_name').val();
    var msg = '';

    if (real_name == ''){
        valid_user_real_name = true;
    }else{
        show("ture_name_info","正在检查...","black","msgx msgD"); 

        var str = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/;
        if (!str.test(real_name)){
            show('ture_name_info',"姓名格式不正确！",'red','msgx msgC');
            valid_user_real_name = false;
        }else {
            show('ture_name_info'," ",'green','msgx msgB');
            valid_user_real_name = true;
        }
    }
}

function check_user_sfz(){
    var user_sfz = $('#sfz').val();
    var msg = '';

    if (user_sfz == ''){
        valid_user_sfz = true;
    }else{
        show("sfz_info","正在检查...","black","msgx msgD");

        $.post(
            "/user/check_sfz.php",
            {type:"sfz",sfznum:""+user_sfz+""},
            function(result){
                if (result == 'no_standard'){
                    show('sfz_info',"你输入的身份证号码不规范",'red','msgx msgC');
                    valid_user_name = false;
                }else if(result == 'yes'){
                    show("sfz_info","身份证号码正确，为成年人","green","msgx msgB");
                    valid_user_name = true;
                }else{
                    show("sfz_info","身份证号码正确，为未成年人","green","msgx msgB");
                    valid_user_name = true;
                }
            }
        );
    }
}

function show(obj_id,msg_temp,color,class_name){
if (document.getElementById(obj_id)){
    var msg = msg_temp.split("|");
    $("#"+obj_id).html(msg[0]);
    $("#"+obj_id).attr("class",class_name);
    $("#"+obj_id).css("color",color);
}else{
    if ((color != "black" && color != "green") && msg_temp.replace(/(\s*$)/g, "") != ""){
        alert(msg_temp.replace(/\|/g,"\n"));
    }
}
}

function codeflush(){
    $("#c_code").attr("src","./validateImg.php?t="+Math.random());
    $("#chk_code").val("");
}

function check_log(){
    if($("#username").val()=='' || $("#password").val()==''){
        alert("请检查用户名和密码！");
        return false;
    }else{
        return true;
    }
}
