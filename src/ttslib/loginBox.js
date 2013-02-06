define(['base','common','css!assets/css/open_style.css','css!assets/css/unite.css'],function(TTS,Common){
	var T = TTS,
		baseUrl = T.baseUrl;
	TTS.extend({
		loginBox : function(params){
			var complete = function(){window.location.reload()};//默认行为是刷新
			if(params && params.complete){
				complete = params.complete;
			}
			//错误提示，验证路径，验证码路径，cookie操作，第三方登录操作
			if(T.byId('faqdiv')!=null){
				T.show('faqbg');
				T.show('faqdiv');
			}else{
				require(['text!assets/template/loginBox.html!strip'],function(html){
					var wrapperDiv = document.createElement('div');
					document.body.appendChild(wrapperDiv);
					wrapperDiv.innerHTML = html;
					T.byId('trip8080LoginBoxClose').onclick = function(){
					T.hide('faqbg');
					T.hide('faqdiv');
				};
				
				//用户名框
				var nameInputDom = T.byId('trip8080LoginNameInput');
				nameInputDom.onclick = function(){
					this.className = 'loginInput loginInputBlue';
					var nameTipDom = T.byId('trip8080LoginNameTip');
					nameTipDom.innerHTML = '您可使用昵称或已验证的手机号、邮箱进行登录';
					nameTipDom.className = 'left loginleft60 trip8080Col999 loginbottom9';
				};
				
				nameInputDom.onblur = function(){
					var username = this.value;
					var nameTipDom = T.byId('trip8080LoginNameTip');
					nameTipDom.innerHTML = '';
					if(!Common.isNull(username) && (!Common.isNickName(username) && !Common.isEmail(username))){
						nameTipDom.innerHTML = '用户名输入不正确';
						nameTipDom.className = 'left loginleft60 trip8080Red loginbottom9';
						this.className = 'loginInput loginInputRed';
					}else if(!Common.isNull(username) && !Common.isEmail(username) && !Common.isMobile(username) && !Common.isNickName(username)){
						nameTipDom.innerHTML = '用户名输入不正确';
						nameTipDom.className = 'left loginleft60 trip8080Red loginbottom9';
						this.className = 'loginInput loginInputRed';
					}else if(!Common.isNull(username) && Common.isDigit(username)&& !Common.isMobile(username)){
						nameTipDom.innerHTML = '用户名输入不正确';
						nameTipDom.className = 'left loginleft60 trip8080Red loginbottom9';
						this.className = 'loginInput loginInputRed';
					}else if(!Common.isNull(username)&&(Common.isNickName(username)||Common.isMobile(username)||Common.isEmail(username))){
						T.jsonp({
							url : baseUrl + 'login/vertifyusername.jspx?username='+username,
							callback : function(response){
								var nameTipDom = T.byId('trip8080LoginNameTip');
								if(response.mobileFlag=="true" && Common.isMobile(username)){
									nameTipDom.innerHTML = '该手机号未验证，请您使用昵称登录';
									nameTipDom.className = 'left loginleft60 trip8080Red loginbottom9';
									T.byId('trip8080LoginNameInput').className = 'loginInput loginInputRed';
								}else if(response.emailFlag=="true" && Common.isEmail(username)){
									nameTipDom.innerHTML = '该邮箱账号需验证后方可登录，请您使用昵称登录';
									nameTipDom.className = 'left loginleft60 trip8080Red loginbottom9';
									T.byId('trip8080LoginNameInput').className = 'loginInput loginInputRed';
								}else{
									nameTipDom.innerHTML = '';
									T.byId('trip8080LoginNameInput').className = 'loginInput loginInputBlue';
								}
							}
						})
					}
				};
				
				//密码框
				var loginPwdDom = T.byId('trip8080LoginPwd');
				loginPwdDom.onclick = function(){
					var pwdTipDom = T.byId('trip8080LoginPwdTip');
					pwdTipDom.innerHTML = '密码在6-30个字符或数字内。不能含有\'&%;()<>+空格等字符';
					pwdTipDom.className = 'left loginleft60 trip8080Col999  loginbottom9';
					this.className = 'loginInput loginInputBlue';
				};
				
				loginPwdDom.onblur = function(){
					var pwd = T.trim(this.value);
					var pwdTipDom = T.byId('trip8080LoginPwdTip');
					pwdTipDom.innerHTML = '';
					if(!Common.isNull(pwd) && !Common.isString6_30(pwd)){
						pwdTipDom.innerHTML = '密码不能含有\'&%;()<>+*-!#$%空格等字符';
						pwdTipDom.className = 'left loginleft60 trip8080Red  loginbottom9';
						this.className = 'loginInput loginInputRed';
					}else if(!Common.isNull(pwd) && Common.isString6_30(pwd)){
						if(pwd.length<6){
							pwdTipDom.innerHTML = '密码不能小于6个字符或数字';
							pwdTipDom.className = 'left loginleft60 trip8080Red  loginbottom9';
							this.className = 'loginInput loginInputRed';
						}else if(pwd.length>30){
							pwdTipDom.innerHTML = '密码不能大于30个字符或数字';
							pwdTipDom.className = 'left loginleft60 trip8080Red  loginbottom9';
							this.className = 'loginInput loginInputRed';
						}
					}
				};
				
				loginPwdDom.onkeydown =  function(e){
					e = e || window.event;
	//				alert(e.keyCode);
					if(e.keyCode == 13){
						T.byId('trip8080LoginBtn').onclick();
					}
				}
				
				//登录按钮
				T.byId('trip8080LoginBtn').onclick = function(){
					var loginNameInput = T.byId('trip8080LoginNameInput');
					var loginPwdInput = T.byId('trip8080LoginPwd');
	//				loginNameInput.onblur();
					loginPwdInput.onblur();
					var loginNameTip =  T.byId('trip8080LoginNameTip');
					var loginPwdTip = T.byId('trip8080LoginPwdTip');
					var nameTip = loginNameTip.innerHTML;
					var pwdTip = loginPwdTip.innerHTML;
					
					var rememberMe = T.byId('trip8080RememberMe').checked;
					var autoLogin = T.byId('trip8080AutoLogin').checked;
					
					if(nameTip != '' || pwdTip != ''){
						return;
					}
					loginNameTip.innerHTML = '';
					pwdTip.innerHTML = '';
					this.disabled = 'disabled';
					
					var username = T.trim(loginNameInput.value);
					var pwd = T.trim(loginPwdInput.value);
					var captcha = T.trim(T.byId('trip8080Captcha').value);
					var fail=Common.getCookie("fail");
					var msg = '';
					if(Common.isNull(username)){
						msg += '用户名不能为空';
						loginNameInput.className =  'loginInput loginInputRed';
						loginNameTip.innerHTML = '用户名不能为空';
						loginNameTip.className = 'left loginleft60 trip8080Red loginbottom9';
					}
					if(Common.isNull(pwd)){
						msg += '密码不能为空';
						loginPwdInput.className =  'loginInput loginInputRed';
						loginPwdTip.innerHTML = '密码不能为空';
						loginPwdTip.className = 'left loginleft60 trip8080Red loginbottom9';
					}
					if(+fail > 2 && Common.isNull(captcha)){
						msg += '验证码不能为空';
						alert('验证码不能为空');
					}
					
					if(msg != ''){
						this.disabled = '';
						return;
					}
					//登录
					T.jsonp({
						url :  baseUrl + 'login/login.jspx?username='+username+'&password='+pwd+'&captcha='+captcha+'&r='+Math.random()+'&type=get',
						callback : function(res){
							if(res.flag == 'true'){
								Common.saveCookie('fail','0',0,'/');
								var userId = res.userId;
								var userCode =res.userCode;
								var username=res.userName;
								
								T.byId('trip8080LoginNameInput').className = 'loginInput loginInputBlue';
								T.byId('trip8080LoginPwd').className = 'loginInput loginInputBlue';
								
								//记住密码
								if(rememberMe==true && autoLogin==false){
									Common.saveCookie("username1",username,"30","","","");
								}
								//自动登录
								if(rememberMe==true && autoLogin==true){
									Common.saveCookie("suserId",userId,30,"/");
									Common.saveCookie("SUI",userId,30,"/");
									Common.saveCookie("SUC",userCode,30,"/");
									Common.saveCookie("SUN",username,30,"/");
								}
								complete();
	//							window.location.reload();
							}else{
								if(res.code == '0000'){
									alert('验证码错误');
								}else{
									alert('用户名或密码错误');
								}
								var fail=Common.getCookie("fail");
								var failCount = res.failCount;
								if(failCount>3){
									fail = 3;
								}
								fail = +fail + 1;
								Common.saveCookie('fail',fail,1,'/');
								if(fail > 2){
									T.show('trip8080CaptchaSpan');
									T.byId('trip8080CaptchaSrc').src = domain+'login/captcha.jspx?ts='+new Date().getTime();
								}
								T.byId('trip8080LoginNameInput').className = 'loginInput loginInputRed';
								T.byId('trip8080LoginPwd').className = 'loginInput loginInputRed';
							}
							T.byId('trip8080LoginBtn').disabled = '';
						}
					})
					return false;
				};
				//QQ登录
				T.byId('trip8080QQLogin').onclick = function(){
					var url = baseUrl + 'login/uniteLogin.jsp?to=qq&backurl=' + location.href;
					window.open(url, 'oauth2Login_10604' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes');
				};
				//新浪登录
				T.byId('trip8080SinaLogin').onclick = function(){
					var url = baseUrl + 'login/uniteLogin.jsp?to=sina&backurl=' + location.href;
					window.open(url, 'oauth2Login_10604' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes');
				};
				T.byId('faqbg').style.height = document.documentElement.scrollHeight +'px';
				T.show('faqbg');
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				T.byId('faqdiv').style.top = document.documentElement.clientHeight/2 + scrollTop - 205 + 'px';
				T.byId('faqdiv').style.left = document.documentElement.clientWidth/2 - 275 + 'px';
				T.show('faqdiv');
				var failCount = Common.getCookie('fail');
				if(+failCount>2){
					T.show('trip8080CaptchaSpan');
					T.byId('trip8080CaptchaSrc').src = domain+"login/captcha.jspx?ts="+new Date().getTime();
				}
				})
			}
			
			
		}
	})
	return TTS;
})