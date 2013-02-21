/**
 *@fileoverview 日期控件
 *@author raul73521@yahoo.com.cn
 */
 define(['base','css!assets/css/open_style'],function(TTS){
	 /**
	  * @name datePicker
	  * @class 日期控件
	  */
 	var T = TTS;
 	TTS.extend({
 		/** @lends datePicker.prototype*/
		
		/**
		 * 触发日期控件
		 * @param params
		 * @param {String} params.preDateId  *预售期元素ID
		 * @param {String} params.triggerId *触发日期控件的ID
		 * @param {Function} params.onclick  *选择一个日期所触发的事件
		 * @param {String} params.maxSellDayId *最大预售时限ID
		 * @param {String} params.defaultDate 默认日期
		 * @param {String} params.floatId 如果需要跟随某元素悬浮，则指定这个元素的ID
		 * @param {String} params.presentId *展示所依赖的元素ID
		 */
 		datePicker : function(params){
			var preDateId = params.preDateId || '',
				id = params.triggerId || '',
				onclick = params.onclick || function(){},
				maxSellDayId = params.maxSellDayId || 'maxSellDay',
				defaultDate = params.defaultDate || '',
				floatId = params.floatId || '',
				presentId = params.presentId || '';
			var CalendarData=new Array(20),
			madd=new Array(12),
			today,
			monthdays=[31,28,31,30,31,30,31,31,30,31,30,31],
			festivals=[],
			Obj_date=new Date(),
			tgString="甲乙丙丁戊己庚辛壬癸",
			dzString="子丑寅卯辰巳午未申酉戌亥",
			numString="一二三四五六七八九十",
			monString="正二三四五六七八九十冬腊",
			weekString="日一二三四五六",
			cYear,
			cMonth,
			cDay,
			cDateString,
			preday,
			isShowFlag = false;
			CalendarData[0]=0x41A95,
		    CalendarData[1]=0xD4A,
		    CalendarData[2]=0xDA5,
		    CalendarData[3]=0x20B55,
		    CalendarData[4]=0x56A,
		    CalendarData[5]=0x7155B,
		    CalendarData[6]=0x25D,
		    CalendarData[7]=0x92D,
		    CalendarData[8]=0x5192B,
		    CalendarData[9]=0xA95,
		    CalendarData[10]=0xB4A,
		    CalendarData[11]=0x416AA,
		    CalendarData[12]=0xAD5,
		    CalendarData[13]=0x90AB5,
		    CalendarData[14]=0x4BA,
		    CalendarData[15]=0xA5B,
		    CalendarData[16]=0x60A57,
		    CalendarData[17]=0x52B,
		    CalendarData[18]=0xA93,
		    CalendarData[19]=0x40E95,
		    madd[0]=0,
		    madd[1]=31,
		    madd[2]=59,
		    madd[3]=90,
		    madd[4]=120,
		    madd[5]=151,
		    madd[6]=181,
		    madd[7]=212,
		    madd[8]=243,
		    madd[9]=273,
		    madd[10]=304,
		    madd[11]=334,
			festivals["c11"]="春节",// 春节
			festivals["45"]="清明",// 清明
			festivals["c55"]="端午",// 端午
			festivals["51"]="五一",// 51
			festivals["c815"]="中秋",// 中秋
			festivals["101"]="国庆",// 十一
			festivals["11"]="元旦",// 元旦
	
			GetBit = function(m,n){
				return (m>>n)&1; 
			},
			/* 获得农历 */
			e2c = function(year,month,day){
				month--;
				var total,m,n,k; 
				var isEnd=false; 
				var tmp=year; 
				if (tmp<1900) tmp+=1900;
				total=(tmp-2001)*365 + Math.floor((tmp-2001)/4) + madd[month] + day - 23; 
				if (year%4==0&&month>1) 
					total++; 
				for(m=0;;m++) { 
					k=(CalendarData[m]<0xfff)?11:12; 
					for(n=k;n>=0;n--) { 
						if(total<=29+GetBit(CalendarData[m], n)) { 
							isEnd=true; 
							break; 
						} 
						total=total-29-GetBit(CalendarData[m],n); 
					} 
					if(isEnd)break; 
				} 
				cYear=2001 + m; 
				cMonth=k-n+1; 
				cDay=total; 
				if(k==12) { 
					if(cMonth==Math.floor(CalendarData[m]/0x10000)+1) 
						cMonth=1-cMonth; 
					if(cMonth>Math.floor(CalendarData[m]/0x10000)+1) 
						cMonth--; 
				} 
			},
			/* 获得第i个月后 */
			nextmonth = function(year,month,i){
				var de=0;
			    var n_month=new Date();
			    var nmonth=month;
			    var nyear=year;
	
			    for(de=0;de<i;de++){
			        nmonth=nmonth+1>11?0:nmonth+1;
			        nyear=nmonth==0?nyear+1:nyear;
			    }
			    n_month.setFullYear(nyear,nmonth,1);
			    return n_month;
			},
			/* 获得第i天后 */
			nextday = function(year,month,date,i){
				var n_date=new Date();
			    var ndate=+date;
			    var nmonth=+month;
			    var nyear=+year;
	
			    for(var t=0;t<i;t++){
			        ndate=ndate+1>monthdays[nmonth]?1:ndate+1;
			        nmonth=ndate==1?nmonth+1:nmonth;
			        nyear=nmonth>11?nyear+1:nyear;
			        nmonth=nmonth>11?0:nmonth;
			    }
			    n_date.setFullYear(nyear,nmonth,ndate);
			    return n_date;
			},
			get_festival = function(year,month,day){
				for(var i in festivals){
	        		if(i==String(month)+day){return festivals[i];}
	        		e2c(year,month,day);
	        		if(i=="c"+String(cMonth)+cDay){return festivals[i];}
	    		}
	    		return 0;
			},
			create_month = function(year,month,day){
				var arr=[];
			    var i=0;// 用作循环
			    var total_riqi=0;// 显示的总日期数(包括空日期)
			    Obj_date.setFullYear(year,month,1);
			    var f_weekday=Obj_date.getDay();// 本月第一天是周几
			    var dis_day="";
			    var n_month=month+1>11?0:(month+1);// 下月
			    var n_year=month+1>11?(year+1):year;// 下月的年
			    var l_monthday=monthdays[month];
	
			    if(((year%4==0&&year%100!=0)||year%400==0)&&month==1){
			        l_monthday++;
			    }
	
			    for(i=1;i<=f_weekday%7;i++){
			        arr.push("&nbsp;");
			    }
			    total_riqi=f_weekday%7+l_monthday;
			    for(i=i;i<=total_riqi;i++){
			        dis_day=get_festival(year,month+1,i-f_weekday%7);
			        if(dis_day!=0){
			            arr.push(dis_day);
			            continue;
			        }
			        if(dis_day==0){
			            dis_day=i-f_weekday%7;
			        }
			        if(year<today.getFullYear()||year==today.getFullYear()&&month<today.getMonth()||year==today.getFullYear()&&month==today.getMonth()&&(i-f_weekday%7)==today.getDate()){
			            arr.push("今天");
			            continue;
			        }
			        arr.push(dis_day);
			    }
			    return arr;
			},
			get_nongli = function(year,month,day){
				e2c(year,month,day);
	   		 	return "农历："+cYear+"年"+cMonth+"月"+cDay+"日";
			},
	
			/* 传入预售期获得月份差值 */
			getMinusMonth = function(){
				if(preday.getFullYear()-today.getFullYear() < 1){
					return parseInt(preday.getMonth()-today.getMonth(),10);
				}else if(preday.getFullYear()-today.getFullYear() == 1){
					return parseInt(preday.getMonth()+1 + 11 - today.getMonth(),10);
				}else{
					return parseInt(12*(preday.getFullYear()-today.getFullYear()-1) + preday.getMonth()+1 + 11 - today.getMonth(),10);
				}
			},
	
			/* 拼出数据 */
			createDateStr = function(minusMonth,valueId){
				var _str = "";
				for(var i1 = 0;i1 < Math.round((minusMonth+1)/2);i1++){
					var _monStr = '<div class="trip8080month_div" id="mon_'+i1+'" style="display:none">';
					var _headStr = '<div class="trip8080head"><dl><dt><a href="javascript:void(0);" class="trip8080rootl"></a></dt>';
					var _mainStr = '<div class="trip8080date_main">';
				
				for(var z = i1*2;z<(i1+1)*2;z++){
					var next_month = nextmonth(today.getFullYear(),today.getMonth(),z);
					var firstDay = next_month.getDay();
					
					
					var _arr = create_month(next_month.getFullYear(),next_month.getMonth(),next_month.getDate());
					if(z == i1*2){// left
						_headStr += '<dd>'+next_month.getFullYear()+'年'+(next_month.getMonth()+1)+'月</dd>';
						_mainStr += '<div class="trip8080date_left">';
						_mainStr += '<table class="trip8080mon" width="100%" border="0" cellpadding="0" cellspacing="0">';
						_mainStr += '<tr><th scope="col"><span class="trip8080co_ff">日</span></th><th scope="col">一</th><th scope="col">二</th><th scope="col">三</th><th scope="col">四</th><th scope="col">五</th><th scope="col"><span class="trip8080co_ff">六</span></th></tr>';
					
						
					}else{// right
						_headStr += '<dd style="padding-left:150px;">'+next_month.getFullYear()+'年'+(next_month.getMonth()+1)+'月</dd>';
						_mainStr += '<div class="trip8080date_right">';
						_mainStr += '<table class="trip8080mon" width="100%" border="0" cellpadding="0" cellspacing="0">';
						_mainStr += '<tr><th scope="col"><span class="trip8080co_ff">日</span></th><th scope="col">一</th><th scope="col">二</th><th scope="col">三</th><th scope="col">四</th><th scope="col">五</th><th scope="col"><span class="trip8080co_ff">六</span></th></tr>';
						
					}
					
					for(var i=0,l=_arr.length%7==0?_arr.length/7:_arr.length/7+1;i<l;i++){
						var _wrapStr = "<tr>";
						for(var m=i*7,n=(i+1)*7;m<n&&m<_arr.length;m++){		
							if(m>firstDay-1){
								next_month.setDate(m-firstDay+1);
							}
							if(_arr[m] == '&nbsp;' || next_month<today || compareDate(next_month,preday)){
								var _classStr = typeof _arr[m]=="string"?"font-size:12px;line-height:22px;width:24px;height:21px;_padding-top:3px;":"";
								_wrapStr += '<td style="'+_classStr+'">'+_arr[m]+'</td>';
							}else{
								var _class = typeof _arr[m]=="string"?"trip8080ala2":"trip8080ala";
								_wrapStr += '<td onclick="choose(this,\''+valueId+'\')"><a href="javascript:void(0);" title="'+get_nongli(next_month.getFullYear(),next_month.getMonth()+1,next_month.getDate())+'" id="'+next_month.getFullYear()+'-'+T._t(next_month.getMonth()+1)+'-'+T._t(next_month.getDate())+'" class="'+_class+'">'+_arr[m]+'</a></td>';
							}
						}
							_wrapStr += "</tr>";
							_mainStr += _wrapStr;
						}	
						_mainStr += '</table></div>';
					}
					_headStr += '<dt style="float:right; padding-right:2px;"><a href="javascript:void(0);" class="trip8080rootr"></a></dt></dl></div>';
					_mainStr += '</div>'
					_monStr += _headStr + _mainStr + '</div>';
					_str += _monStr;
				}
				return _str;
			},
	
			/* 选择一个日期 */
			choose = function(obj,id){
				var _id = obj.firstChild.id;
				T.byId(id).value = obj.firstChild.id;
				var _class = obj.firstChild.className;
				if(T.byClass('span_ala2').length>0){
					T.byClass('span_ala2')[0].className = 'trip8080ala2';
					obj.firstChild.className = _class=='trip8080ala'? 'trip8080span_ala':'trip8080span_ala2';
				}else if(T.byClass('span_ala').length>0){
					T.byClass('span_ala')[0].className = 'trip8080ala';
					obj.firstChild.className = _class=='trip8080ala'? 'trip8080span_ala':(_class=='trip8080span_ala'?'trip8080span_ala':'trip8080span_ala2');
				}else{
					obj.firstChild.className = _class=='trip8080ala' ? 'trip8080span_ala':'trip8080span_ala2';
				}
				closeDatePicker();
			},
	
			closeDatePicker = function(){
				T.hide('trip8080datePicker');
				var monthDivArr = T.byClass('month_div');
				for (var i = monthDivArr.length - 1; i >= 0; i--) {
					hide(monthDivArr[i].id);
				};
				isShowFlag = false;
			},
	
			adaptLeft = function(){
				var dateRightArr = T.byClass('date_right');
				for(var i = 0,l = dateRightArr.length;i<l;i++){
					var drItem = dateRightArr[i];
					if(drItem.previousSibling!=null){
						drItem.previousSibling.style.height = drItem.offsetHeight;
					}
				}
			},
	
			compareDate = function(date1, date2){
				if(date1.getFullYear()>date2.getFullYear()){
					return true;
				}
				if(date1.getFullYear()==date2.getFullYear()&&date1.getMonth()>date2.getMonth()){
					return true;
				}
				if(date1.getFullYear()==date2.getFullYear()&&date1.getMonth()==date2.getMonth()&&date1.getDate()>date2.getDate()){
					return true;
				}
				return false;
			},
	
			dateShow = function(preDay,id,maxSellDayStr,defaultDate,presentId){
				var inputPreDay = preDay-1;// 预售期参数
				var dateInput = id;// 输入框ID
				today = new Date();
				defaultDate = T.serverTime;
				if(defaultDate!='' && defaultDate.indexOf('-')!=-1){
					var _defaultSplits = defaultDate.split('-');
					today.setFullYear(parseInt(_defaultSplits[0],10));
					today.setMonth(parseInt(_defaultSplits[1],10)-1);
					today.setDate(parseInt(_defaultSplits[2],10));
				}
				preday = nextday(today.getFullYear(),today.getMonth(),today.getDate(),inputPreDay);
				if(maxSellDayStr != '' && maxSellDayStr.indexOf('-')!=-1 && maxSellDayStr.split('-').length==3){
					var maxSellDay = new Date();
					var maxSplit = maxSellDayStr.split('-');
					maxSellDay.setFullYear(maxSplit[0],+maxSplit[1]-1,maxSplit[2]);
					if(preday > maxSellDay){
						preday = maxSellDay;
					}
				}
				var minusMonth = getMinusMonth();
				var _str = createDateStr(minusMonth,dateInput);
				if(T.byId('trip8080dateStrBox')==null){
					var dateStrBox = document.createElement('div');
					dateStrBox.id = 'trip8080dateStrBox';
					document.body.appendChild(dateStrBox);
				}
				T.byId('trip8080dateStrBox').innerHTML = '';
	
				var dateBox = document.createElement('div');
				dateBox.id = 'trip8080datePicker';
				dateBox.className = 'trip8080date_bg';
				T.byId('trip8080dateStrBox').appendChild(dateBox);
				dateBox.innerHTML = '<div class="trip8080date">'+_str+'</div>';
				
				closeDatePicker();
				var _this = presentId != '' ? T.byId(presentId) : T.byId(dateInput),
					_datePicker = T.byId('trip8080datePicker');
				if(floatId && T.byId(floatId)){//如果需要浮动
					var floatDom = T.byId(floatId);
					if(window.attachEvent){
						window.attachEvent('onscroll',function(){
							if(floatDom.style.position === 'fixed'){
								_datePicker.style.position = 'fixed';
								_datePicker.style.left = 420 + T.getOffsetLeft(_this) + 3 > document.body.clientWidth?(T.getOffsetLeft(_this) - 420 + _this.clientWidth + 35)+'px':T.getOffsetLeft(_this)+2+'px';
								_datePicker.style.top = T.getOffsetTop(_this) + _this.clientHeight + 2 +'px';
							}else{
								_datePicker.style.position = 'absolute';
								_datePicker.style.left = 420 + T.getOffsetLeft(_this) + 3 > document.body.clientWidth?(T.getOffsetLeft(_this) - 420 + _this.clientWidth + 35)+'px':T.getOffsetLeft(_this)+2+'px';
								_datePicker.style.top = T.getOffsetTop(_this) + _this.clientHeight + 2 +'px';
							}
						})
					}else if(window.addEventListener){
						window.addEventListener('scroll',function(){
							if(floatDom.style.position === 'fixed'){
								_datePicker.style.position = 'fixed';
								_datePicker.style.left = 420 + T.getOffsetLeft(_this) + 3 > document.body.clientWidth?(T.getOffsetLeft(_this) - 420 + _this.clientWidth + 35)+'px':T.getOffsetLeft(_this)+2+'px';
								_datePicker.style.top = T.getOffsetTop(_this) + _this.clientHeight + 2 +'px';
							}else{
								_datePicker.style.position = 'absolute';
								_datePicker.style.left = 420 + T.getOffsetLeft(_this) + 3 > document.body.clientWidth?(T.getOffsetLeft(_this) - 420 + _this.clientWidth + 35)+'px':T.getOffsetLeft(_this)+2+'px';
								_datePicker.style.top = T.getOffsetTop(_this) + _this.clientHeight + 2 +'px';
							}
						},false);
					}
					if(floatDom.style.position === 'fixed'){
						_datePicker.style.position = 'fixed';
					}
				}
				_datePicker.style.left = 420 + T.getOffsetLeft(_this) + 3 > document.body.clientWidth?(T.getOffsetLeft(_this) - 420 + _this.clientWidth + 35)+'px':T.getOffsetLeft(_this)+2+'px';
				_datePicker.style.top = T.getOffsetTop(_this) + _this.clientHeight + 2 +'px';
				_datePicker.style.display = 'block';
	
				var _month_div = T.byClass('trip8080month_div');
				
				for(var i = 0,l = _month_div.length;i<l;i++){
					var mItem = _month_div[i];
					if(T.byClass('trip8080span_ala',mItem).length>0||T.byClass('trip8080span_ala2',mItem).length>0){
						mItem.style.display = 'block';
						isShowFlag = true;
						return;
					}
				}
	
				if(!isShowFlag){
					_month_div[0].style.display = 'block';
					isShowFlag = true;
				}
				
				adaptLeft();
				var rootlArr = T.byClass('trip8080rootl');
				for(var j = 0,jl = rootlArr.length;j<jl;j++){
					var rootlItem = rootlArr[j];
					var lmonthDivArr = T.byClass('trip8080month_div',T.parent(rootlItem));
					if(lmonthDivArr.length > 0 && lmonthDivArr[0].previousSibling != null){
						rootlItem.onclick = function(){
							lmonthDivArr[0].style.display = 'none';
							lmonthDivArr[0].previousSibling.style.display = 'block';
							adaptLeft();
						};
					}else{
						rootlItem.className = '';
					}
				}
				
				var rootrArr = T.byClass('trip8080rootr');
				for(var k = 0,kl = rootrArr.length;k<kl;k++){
					var rootrItem = rootrArr[k];
					var rmonthDivArr = T.byClass('trip8080month_div',T.parent(rootrItem));
					if(rmonthDivArr.length > 0 && rmonthDivArr[0].nextSibling != null){
						var rootrFun = function(param){
							var _inner = param;
							function f(){
								_inner.style.display = 'none';
								_inner.nextSibling.style.display = 'block';
								adaptLeft();
							}
							return f;
						};
						rootrItem.onclick = rootrFun(rmonthDivArr[0]);
					}else{
						rootrItem.className = '';
					}
				}
				if (!T.triggerIdMap.date[dateInput]) {
					T.bindClick(dateInput,'trip8080dateStrBox',closeDatePicker);
					T.triggerIdMap.date[dateInput] = true;
				}
			};
			var theDay = T.byId(preDateId).value;
			var maxSellDayStr = T.byId(maxSellDayId).value;
			dateShow(theDay,id,maxSellDayStr,defaultDate,presentId);
		}
 	})
	return TTS;
 })