
function clsChkRegister ( form, objSelf )
{
	var tem = "";
	if ( objSelf == null ) objSelf = 'clsChkRegister';
	
	this.objSelf = objSelf;
	this.passed = false;
	this.objForm = document.getElementById (form);
	this.className = [ 'boxNormal', 'boxError', 'boxOK', 'boxWaiting' ];
	this.checkItems = [ "Username","Nickname",  "Password", "PasswordConfirm",  "Email","Code" ,"service" ];
	this.currentUser = null;

	this.messages = {
		'Username'				: '英文字母开头,数字和下划线组成,4-20个字符',	
		'Nickname'				: '论坛昵称，汉字和英文组成，在4-14字符之间',
		'Password'				: '数字和字母组成，长度为6-20个字符',		
		'PasswordConfirm'	: '再次输入密码以保证密码无误',
		'Email'					: '找回密码的唯一途径，请填写您的真实邮箱'	,
		'Code'					: ''	,
		'service': ''
	};

	// 提交注册信息时验证
	this.checkForm = function ()
	{	
		//暂停注册
		//alert("系统维护,暂停注册！");
		//return false;
		/*
		this.passed = true;
		
		for ( var i = 0; i < this.checkItems.length; i ++ )
		{
			obj = document.getElementById ( "tip" + this.checkItems[i] );
			
			if ( obj.className != this.className[2] )
			{
				
				var check = eval ( "this.check" + this.checkItems[i] + "()" );
				if ( check == 'checking' )
				{
					this.passed = false;
				}
				else
				{
					
					this.passed = this.passed && check;
				}
			}
		}
		return this.passed;
		*/
		if(this.checkUsername()&&this.checkPassword()&&this.checkPasswordConfirm()&&this.checkEmail()&&this.checkCode()&&this.checkservice())
			return true;
		return false;
	}

	// 显示所有提示
	this.showAllTips = function ()
	{
		for ( var i in this.checkItems )
		{
			var obj;
			if ( obj = document.getElementById ( 'tip' + this.checkItems[i] ) )
			{
				obj.innerHTML = eval ( "this.messages." + this.checkItems[i] );
			}
		}
	}

	this.showTip = function ( chkItem, tipType, message )
	{
		var obj;
		if ( obj = document.getElementById ( 'tip' + chkItem ) )
		{
			
			if ( tipType == null ) tipType = 0;
			if ( message == null ) message = eval ( "this.messages." + chkItem );
				
				obj.style.display = "block";
				
			if ( tipType > 0 || obj.className != this.className[2] || obj.className == '' )
			{
				obj.innerHTML = message;
				obj.className = this.className[tipType];
			}
			
		}
	}
	
	this.hideTip = function ( chkItem )
	{
		var obj;
		if ( obj = document.getElementById ( 'tip' + chkItem ) )
		{
			if ( obj.className != this.className[2] )
			{
				obj.style.display = "none";
			}
		}
	}

	/****** 检验部分 ******/

	// 检查用户名
	this.checkUsername = function ( checkSystem )
	{
		
		var message = '';
		var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){3,19}$/;  
		
		if ( checkSystem == null ) checkSystem = true;
		
		if ( this.objForm.username.value.length == 0 )
		{
			message = "请填写帐号";
		}
		else if(!patrn.exec(this.objForm.username.value))
		{
			message = '英文字母开头,数字和下划线组成,为4-20个字符';
		}
		checkAccount();
		if ( message != '' ){
			this.showTip ( 'Username', 1, message );
			return false;
		}else{
			if(tem == 'yes'){
				return true;
			}else{
				return false;
			}
		}	
	}
	function checkAccount(){
		var username = document.getElementById("username").value;
		$.ajax({   
	        type:"POST",   
	        url:"/_un_ajx_acc.jsp",  
	        async:false,
	        data:"account="+username,   
	        success:callback   
	    });
	}
	function callback(data){
		if(data == "false"){
			clsChk.showTip ( 'Username', 1, "该帐号已经被注册");
			tem = "no";
		}else{
			clsChk.showTip ( 'Username', 2, '您填写的帐号可以注册');
			tem = "yes";
		}
	}

	// Ajax 检查帐号

	this.checkUsernameSystem = function ()
	{
		//this.showTip ( 'Username',3, '正在检测帐号...' );
		
//		//UserHandler.findAccounts (this.objForm.username.value,this.callbackCheckUsername);
	}

	// 检查帐号回调函数
	this.callbackCheckUsername = function (ret)
	{	
		var clsChk = new clsChkRegister ( "registerForm", "clsChk" );
		
		if (ret==true)
		{
			clsChk.showTip ( 'Username', 1, "您填写的帐号已经被注册了" );
			return false;
		}
		else if (ret==false)
		{
			
			clsChk.showTip ( 'Username', 2, '您填写的帐号可以注册' );
			
			return true;
		}
		
	}

	// 检查昵称
	this.checkNickname = function ( checkSystem )
	{
		var message = '';
		
		if ( checkSystem == null ) checkSystem = true;
		
		if ( this.objForm.nickname.value.length == 0 )
		{
			message = "请填写昵称";
		}
		else if ( this.objForm.nickname.value.indexOf (' ') >= 0 || this.objForm.nickname.value.indexOf ('\\') >= 0 || this.objForm.nickname.value.indexOf ('\'') >= 0 || this.objForm.nickname.value.indexOf ('\"') >= 0 || this.objForm.nickname.value.indexOf (',')>-1)
		{
			message = '昵称包含非法字符';
		}
		var str=this.objForm.nickname.value;
		var len=str.match(/[^ -~]/g) == null ? str.length : str.length + str.match(/[^ -~]/g).length ;
		if(len>14)
		{
			message = '论坛昵称，汉字和英文组成，在4-14字符之间';
		}	
		
		if ( message != '' )
		{
			this.showTip ( 'nickname', 1, message );
			return false;
		}
		else if ( checkSystem )
		{
			this.checkNicknameSystem ();
			return 'checking';
		}
		return true;
	}

//	// Ajax 检查昵称
	this.checkNicknameSystem = function ()
	{
		//this.showTip ( 'Nickname', 3, '正在检测昵称...' );
//		//UserHandler.findNickName (this.objForm.nickname.value,this.callbackCheckNickname);
	
	}

	// 检查昵称回调函数
	this.callbackCheckNickname = function (ret )
	{
		
		var clsChk = new clsChkRegister ( "registerForm", "clsChk" );
		
		if (ret==false)
		{
			clsChk.showTip ( 'Nickname', 2, '您填写的昵称可以成功注册' );
			return true;
		}
		else if (ret==true)
		{
			clsChk.showTip ( 'Nickname', 1, '您填写的昵称已经被注册了.' );
			return false;
		}
		else
		{
			clsChk.hideTip ( 'Nickname' );
		}
	}

	// 检查密码
	this.checkPassword = function ()
	{
		
		var message = '';
		if ( this.objForm.password.value.length == 0 )
		{
			message = "请填写密码";
		}
		else if ( this.objForm.password.value.length < 6 || this.objForm.password.value.length > 20 )
		{
			message = '密码长度必须为 6 - 20 字符';
		}
		else if ( this.objForm.password.value != '' && this.objForm.password.value == this.objForm.username.value )
		{
			message = '为了您的帐号安全，密码请不要与帐号相同。';
		}
		/*
		else if ( get_strong_level ( this.objForm.password.value, 6 ) < 2 )
		{
			message = '您的密码强度太弱';
		}
		*/
		
		
		if ( message != '' )
		{
			this.showTip ( 'Password', 1, message );
			return false;
		}
		else
		{
			this.showTip ( 'Password', 2, '填写正确' );
		
			if(document.getElementById ("passwordcfm").value=='')
			{	
				return this.checkPasswordConfirm();		
			}
			
			return true;
		}	
		
	}

	// 检查密码确认
	this.checkPasswordConfirm = function ()
	{
		var message = '';
		if ( this.objForm.passwordcfm.value != this.objForm.password.value )
		{
			message = '两次填写的密码不一致, 请检查并重新填写';
		}
		else if ( this.objForm.password.value == '' )
		{
			message = '请填写密码';
		}
		
		if ( message != '' )
		{
			this.showTip ( 'PasswordConfirm', 1, message );
			return false;
		}
		else
		{
			this.showTip ( 'PasswordConfirm', 2, '填写正确' );
			return true;
		}
	}

	this.checkEmail = function ( username, checkSystem )
	{
		var message = '';
		checkSystem = checkSystem != null ? checkSystem : true;
		if ( this.objForm.email.value.length == 0 )
		{
			message = "请填写您的邮箱地址";
		}
		else if(!regIsEmail(this.objForm.email.value))
		{
			message="邮件地址不正确";
		}
		else
		{
			this.showTip ( 'Email', 2, '填写正确' );
			return true;
		}
		if ( message != '' )
		{
			this.showTip ( 'Email', 1, message );
			return false;
		}
		else if ( checkSystem )
		{
			this.checkEmailSystem ();
			return 'checking';
		}
		return true;
	}

	this.checkservice = function ()
	{
		
		if ( !this.objForm.service.checked )
		{
			alert('请同意服务协议!');
			return false;
		}
		else
		{
			
			return true;
		}
	}

	this.checkEmailSystem = function ()
	{
		
		//this.showTip ( 'Email', 3, '正在检测邮箱地址...' );
//		////UserHandler.findEmail (this.objForm.email.value,this.callbackCheckEmail);
	}

	this.callbackCheckEmail = function ( ret)
	{
		
		var clsChk = new clsChkRegister ( "registerForm", "clsChk" );
		
		if (ret==false)
		{
			clsChk.showTip ( 'Email', 2, '您填写的邮箱地址可以使用' );
			return true;
		}
		else if ( ret==true )
		{
			clsChk.showTip ( 'Email', 1, "您填写的邮箱地址已经被注册了" );
			return false;
		}
		else
		{
			clsChk.hideTip ( 'Email' );
		}
	}

	// 检查验证码
	this.checkCode = function () {
		var message = "";
		var code = this.objForm.code.value;
		if (this.objForm.code.value.length == 0) {
			message = "\u8bf7\u586b\u5199\u9a8c\u8bc1\u7801";
		} else {
			if (this.objForm.code.value.length != 4) {
				message = "\u9a8c\u8bc1\u7801\u4e3a\u56db\u4f4d";
			} else {
				isRightCode();
				if(result.indexOf("success")<0){
					message ='验证码不正确！';
				}
			}
		}
		if (message != "") {
			this.showTip ( 'Code', 1, message );
			this.objForm.code.focus();
			return false;
		}
		return true;
	};
	
}

// 检查密码强度
function check_password_strong ( password )
{
	var strong = get_strong_level ( password, 6 );

	var objS1 = document.getElementById ( 'password_strong_1' );
	var objS2 = document.getElementById ( 'password_strong_2' );
	var objS3 = document.getElementById ( 'password_strong_3' );

	if ( strong == 1 )
	{
		objS1.className = 'pass_password_s1';
		objS2.className = 'pass_password_s0';
		objS3.className = 'pass_password_s0';
	}
	else if ( strong == 2 )
	{
		objS1.className = 'pass_password_s2';
		objS2.className = 'pass_password_s2';
		objS3.className = 'pass_password_s0';
	}
	else if ( strong >= 3 )
	{
		objS1.className = 'pass_password_s3';
		objS2.className = 'pass_password_s3';
		objS3.className = 'pass_password_s3';
	}
	else
	{
		objS1.className = 'pass_password_s0';
		objS2.className = 'pass_password_s0';
		objS3.className = 'pass_password_s0';
	}
}

function get_strong_level ( string, minLength )
{
	if ( minLength == null ) minLength = 1;
	if ( string.length < minLength )
	{
		return 0;
	}

	var ls = 0;
	if ( string.match(/[a-z]/ig ) )
	{
		ls ++;
	}
	if ( string.match(/[0-9]/ig ) )
	{
		ls ++;
	}
	if ( string.match(/(.[^a-z0-9])/ig ) )
	{
		ls ++;
	}
	if ( string.length >= 10 )
	{
		ls ++;
	}

	var firstChar = string.substr ( 0, 1 );
	var repeat = 1;
	for ( var i = 1; i < string.length; i ++ )
	{
		if ( string.substr ( i, 1 ) == firstChar )
		{
			repeat ++;
		}
		else
		{
			break;
		}
	}
	if ( string.length == repeat )
	{
		ls --;
	}

	var seq = '01234567890abcdefghijklmnopqrstuvwxyz';
	if ( seq.indexOf ( string.toLowerCase () ) >= 0 )
	{
		ls --;
	}

	ls = Math.max ( ls, 1 );

	return ls;
}

function getOptionValues ( obj )
{
	if ( typeof ( obj ) == 'string' )
	{
		obj = document.getElementById ( obj );
	}

	var arrTypes = new Array ();
	for ( var i = 0; i < obj.options.length; i ++ )
	{
		arrTypes.push ( obj.options[i].value );
	}
	var listValue = arrTypes.join ( ',' );
	return listValue;
}

function regIsEmail(fData)
    {
        var reg = new RegExp("^[0-9a-zA-Z\._-]+@[0-9a-zA-Z-_\.]+[\.]?[0-9a-zA-Z]$");
        return reg.test(fData);
    }
window.onload = function () {
		var obj=document.getElementById("username");
		
		if(obj!=null)
		{
			obj.focus();
		};
		
};
/*
var clsChk = new clsChkRegister ( "registerForm", "clsChk" );
		clsChk.checkItems = [ "Username","Nickname",  "Password", "PasswordConfirm", "Email" , "Code" ,"service"];
		clsChk.showAllTips();    
		*/