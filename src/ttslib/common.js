try{
//网站公告
var trip8080_common_ads = '';
/*
trip8080_common_ads += '<div id = "reception" style="top:180px; right:10px;position:fixed;margin:0px;padding:0px;font-size:12px;background-color:white;z-index:9998;_position:absolute;_bottom:auto;_top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));" >';
trip8080_common_ads += '<p style="background:url(http://www.trip8080.com/img/xiaoyuanbj.jpg) no-repeat;height:6px;width:168px;"></p>';
trip8080_common_ads += '<div style="border-left:solid 1px #e2e2e2;border-right:solid 1px #e2e2e2;width:152px;padding: 8px 7px;">';
trip8080_common_ads += '<p style="color:#a30001;font-weight:bold;text-align:center;line-height:17px;font-size:13px;">2012年8月24日</p>';
//trip8080_common_ads += '<p style="color:#a30001;font-weight:bold;text-align:center;line-height:17px;font-size:13px;">更新维护公告</p>';
trip8080_common_ads += '<p style="text-align:center;line-height:15px;">http://www.trip8080.com</p>';
trip8080_common_ads += '<p style="text-align:center;line-height:15px;border-bottom:dashed 1px #cfcfcf;padding-bottom:5px;">[2012-08-24]</p>';
trip8080_common_ads += '<p style="padding:6px 0px 1px 0px;" >公告：</p>';
trip8080_common_ads += '<p style="text-indent:2em;line-height:16px;" >自8月24日23：00起至8月25日7：00,大庆移动公司对光缆线路进行升级维护，届时将暂停班次查询业务，待专线升级完成后即恢复此业务，特此告示，敬请旅客们相互转告。</p><input name="" type=" " style="background:url(http://www.trip8080.com/img/guanbi220.jpg) no-repeat;width:50px;height:20px;border:0;text-align:right;margin-left:95px;" onclick="closereception();"/>';
trip8080_common_ads += '</div>';
trip8080_common_ads += '<p style="background:url(http://www.trip8080.com/img/xiaoyuanbj.jpg) no-repeat 0px -6px;height:6px;width:168px;"></p>';
trip8080_common_ads += '</div>';
*/
document.write(trip8080_common_ads);function closereception(){$("#reception").slideUp("normal");}
}catch(e){}

function Common(){}Common.isNull=function(str){str=str.replace(/(^\s*)|(\s*$)/g,"");if(null==str||""==str){return true}else{return false}};Common.isDigit=function(str){var patrn=/^\d+$/;return patrn.test(str)};Common.isInteger=function(str){var patrn=/^([+-]?)(\d+)$/;return patrn.test(str)};Common.isPlusInteger=function(str){var patrn=/^([+]?)(\d+)$/;return patrn.test(str)};Common.isMinusInteger=function(str){var patrn=/^-(\d+)$/;return patrn.test(str)};Common.isFloat=function(str){var patrn=/^([+-]?)\d*\.\d+$/;return patrn.test(str)};Common.isPlusFloat=function(str){var patrn=/^([+]?)\d*\.\d+$/;return patrn.test(str)};Common.isMinusFloat=function(str){var patrn=/^-\d*\.\d+$/;return patrn.test(str)};Common.isChinese=function(str){var patrn=/[\u4E00-\u9FA5\uF900-\uFA2D]+$/;return patrn.test(str)};Common.isAcsii=function(str){var patrn=/^[\x00-\xFF]+$/;return patrn.test(str)};Common.isMobile=function(str){var patrn=/^0?1[3,4,5,8][0-9]{9}$/;return patrn.test(str)};Common.isPhone=function(str){var patrn=/^(0[\d]{2,3}-)?\d{6,8}(-\d{0,4})?$/;return patrn.test(str)};Common.isUrl=function(str){var patrn=/^http[s]?:\/\/[\w-]+(\.[\w-]+)+([\w-\.\/?%&=]*)?$/;return patrn.test(str)};Common.isEmail=function(str){var patrn=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;return patrn.test(str)};Common.isZipCode=function(str){var patrn=/^\d{6}$/;return patrn.test(str)};Common.isDate=function(str){if(!/\d{4}(\.|\/|\-)\d{1,2}(\.|\/|\-)\d{1,2}/.test(str)){return false}var r=str.match(/\d{1,4}/g);if(r==null){return false}var d=new Date(r[0],r[1]-1,r[2]);return(d.getFullYear()==r[0]&&(d.getMonth()+1)==r[1]&&d.getDate()==r[2])};Common.isString6_20=function(str){str=str.replace(/(^\s*)|(\s*$)/g,"");var patrn=/^(\w){6,20}$/;return patrn.test(str)};Common.isString6up=function(str){var patrn=/^(\w){6+}$/;return patrn.test(str)};Common.isChanEngNum=function(str){str=str.replace(/(^\s*)|(\s*$)/g,"");var patrn=/^[a-z\d\u4E00-\u9FA5]+$/i;return patrn.test(str)};Common.isWord=function(str){var patrn=/^[\w\u4E00-\u9FA5]+$/;return patrn.test(str)};Common.isChan=function(str){var patrn=/^[\u4E00-\u9FA5]+$/i;return patrn.test(str)};Common.isNickName=function(str){var patrn=/^[(\w)\d\u4E00-\u9FA5-]+$/i;return patrn.test(str)};Common.isString6_30=function(str){var patrn=/^(\w)+$/;return patrn.test(str)};Common.getLength=function(str){str=str.replace(/(^\s*)|(\s*$)/g,"");var totallength=0;for(var i=0;i<str.length;i++){var intCode=str.charCodeAt(i);if(intCode>=0&&intCode<=128){totallength=totallength+1}else{totallength=totallength+2}}return totallength};function clean(obj){obj.value="";return}Common.trim=function(str){return str.replace(/(^\s+)|\s+$/g,"")};Common.getCookie=function(name){var strCookies=document.cookie;var cookieName=name+"=";var valueBegin,valueEnd,value;valueBegin=strCookies.indexOf(cookieName);if(valueBegin==-1){return null}valueEnd=strCookies.indexOf(";",valueBegin);if(valueEnd==-1){valueEnd=strCookies.length}value=strCookies.substring(valueBegin+cookieName.length,valueEnd);return decodeURI(value)};Common.saveCookie=function(name,value,expires,path,domain,secure){var strCookie=name+"="+encodeURI(value);if(expires){var curTime=new Date();curTime.setTime(curTime.getTime()+expires*24*60*60*1000);strCookie+="; expires="+curTime.toGMTString()}strCookie+=(path)?"; path="+path:"";strCookie+=(domain)?"; domain="+domain:"";strCookie+=(secure)?"; secure":"";document.cookie=strCookie};Common.checkCookieExist=function(name){if(Common.getCookie(name)){return true}else{return false}};Common.isIdCard=function(obj){var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};var iSum=0;var strIDno=obj;var idCardLength=strIDno.length;if(!/^\d{17}(\d|x)$/i.test(strIDno)&&!/^\d{15}$/i.test(strIDno)){return false}if(aCity[parseInt(strIDno.substr(0,2))]==null){return false}if(idCardLength==15){sBirthday="19"+strIDno.substr(6,2)+"-"+Number(strIDno.substr(8,2))+"-"+Number(strIDno.substr(10,2));var d=new Date(sBirthday.replace(/-/g,"/"));var dd=d.getFullYear().toString()+"-"+(d.getMonth()+1)+"-"+d.getDate();if(sBirthday!=dd){return false}strIDno=strIDno.substring(0,6)+"19"+strIDno.substring(6,15);strIDno=strIDno+GetVerifyBit(strIDno)}var year=strIDno.substring(6,10);if(year<1900||year>2078){return false}strIDno=strIDno.replace(/x$/i,"a");sBirthday=strIDno.substr(6,4)+"-"+Number(strIDno.substr(10,2))+"-"+Number(strIDno.substr(12,2));var d=new Date(sBirthday.replace(/-/g,"/"));if(sBirthday!=(d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate())){return false}for(var i=17;i>=0;i--){iSum+=(Math.pow(2,i)%11)*parseInt(strIDno.charAt(17-i),11)}if(iSum%11!=1){return false}var words=new Array();words=new Array("11111119111111111","12121219121212121");for(var k=0;k<words.length;k++){if(strIDno.indexOf(words[k])!=-1){return false
}}return true};Common.decodeNumber=function(str){var _result="";var numberArr=["6","2","5","1","3","9","0","8","7","4"];if(str&&str!=""){for(var i=0;i<str.length;i++){var _=str.charAt(i);if(/^\d+$/.test(_)){_result+=numberArr[parseInt(_)]}else{_result+=_}}}return _result};function _t(id){return document.getElementById(id)}function innerStr(id,str,color,classOrColor,time){if(classOrColor=="class"){_t(id).innerHTML='<font class="'+color+'">'+str+"</font>"}else{_t(id).innerHTML='<font style="color:'+color+'">'+str+"</font>"}if(typeof(time)!="undefined"&&time!=null&&!isNaN(time)){window.setTimeout(function(){_t(id).innerHTML=""},time)}}function winOpen(_url,_frmName,_width,_height,_top,_left){if((_top=="")&&(_left=="")){var t=(screen.height-_height)/2-10;var l=(screen.width-_width)/2;window.open(_url,_frmName,"toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,"+"width="+_width+",height="+_height+",top="+t+",left="+l)}else{window.open(_url,_frmName,"toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,"+"width="+_width+",height="+_height+",top="+_top+",left="+_left)}}function selectSelect(selectId,selectValue){var _select=$("#"+selectId)[0];for(var i=0;i<_select.options.length;i++){if(_select.options[i].value==selectValue){_select.options[i].selected="selected"}}}function copy(txt){if(window.clipboardData){window.clipboardData.clearData();window.clipboardData.setData("Text",txt);alert("内容已经复制到您的剪贴板!")}else{if(navigator.userAgent.indexOf("Opera")!=-1){window.location=txt}else{alert("您的浏览器不支持,请手动复制!");return false;if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(e){alert("您的浏览器不支持,请手动复制!");return false}var clip=Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);if(!clip){return}var trans=Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);if(!trans){return}trans.addDataFlavor("text/unicode");var str=new Object();var len=new Object();var str=Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);var copytext=txt;str.data=copytext;trans.setTransferData("text/unicode",str,copytext.length*2);var clipid=Components.interfaces.nsIClipboard;if(!clip){alert("您的浏览器不支持,请手动复制");return false}clip.setData(trans,null,clipid.kGlobalClipboard);alert("地址已经复制到您的剪贴板，您可以发送给您的朋友啦!")}}}}function homePage(obj,val){try{obj.style.behavior="url(#default#homepage)";obj.setHomePage(val)}catch(e){if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(e){alert("此操作被浏览器拒绝！")}var prefs=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);prefs.setCharPref("browser.startup.homepage",val)}else{alert("建议您手动设置")}}}function addfavorite(){var url=window.top.location;if(document.all){try{window.external.addFavorite(url,"畅途网")}catch(e){alert("建议您手动添加或者按Ctrl+D快捷键。")}}else{if(window.sidebar){try{window.sidebar.addPanel("畅途网",url,"")}catch(e){alert("建议您手动添加或者按Ctrl+D快捷键。")}}else{alert("建议您手动添加或者按Ctrl+D快捷键。")}}}function getRadioValue(tagName){var result=null;var radioList=document.getElementsByName(tagName);for(var i=0;i<radioList.length;i++){if(radioList[i].checked){result=radioList[i].value}}return result}function html_encode(str){var s="";if(str.length==0){return""}s=str.replace(/&/g,"&amp;");s=s.replace(/</g,"&lt;");s=s.replace(/>/g,"&gt;");return s}function html_decode(str){var s="";if(str.length==0){return""}s=str.replace(/&amp;/g,"&");s=s.replace(/&lt;/g,"<");s=s.replace(/&gt;/g,">");s=s.replace(/&nbsp;/g," ");return s}var alert_timeout;function jAlert(str,mil){clearTheTimeout();if(!mil||!/^\d+$/.test(mil)){mil=3000}var id="succ_div";$("#"+id).remove();var div_str="";div_str+='<div id="'+id+'" style="z-index:9999;" class="small_div">';div_str+='  <div class="small_div_boder">';div_str+='      <div class="div_close">';div_str+='      <div class="close_blue" onclick="closeDiv(\''+id+'\')" style="cursor:pointer;"></div>';div_str+="    </div>";div_str+='    <div class="div_title bold font14 div_fail">'+str+"</div> ";div_str+='    <div class="clear"></div> ';div_str+="  </div>";div_str+="</div>";var scrollTop=$(window).scrollTop();var scrollLeft=$(window).scrollLeft();var windowWidth=$(window).width();var windowHeight=$(window).height();$("body").append(div_str);document.getElementById(id).style.display="block";document.getElementById(id).style.left=windowWidth/2+scrollLeft-200+"px";document.getElementById(id).style.top=windowHeight/2+scrollTop-30+"px";alert_timeout=window.setTimeout("closeDiv('succ_div')",mil)}function iAlert(str,mil){clearTheTimeout();if(!mil||!/^\d+$/.test(mil)){mil=3000}var id="succ_div";$("#"+id).remove();var div_str="";div_str+='<div id="'+id+'" style="z-index:9999;" class="small_div">';div_str+='  <div class="small_div_boder">';
div_str+='      <div class="div_close">';div_str+='      <div class="close_blue" onclick="closeDiv(\''+id+'\')" style="cursor:pointer;"></div>';div_str+="    </div>";div_str+='    <div class="div_title bold font14 div_succeed">'+str+"</div> ";div_str+='    <div class="clear"></div>';div_str+="  </div>";div_str+="</div>";var scrollTop=$(window).scrollTop();var scrollLeft=$(window).scrollLeft();var windowWidth=$(window).width();var windowHeight=$(window).height();$("body").append(div_str);document.getElementById(id).style.display="block";document.getElementById(id).style.left=windowWidth/2+scrollLeft-200+"px";document.getElementById(id).style.top=windowHeight/2+scrollTop-30+"px";alert_timeout=setTimeout("closeDiv('succ_div')",mil)}function jAlert_new(str){clearTheTimeout();var id="succ_div";$("#"+id).remove();var div_str="";div_str+='<div id="'+id+'" style="z-index:9999;" class="small_div">';div_str+='  <div class="small_div_boder">';div_str+='      <div class="div_close">';div_str+='      <div class="close_blue" onclick="closeDiv_new(\''+id+'\')" style="cursor:pointer;"></div>';div_str+="    </div>";div_str+='    <div class="div_title bold font14 div_fail">'+str+"</div> ";div_str+='    <div class="clear"></div> ';div_str+="  </div>";div_str+="</div>";var scrollTop=$(window).scrollTop();var scrollLeft=$(window).scrollLeft();var windowWidth=$(window).width();var windowHeight=$(window).height();$("body").append(div_str);document.getElementById("fade").style.display="block";document.getElementById(id).style.display="block";document.getElementById(id).style.left=windowWidth/2+scrollLeft-200+"px";document.getElementById(id).style.top=windowHeight/2+scrollTop-30+"px";alert_timeout=setTimeout("closeDiv_new('succ_div')",3000)}function iAlert_new(str){clearTheTimeout();var id="succ_div";$("#"+id).remove();var div_str="";div_str+='<div id="'+id+'" style="z-index:9999;" class="small_div">';div_str+='  <div class="small_div_boder">';div_str+='      <div class="div_close">';div_str+='      <div class="close_blue" onclick="closeDiv_new(\''+id+'\')" style="cursor:pointer;"></div>';div_str+="    </div>";div_str+='    <div class="div_title bold font14 div_succeed">'+str+"</div> ";div_str+='    <div class="clear"></div>';div_str+="  </div>";div_str+="</div>";var scrollTop=$(window).scrollTop();var scrollLeft=$(window).scrollLeft();var windowWidth=$(window).width();var windowHeight=$(window).height();$("body").append(div_str);document.getElementById("fade").style.display="block";document.getElementById(id).style.display="block";document.getElementById(id).style.left=windowWidth/2+scrollLeft-200+"px";document.getElementById(id).style.top=windowHeight/2+scrollTop-30+"px";alert_timeout=setTimeout("closeDiv_new('succ_div');",3000)}function clearTheTimeout(){window.clearTimeout(alert_timeout)}function closeDiv(divId){$("#succ_div").remove()}function closeDiv_new(divId){window.top.location.reload()}function getOffsetTop(el){var _t=el.offsetTop;while(el=el.offsetParent){_t+=el.offsetTop}return _t}function getOffsetLeft(el){var _t=el.offsetLeft;while(el=el.offsetParent){_t+=el.offsetLeft}return _t}function selectSelect(selectId,selectValue){var _select=$("#"+selectId)[0];for(var i=0;i<_select.options.length;i++){if(_select.options[i].value==selectValue){_select.options[i].selected="selected"}}}function accDiv(arg1,arg2){var t1=0,t2=0,r1,r2;try{t1=arg1.toString().split(".")[1].length}catch(e){}try{t2=arg2.toString().split(".")[1].length}catch(e){}with(Math){r1=Number(arg1.toString().replace(".",""));r2=Number(arg2.toString().replace(".",""));return(r1/r2)*pow(10,t2-t1)}}function accMul(arg1,arg2){var m=0,s1=arg1.toString(),s2=arg2.toString();try{m+=s1.split(".")[1].length}catch(e){}try{m+=s2.split(".")[1].length}catch(e){}return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)}function accAdd(arg1,arg2){var r1,r2,m;try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}m=Math.pow(10,Math.max(r1,r2));return(arg1*m+arg2*m)/m}function accSub(arg1,arg2){var r1,r2,m,n;try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}m=Math.pow(10,Math.max(r1,r2));n=(r1>=r2)?r1:r2;return((arg1*m-arg2*m)/m).toFixed(n)}function rateStar(params){var type=params.type||"";var wrapId=params.wrapId||"";var clickFun=params.onclick||function(){};var mouseoverFun=params.onmouseover||function(){};var mouseoutFun=params.onmouseout||function(){};var explArr={"all":["信息较差，还需要改进","信息对我没有帮助","信息一般，还需要完善","信息比较全面，对我有帮助","信息非常全面，对我帮助很大"],"chezhan":["很差","差","一般","好","很好"],"bus":["很差","差","一般","好","很好"]};var wrap=$("#"+wrapId);var selectedIndex=0;wrap.children().each(function(i){var t=$(this);t.mouseover(function(){t.prevAll().andSelf().each(function(){this.src=domain+"img/star_light.gif"}).end().end().nextAll().each(function(){this.src=domain+"img/star_grey.gif"});var res={score:i+1,expl:explArr[type][i]};mouseoverFun(res)}).mouseout(function(){var res={};
if(selectedIndex>0){wrap.children().eq(selectedIndex-1).prevAll().andSelf().each(function(){this.src=domain+"img/star_light.gif"}).end().end().nextAll().each(function(){this.src=domain+"img/star_grey.gif"});res={score:selectedIndex,expl:explArr[type][selectedIndex-1]}}else{wrap.children().each(function(){this.src=domain+"img/star_grey.gif"});res={score:0,expl:"点击星星进行打分"}}mouseoutFun(res)}).click(function(){selectedIndex=t.prevAll().size()+1;t.prevAll().andSelf().each(function(){this.src=domain+"img/star_light.gif"}).end().end().nextAll(function(){this.src=domain+"img/star_grey.gif"});var res={score:selectedIndex,expl:explArr[type][selectedIndex-1]};clickFun(res)})})}function changeState(starId){for(var i=1;i<=starId;i++){$("#star_"+i).attr("src",domain+"img/star_light.gif")}for(var i=parseInt(starId)+1;i<=5;i++){$("#star_"+i).attr("src",domain+"img/star_grey.gif")}if(currentSrc.indexOf("light")!=-1){$("#star_"+starId).attr("src",domain+"img/star_grey.gif");changeIndex=parseInt(starId)-1}else{changeIndex=parseInt(starId)}currentSrc=$("#star_"+starId).attr("src")}function changeColor(starId){currentSrc=$("#star_"+starId).attr("src");for(var i=1;i<=starId;i++){$("#star_"+i).attr("src",domain+"img/star_light.gif")}for(var i=parseInt(starId)+1;i<=5;i++){$("#star_"+i).attr("src",domain+"img/star_grey.gif")}}function backColor(starId){for(var i=1;i<=changeIndex;i++){$("#star_"+i).attr("src",domain+"img/star_light.gif")}for(var i=changeIndex+1;i<=5;i++){$("#star_"+i).attr("src",domain+"img/star_grey.gif")}}function Obj2str(o){if(o==undefined){return""}var r=[];if(typeof o=="string"){return'"'+o.replace(/([\"\\])/g," \\$1").replace(/(\n)/g,"\\ n").replace(/(\r)/g,"\\ r").replace(/(\t)/g,"\\t ")+'"'}if(typeof o=="object"){if(!o.sort){for(var i in o){r.push('"'+i+'":'+Obj2str(o[i]))}if(!!document.all&&!/^\n?function \s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){r.push("toString:"+o.toString.toString())}r="{"+r.join()+"}"}else{for(var i=0;i<o.length;i++){r.push(Obj2str(o[i]))}r="["+r.join()+"]"}return r}return o.toString().replace(/\"\:/g,'":""')}Common.subString=function(srcStr,subLength){if(srcStr==null||srcStr==""){return""}srcStr=srcStr+"";if(subLength==null||typeof subLength!="Number"){subLength=srcStr.length}return srcStr.length>subLength?srcStr.slice(0,subLength):srcStr};function transfer(url){if(!url){return}if(document.getElementById("trip8080Jump")){var img=document.getElementById("trip8080Jump");img.src="http://www.trip8080.com/c.jspx?url="+encodeURI(url)+"&r="+new Date().getTime()}else{var img=document.createElement("img");img.id="trip8080Jump";img.src="http://www.trip8080.com/c.jspx?url="+encodeURI(url)+"&r="+new Date().getTime()}window.open(url)};