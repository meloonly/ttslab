/*@module cityset
 *城市控件模块，包括了城市下拉、到达站查询、各种城市控件
 *@author raul73521@yahoo.com.cn
 */
 define(['base','css!assets/css/open_style'],function(TTS){
 	var T = TTS,D = document,W = window,
 		iframeId = 'trip8080Iframe',
 		boxId = 'trip8080City',
 		selectId = 'trip8080citySelect',
 		config = {
 			cityUrl : T.baseUrl + 'open/cityArr.jspx',
 			bookEndUrl : T.baseUrl + 'open/book.jspx',
			citySelUrl : T.baseUrl + 'open/citySelect.jspx',
			stationSelUrl : T.baseUrl + 'open/chezhan.jspx',
			pcaProvinceUrl : T.baseUrl + 'open/pcaProvinces.jspx',
			pcaCityUrl : T.baseUrl + 'open/pcaCities.jspx',
 			set : ['book','shike','chezhan','daishou','shike_st','shike_en','weather'],
 			cache : function(key,val){
 				if(key&&val){
 					config.store[key] = val;
 				}
 			},
 			store : {}
 		},
 		showBox = function(id,left,bottom){
 			var cityObj = T.byId(id);
 			var iframeObj = T.byId(iframeId);
 			if(!iframeObj){
 				var iframeObj = document.createElement('iframe');
 				iframeObj.id = iframeId;
 				iframeObj.style.cssText = 'border:0;z-index:999;position:absolute;';
 				document.body.appendChild(iframeObj);
 			}
			if(left+355 > document.body.clientWidth-10){//超出浏览器宽度了
				left = document.body.clientWidth-10-355;
			}
			cityObj.style.top = bottom + 'px';
			cityObj.style.left = left + 'px';
			iframeObj.style.width = cityObj.offsetWidth+'px';
			iframeObj.style.display = 'block';
			iframeObj.style.top = bottom + 'px';
			iframeObj.style.left = left + 'px';
			iframeObj.style.height=cityObj.offsetHeight+"px";
 		},
 		showSelect = function(id,left,bottom){
 			var cityObj = T.byId(id);
			var iframeObj = T.byId(iframeId);
			if(!iframeObj){
 				iframeObj = document.createElement('iframe');
 				iframeObj.id = iframeId;
 				iframeObj.style.cssText = 'border:0;z-index:999;position:absolute;';
 				document.body.appendChild(iframeObj);
 			}
			if(left+190 > document.body.clientWidth-10){//超出浏览器宽度了
				left = document.body.clientWidth-10-190;
			}
			cityObj.style.top = bottom + 'px';
			cityObj.style.left = left + 'px';
			iframeObj.style.width = cityObj.offsetWidth + 'px';
			iframeObj.style.display = 'block';
			iframeObj.style.top = bottom + 'px';
			iframeObj.style.left = left + 'px';
			iframeObj.style.height = cityObj.offsetHeight + "px";
 		},
 		//下拉选择框，由于下拉框都类似，故整合到一起
 		//如果各类下拉框有特殊的需求，再传参数进来定制，现在已知的下拉框有
 		//(注：之前的方法名字就不会改变了)citySelect,stationSelect,bookEndCity
 		//创建数据这步骤还是个方法各自做吧
 		//差异体现在获得数据，拼出字符串，绑定事件的过程。
 		select = function(params){
 			/*
 			 * 各种参数
 			 */
 			var cType = params.type || '',
				triggerId = params.triggerId || '',
				presentId = params.presentId || '',
				hiddenCityId = params.hiddenCityId || '',
				clickFun = params.onclick || function(){},
				before = params.before || function(){},
				after = params.after || function(){},
				onclose = params.onclose || function(){},
				onEnter = params.onEnter || function(){},
				errorFun = params.onError || function(){},
				e = params.e || window.event,

				//定制的属性
				createBox = params.createBox || function(){},
				getRetObj = params.getRetObj || function(){},
			
				keycode = e.keyCode,
				showObj = T.byId(presentId),
				inputValue = showObj.value,
				left = T.getOffsetLeft(showObj)-1,// 文本框的左边位置
				bottom = T.getOffsetTop(showObj) + 25,// 文本框的下边位置
				cArr=[],cityItems=[],
				chooseArr, selectDiv,
				inputTextType,//输入文本类型
				rongAhover = 'trip8080rongAhover',
				chooseCityId = 'trip8080chooseCity',
				rongA = 'trip8080rongA',
				upDown = function(chooseNum) {//上下键事件
					var oldSel = T.byClass(rongAhover),
						currSel = T.byId(chooseCityId + chooseNum);
					if (oldSel.length > 0) {
						oldSel[0].className = rongA;
					}
					if (currSel != null) {
						currSel.className = rongAhover;
					}
				},
				closeCitySelect = function(){//关闭下拉框
					T.hide(iframeId);
					T.hide(selectId);
					// T.store['citySelectArr'] = [];
				},
				returnSelectValue = function(param) {//返回选中的值
					if (param == null) {return;}
					clickFun(getRetObj(param));
					closeCitySelect();
				},
				callback = function(selectArr,innerStr){
					if (T.byId(selectId) != null) {
						T.show(selectId);
					} else {
						selectDiv = document.createElement('div');
						selectDiv.id = selectId;
						selectDiv.className = 'trip8080rongdivmian';
						selectDiv.style.cssText = 'z-index:1000;position: absolute;font-size:13px;top:100px;left:0;background:#fff;border:1px solid #7f9eb9;';
						document.body.appendChild(selectDiv);
						var bodyHtml = '<div id="trip8080citySelectChoose"></div>';
						bodyHtml += '<div class="clear"></div>';
						T.byId(selectId).innerHTML = bodyHtml;
						// 绑定DOM事件
						T.bindClick(triggerId, selectId,closeCitySelect);
					}
					//清空ID
					if (T.byId(hiddenCityId)!=null) {
						T.byId(hiddenCityId).value = '';
					}
					/* 开始拼进城市列表 */
					var citySelectChooseDiv = T.byId('trip8080citySelectChoose');
					citySelectChooseDiv.innerHTML = innerStr;

					if(innerStr.indexOf('trip8080rongdivmiancuo')!=-1){
						errorFun();
					}

					// 绑定return_select_value事件
					var selectCityList = T.byClass(rongA);
					if (selectCityList.length > 0) {
						for (var i = selectCityList.length - 1; i >= 0; i--) {
							var selectCityItem = selectCityList[i];
							var aName = selectCityItem.getAttribute('name');
							var returnValClick = function(returnParam) {
									var returnParam = returnParam;
									return function() {
										returnSelectValue(returnParam);
									}
								}
							selectCityItem.onclick = returnValClick(aName);
							selectCityItem.onmouseover = function(){
								var aHoverList = T.byClass('trip8080rongAhover');
								if(aHoverList.length > 0){
									aHoverList[0].className = 'trip8080rongA';
								}
								this.className = 'trip8080rongAhover';
							};
						};
					}
					if (selectArr.length > 0 && T.byClass(rongAhover).length < 1) {
						upDown(0);
					}
					if(T.innerFlag){
						var cityObj = T.byId(selectId);
						var cssText = cityObj.style.cssText;
						if(200 + bottom > T.innerHeight){
							var _height = T.innerHeight - bottom - 5;
							cityObj.style.cssText = cssText + ';max-height: '+_height+'px;_height: expression(this.scrollHeight>'+_height+'?'+_height+':this.scrollHeight);';
						}else{
							cityObj.style.cssText = cssText + ';max-height: 200px;_height: expression(this.scrollHeight>200?200:this.scrollHeight);';	
						}
					}
					//显示就放在这里吧
					showSelect(selectId,left,bottom);
				};

			//回车响应onEnter事件
			if ((T.byId(selectId) == null || T.byId(selectId).style.display != 'block') && keycode == 13) {
				onEnter();
				return;
			}
			///键盘输入事件
			//@TODO inputValue.length设置成变量（触发数据查询）
			if (T.trim(inputValue) == '' || inputValue.length < 2) {
				closeCitySelect();
			} else {
				var selItem = T.byClass(rongAhover),
					curr;
				chooseArr = config.store['selectArr'];
				if (keycode == 38) { // 向上
					if (selItem.length > 0) {
						curr = selItem[0].id.slice(chooseCityId.length);
						if (curr == '0') { // 到顶了，返回到最后一个
							upDown(chooseArr.length - 1);
						} else {
							upDown(parseInt(parseInt(curr, '10') - 1));
						}
						return;
					}
				} else if (keycode == 40) { // 向下
					if (selItem.length > 0) {
						curr = selItem[0].id.slice(chooseCityId.length);
						if (curr == chooseArr.length - 1) { // 到底了，返回到第一个
							upDown(0);
						} else {
							upDown(parseInt(parseInt(curr, '10') + 1));
						}
						return;
					}
				} else if (keycode == 13) { // 回车响应选中onclick事件
					if (T.byId(selectId) != null && T.byId(selectId).style.display != 'none' && selItem.length > 0) {
						selItem[0].onclick();
					}
					return;
				}else{
					//如果不是上、下、回车键，则查询数据
					createBox(inputValue,callback);
				}
			}
 		};
 		
 		var rChinese = /[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
 		var	rLetter = /^[A-Za-z]+$/;

 	TTS.extend({
 		city : function(params){
 			if(params.type === 'book'){
 				TTS.cityBook(params);
 				return;
 			}
			var cType = params.type || '',
				triggerId = params.triggerId || '',
				presentId = params.presentId || '',
				clickFun = params.onclick || function(){},
				before = params.before || function(){},
				after = params.after || function(){},
				onclose = params.onclose || function(){},
			
				show_obj = T.byId(presentId),
				left = T.getOffsetLeft(show_obj),// 文本框的左边位置
				bottom = T.getOffsetTop(show_obj) + 25,// 文本框的下边位置
				cDiv,cityItems=[],
				cHotId = 'trip8080CityHot',
				cOthersId = 'trip8080CityOthers',
				closeCity = function(){
					T.hide(boxId);
					T.hide(iframeId);
				},
				domClick = function(clickId){
					if (!T.triggerIdMap.city[clickId]) {
						closeCity();
					}
				},
				clearCity = function(){
					T.byId(cOthersId).innerHTML = '';
					T.byId(cHotId).innerHTML = '';
				},
				createData = function(){
					//没有拿过数据
					if (!config.store[cType]) {
						T.jsonp({
							url : config.cityUrl + '?t=' + cType,
							success : function(){
								var hotCityArr=[],otherCityArr=[],i,j,k,l,hotCityStr='',otherCityStr='';
								config.cache(cType,cityArr);
								hotCityArr = cityArr[0].hotCity;
								otherCityArr = cityArr[1].otherCity;
								if(hotCityArr.length>0){
									for(i=0,l=hotCityArr.length;i<l;i++){
										var one_hot_arr = hotCityArr[i];
										hotCityStr += '<a href="javascript:;" id="trip8080_hotCity_'+one_hot_arr.id+'_'+one_hot_arr.pinyin+'_'+one_hot_arr.preDate+'_'+one_hot_arr.maxSellDay+'" name="'+one_hot_arr.name+'" class="trip8080_blue" title="'+one_hot_arr.name+'">'+one_hot_arr.name+'</a>';
									}
									T.byId('')
									T.byId(cHotId).innerHTML = hotCityStr;
									config.cache(cType+'_hotStr',hotCityStr);
								}
								if(otherCityArr.length>0){
									for(j=0,k=otherCityArr.length;j<k;j++){
										var one_other_map = otherCityArr[j]; 
										for(var other_key in one_other_map){
											otherCityStr += '<table class="trip8080_kongTouying_tab" width="100%" border="0" cellpadding="0" cellspacing="0"><tr><th><span>'+other_key+'</span></th><td>';
											var other_value = one_other_map[other_key];
											for(var oi = 0,ol = other_value.length;oi<ol;oi++){
												var one_other_arr = other_value[oi];
												otherCityStr += '<a href="javascript:;" id="trip8080_otherCity_'+one_other_arr.id+'_'+one_other_arr.pinyin+'_'+one_other_arr.preDate+'_'+one_other_arr.maxSellDay+'" name="'+one_other_arr.name+'" class="trip8080_blue" title="'+one_other_arr.name+'">'+(one_other_arr.name.length>4?(one_other_arr.name.charAt(3)=="("?one_other_arr.name.slice(0,3):one_other_arr.name.slice(0,4)):one_other_arr.name)+'</a>';
											}
											otherCityStr += '</td></tr></table>';
										};
									}
									T.byId(cOthersId).innerHTML = otherCityStr;
									config.cache(cType+'_otherStr',otherCityStr);
								}

								// 绑定点击事件
								cityItems = T.byId('trip8080City').getElementsByTagName('a');
								for (var i = cityItems.length - 1; i >= 0; i--) {
									var c_item = cityItems[i];
										c_item_split = c_item.id.split('_'),
										param = {'id':c_item_split[2],'pinyinUrl':c_item_split[3],'name':c_item.getAttribute('name'),'preDate':c_item_split[4],'maxSellDay':c_item_split[5]};
										var f = function(param){
											return function(){
												clickFun(param);
												closeCity();
											};
										};
									c_item.onclick = f(param);
								};
							}
						});

					}else{
						T.byId(cHotId).innerHTML = config.store[cType+'_hotStr'];
						T.byId(cOthersId).innerHTML = config.store[cType+'_otherStr'];
						// 绑定点击事件
						cityItems = T.byId('trip8080City').getElementsByTagName('a');
						for (var i = cityItems.length - 1; i >= 0; i--) {
							var c_item = cityItems[i];
								c_item_split = c_item.id.split('_'),
								param = {'id':c_item_split[2],'pinyinUrl':c_item_split[3],'name':c_item.getAttribute('name'),'preDate':c_item_split[4],'maxSellDay':c_item_split[5]};
							var f = function(param){
								return function(){
									clickFun(param);
									closeCity();
								};
							};
							c_item.onclick = f(param);
						};
					}
				};

			//请求的数据类型不正确
			if(T.inArray(cType,config.set) < 0)return;

			//已经加载过UI
			if(T.byId(boxId)){
				clearCity();
				T.show(boxId);
				createData();
				showBox(boxId,left,bottom);
				// 绑定DOM事件
				if (!T.triggerIdMap.city[triggerId]) {
					T.triggerIdMap.city[triggerId] = true;
					T.bindClick(triggerId,boxId,domClick);
				}
			}else{
				//未加载过
				cDiv = D.createElement('div');
				D.body.appendChild(cDiv);
				require(['text!assets/template/citybox.html!strip'],function(html){
					cDiv.innerHTML = html;
					createData();
					showBox(boxId,left,bottom);
					// 绑定DOM事件
					if (!T.triggerIdMap.city[triggerId]) {
						T.triggerIdMap.city[triggerId] = true;
						T.bindClick(triggerId,boxId,domClick);
					}
				})
			}
		},

		cityBook : function(params){
			var cType = 'book',
				triggerId = params.triggerId || '',
				presentId = params.presentId || '',
				clickFun = params.onclick || function(){},
				before = params.before || function(){},
				after = params.after || function(){},
				onclose = params.onclose || function(){},
				
				show_obj = T.byId(presentId),
				left = T.getOffsetLeft(show_obj),// 文本框的左边位置
				bottom = T.getOffsetTop(show_obj) + 25,// 文本框的下边位置
				cityItems = [],
				boxId = 'trip8080BookCityDiv',
				bookHotId = 'trip8080BookCityHot',//热门城市
				bookCityId = 'trip8080BookCity',//预订城市
				ticketCityId = 'trip8080TicketCity',//余票查询城市
				tabBookId = 'trip8080TabBook',
				tabTicketId = 'trip8080TabTicket',
				closeCity = function(){
					T.hide(boxId);
					T.hide(iframeId);
				},
				clearCity = function(){
					T.byId(bookHotId).innerHTML = '';
					T.byId(bookCityId).innerHTML = '';
					T.byId(ticketCityId).innerHTML = '';
				},
				domClick = function(clickId){
					if (!T.triggerIdMap.city[clickId]) {
						closeCity();
					}
				},
				createData = function(){
					if(!config.store[cType]){
						T.jsonp({
							url : config.cityUrl + '?t=' + cType,
							success : function(){
								var hotCityArr=[],otherCityArr=[],i,j,k,l,hotCityStr='',bookCityStr='',ticketCityStr='';
								config.cache(cType,cityArr);
								hotCityArr = cityArr[0].hotCity;
								otherCityArr = cityArr[1].otherCity;
								if(hotCityArr.length>0){
									for(i=0,l=hotCityArr.length;i<l;i++){
										var one_hot_arr = hotCityArr[i];
										hotCityStr += '<a href="javascript:;" id="trip8080_hotCity_'+one_hot_arr.id+'_'+one_hot_arr.pinyin+'_'+one_hot_arr.preDate+'_'+one_hot_arr.maxSellDay+'" name="'+one_hot_arr.name+'" class="trip8080_blue" title="'+one_hot_arr.name+'">'+one_hot_arr.name+'</a>';
									}
									T.byId(bookHotId).innerHTML = hotCityStr;
									config.cache(cType+'_hotStr',hotCityStr);
								}
								if(otherCityArr.length>0){
									for(j=0,k=otherCityArr.length;j<k;j++){
										var one_other_map = otherCityArr[j]; 
										for(var other_key in one_other_map){
											var other_value = one_other_map[other_key];
											var ticketCityItemStr = '';
											var orderCityItemStr = '';
											for(var oi = 0,ol = other_value.length;oi<ol;oi++){
												var one_other_arr = other_value[oi];
												ticketCityItemStr += '<a href="javascript:;" type="search" id="trip8080_otherCity_'+one_other_arr.id+'_'+one_other_arr.pinyin+'_'+one_other_arr.preDate+'_'+one_other_arr.maxSellDay+'" name="'+one_other_arr.name+'" class="trip8080_blue" title="'+one_other_arr.name+'">'+(one_other_arr.name.length>4?(one_other_arr.name.charAt(3)=="("?one_other_arr.name.slice(0,3):one_other_arr.name.slice(0,4)):one_other_arr.name)+'</a>';
												if(one_other_arr.orderFlag == 'Y'){
													orderCityItemStr += '<a type="book" href="javascript:;" id="trip8080_otherCity_'+one_other_arr.id+'_'+one_other_arr.pinyin+'_'+one_other_arr.preDate+'_'+one_other_arr.maxSellDay+'" name="'+one_other_arr.name+'" class="trip8080_blue" title="'+one_other_arr.name+'">'+(one_other_arr.name.length>4?(one_other_arr.name.charAt(3)=="("?one_other_arr.name.slice(0,3):one_other_arr.name.slice(0,4)):one_other_arr.name)+'</a>';
												}
											}
											if(ticketCityItemStr != ''){
												ticketCityStr += '<dl><dt>'+other_key+'</dt><dd class="colBlue">';
												ticketCityStr += ticketCityItemStr;
												ticketCityStr += '</dd></dl>';
											}
											if(orderCityItemStr != ''){
												bookCityStr += '<dl><dt>'+other_key+'</dt><dd class="colBlue">';
												bookCityStr += orderCityItemStr;
												bookCityStr += '</dd></dl>';
											}
										}
									}
									T.byId(bookCityId).innerHTML = bookCityStr;
									T.byId(ticketCityId).innerHTML = ticketCityStr;
									config.cache(cType+'_bookStr',bookCityStr);
									config.cache(cType+'_ticketStr',ticketCityStr);
								}

								// 绑定点击事件
								cityItems = T.byId(boxId).getElementsByTagName('a');
								for (var i = cityItems.length - 1; i >= 0; i--) {
									var c_item = cityItems[i];
										c_item_split = c_item.id.split('_'),
										param = {'id':c_item_split[2],'pinyinUrl':c_item_split[3],'name':c_item.getAttribute('name'),'preDate':c_item_split[4],'maxSellDay':c_item_split[5],'type':c_item.getAttribute('type')};
										var f = function(param){
										return function(){
											clickFun(param);
											closeCity();
										};
									};
									c_item.onclick = f(param);
								};
							}
						});
					}else{
						T.byId(bookHotId).innerHTML = config.store[cType+'_hotStr'];
						T.byId(bookCityId).innerHTML = config.store[cType+'_bookStr'];
						T.byId(ticketCityId).innerHTML = config.store[cType+'_ticketStr'];
						// 绑定点击事件
						cityItems = T.byId(boxId).getElementsByTagName('a');
						for (var i = cityItems.length - 1; i >= 0; i--) {
							var c_item = cityItems[i];
								c_item_split = c_item.id.split('_'),
								param = {'id':c_item_split[2],'pinyinUrl':c_item_split[3],'name':c_item.getAttribute('name'),'preDate':c_item_split[4],'maxSellDay':c_item_split[5],'type':c_item.getAttribute('type')};
							var f = function(param){
								return function(){
									clickFun(param);
									closeCity();
								};
							};
							c_item.onclick = f(param);
						};
					}
					//如果嵌在iframe中
					if(T.innerFlag){
						var cityBookDom = T.byId(bookCityId);
						var cityTicketDom = T.byId(ticketCityId);
						var cityOtherHeight = cityBookDom.offsetHeight || cityTicketDom.offsetHeight;
						var boxHeight = T.byId(boxId).offsetHeight;
						if(cityOtherHeight + bottom > T.innerHeight){
							var _height = cityOtherHeight - (boxHeight + bottom - T.innerHeight) - 5;
							cityBookDom.style.height = _height + 'px';
							cityTicketDom.style.height = _height + 'px';
						}else{
							cityBookDom.style.height = cityOtherHeight + 'px';
							cityTicketDom.style.height = cityOtherHeight + 'px';
						}
					}
				};

			if(T.inArray(cType,config.set) < 0)return;

			//已经加载过
			if(T.byId(boxId)){
				clearCity();
				T.show(boxId);
				createData();
				showBox(boxId,left,bottom);
				// 绑定DOM事件
				if (!T.triggerIdMap.city[triggerId]) {
					T.triggerIdMap.city[triggerId] = true;
					T.bindClick(triggerId,boxId,domClick);
				}

			}else{
				cDiv = document.createElement('div');
				document.body.appendChild(cDiv);
				require(['text!assets/template/bookCitybox.html!strip'],function(html){
					cDiv.innerHTML = html;
					createData();
					showBox(boxId,left,bottom);
					// 绑定DOM事件
					if (!T.triggerIdMap.city[triggerId]) {
						T.triggerIdMap.city[triggerId] = true;
						T.bindClick(triggerId,boxId,domClick);
					}
					//绑定切换tab事件
					T.byId(tabBookId).onclick = function(){
						this.className = 'hover';
						T.byId(tabTicketId).className = '';
						T.hide(ticketCityId);
						T.show(bookCityId);
					}
					T.byId(tabTicketId).onclick = function(){
						this.className = 'hover';
						T.byId(tabBookId).className = '';
						T.show(ticketCityId);
						T.hide(bookCityId);
					}
				})
			}
		},

		citySelect : function(params){
			var cType = params.type || '';
			var url = config.citySelUrl+'?type='+cType;
			params.createBox = function(inputValue,callback){
				T.jsonp({
					url : encodeURI(encodeURI(url + '&s='+T.trim(inputValue))),
					success : function(){
						var innerStr = '',
							cityChooseArr = citySelectArr,
							inputTextType,oneArr,i;
						config.cache('selectArr',citySelectArr);
						if (cityChooseArr.length == 0) {
							if(rChinese.test(inputValue) && inputValue.indexOf('市')!=-1){
								innerStr += '<div class="trip8080rongdivmiancuo"><p class="trip8080rongred">请输入简拼或全拼并通过下拉框来选择城市</p></div>';
							}else{
								innerStr += '<div class="trip8080rongdivmiancuo"><p class="trip8080rongred">对不起，没找到'+inputValue+'目的地</p></div>';
							}
						} else {
							if(rChinese.test(inputValue)){//输入的是汉字
								inputTextType = 'c';
							}else if(rLetter.test(inputValue)){//输入的是字母
								inputTextType = 'l';
							}
							for (i = 0; i < cityChooseArr.length; i++) {
								oneArr = cityChooseArr[i];
								if(oneArr.jianpin.indexOf(inputValue.toUpperCase())!=-1){//简拼
									innerStr += '<a id="trip8080chooseCity' + i + '" name="'+oneArr.id+'|'+oneArr.name+'|'+oneArr.pinyinUrl+'" class="trip8080rongA" title="'+oneArr.name+'" href="javascript:;"><p>'+oneArr.name+'(<span>'+inputValue.toLowerCase()+'</span>'+oneArr.jianpin.slice(inputValue.length).toLowerCase()+')</p></a>';
								}else if(inputValue.toUpperCase() === oneArr.pinyin.toUpperCase() &&cityChooseArr.length>1){
									innerStr += '<a id="trip8080chooseCity' + i + '" name="'+oneArr.id+'|'+oneArr.name+'|'+oneArr.pinyinUrl+'" class="trip8080rongA" title="'+oneArr.name+'('+oneArr.provinceName+')" href="javascript:;"><div class="trip8080LineDiv"><p class="left">'+T.limitLenStr(oneArr.name,7)+'('+oneArr.provinceName+')</p><p class="right"><span>'+T.limitLenStr(inputValue.toLowerCase(),10)+'</span>'+T.limitLenStr(oneArr.pinyin.slice(inputValue.length),13)+'</p></div></a>';
								}else if(inputTextType === 'l'){
									innerStr += '<a id="trip8080chooseCity' + i + '" name="'+oneArr.id+'|'+oneArr.name+'|'+oneArr.pinyinUrl+'" class="trip8080rongA" title="'+oneArr.name+'" href="javascript:;"><p>'+oneArr.name+'(<span>'+inputValue.toLowerCase()+'</span>'+T.limitLenStr(oneArr.pinyin.slice(inputValue.length),7).toLowerCase()+')</p></a>';
								}else if(inputTextType === 'c'){
									innerStr += '<a id="trip8080chooseCity' + i + '" name="'+oneArr.id+'|'+oneArr.name+'|'+oneArr.pinyinUrl+'" class="trip8080rongA" title="'+oneArr.name+'" href="javascript:;"><p><span>'+inputValue+'</span>'+oneArr.name.slice(inputValue.length)+'('+oneArr.jianpin+')</p></a>';
								}
							}
						}
						innerStr += '<div class="clear"></div>';
						callback(cityChooseArr, innerStr);
					}
				})
			};
			params.getRetObj = function(param){
				var p_split = param.split('|');
				return {
					'id':p_split[0],
					'name':p_split[1],
					'pinyinUrl':p_split[2]
				}
			};

			select(params);
		},

		stationSelect : function(params){
			var cityId = params.cityId || '';
			var url = config.stationSelUrl+'?cid='+cityId;
			params.createBox = function(inputValue,callback){
				T.jsonp({
					url : encodeURI(encodeURI(url + '&s='+T.trim(inputValue))),
					success : function(){
						var innerStr = '',
							inputTextType,oneArr,i,
							stationArr = staArr;
						config.cache('selectArr',staArr);
						if (stationArr.length > 0) {
							for(var i = 0,l = stationArr.length;i<l;i++){
								innerStr += '<a id="trip8080chooseCity' + i + '" name="'+ stationArr[i][0]+'|'+stationArr[i][1]+'|'+stationArr[i][2]+'" class="trip8080rongA" title="'+stationArr[i][1]+'" href="javascript:;"><div class="trip8080LineDiv"><p class="left">'+stationArr[i][1]+'</p></div></a>';
							}
						}else{
							innerStr += '<div class="trip8080rongdivmiancuo"><p class="trip8080rongred">对不起，没找到'+inputValue+'客运站</p></div>';
						}
						innerStr += '<div class="clear"></div>';
						callback(stationArr, innerStr);
					}
				});
				
			};
			params.getRetObj = function(param){
				var p_split = param.split('|');
				return {
					'id':p_split[0],
					'name':p_split[1],
					'pinyinUrl':p_split[2]
				}
			};

			select(params);
		},

		bookEndCity : function(params){
			var bookStartId = params.startCityId || '',
				url = config.bookEndUrl+'?cid='+bookStartId;
			params.presentId = params.endCityNameId;
			params.createBox = function(inputValue,callback){
				T.jsonp({
					url : encodeURI(encodeURI(url + '&s='+T.trim(inputValue))),
					success : function(){
						var bookArr = ecl,
							innerStr = '',
							inputTextType,oneArr,pinyinArr,carryStaStr,provName,i;
						config.cache('selectArr',ecl);
						if (bookArr.length > 0) {
							if(rChinese.test(inputValue)){//输入的是汉字
								inputTextType = 'c';
							}else if(rLetter.test(inputValue)){//输入的是字母
								inputTextType = 'l';
							}
							for(i = 0,l = bookArr.length;i<l;i++){
								oneArr = bookArr[i];
								pinyinArr = oneArr.pinyin.split('|');
								carryStaStr = oneArr.carryStaId == -1 ? '' : '<'+oneArr.CarryStaName+'>';
								provName = oneArr.provName;
								if(pinyinArr[0].indexOf(inputValue.toUpperCase())!=-1){//简拼
									innerStr += '<a id="trip8080chooseCity' + i + '" name="'+oneArr.carryStaId+'|'+oneArr.endCityId+'|'+oneArr.endCityName+'" class="trip8080rongA" title="'+oneArr.endCityName+carryStaStr+'('+provName+')" href="javascript:;"><div class="trip8080LineDiv"><p class="left">'+oneArr.endCityName+carryStaStr+'</p><p class="right" style="margin-right:3px;"><span>'+inputValue.toLowerCase()+'</span>'+pinyinArr[0].slice(inputValue.length).toLowerCase()+'</p></div></a>';
								}else if(inputTextType === 'l'){
									innerStr += '<a id="trip8080chooseCity' + i + '" name="'+oneArr.carryStaId+'|'+oneArr.endCityId+'|'+oneArr.endCityName+'" class="trip8080rongA" title="'+oneArr.endCityName+carryStaStr+'('+provName+')" href="javascript:;"><div class="trip8080LineDiv"><p class="left">'+oneArr.endCityName+carryStaStr+'</p><p class="right" style="margin-right:3px;">'+(pinyinArr[1].length>12?("<span>"+pinyinArr[0]+"</span>"):(pinyinArr[1].replace(inputValue,"<span>"+inputValue+"</span>")))+'</p></div></a>';
								}else if(inputTextType === 'c'){
									innerStr += '<a id="trip8080chooseCity' + i + '" name="'+oneArr.carryStaId+'|'+oneArr.endCityId+'|'+oneArr.endCityName+'" class="trip8080rongA" title="'+oneArr.endCityName+carryStaStr+'('+provName+')" href="javascript:;"><div class="trip8080LineDiv"><p class="left">'+oneArr.endCityName.replace(inputValue, "<span>"+inputValue+"</span>")+carryStaStr+'</p><p class="right" style="margin-right:3px;">'+pinyinArr[0]+'</p></div></a>';
								}
							}
						}else{
							if(rChinese.test(inputValue) && inputValue.indexOf('市')!=-1){
								innerStr += '<div class="trip8080rongdivmiancuo"><p class="trip8080rongred">请输入简拼或全拼并通过下拉框来选择城市</p></div>';
							}else{
								innerStr += '<div class="trip8080rongdivmiancuo"><p class="trip8080rongred">对不起，没找到'+inputValue+'目的地</p></div>';
							}
						}
						innerStr += '<div class="clear"></div>';
						callback(bookArr, innerStr);
					}
				});
				
			};
			params.getRetObj = function(param){
				var p_split = param.split('|');
				return {
					'carryStaId':p_split[0],
					'endCityId':p_split[1],
					'endCityName':p_split[2]
				}
			};

			select(params);
		},

		pcaPro : function(params){
			var type = params.type || 'province',
			 	presentId = params.presentId || '',
			 	triggerId = params.triggerId || '',
			 	clickFun = params.onclick || function(){},
			
			 	showObj = T.byId(presentId),
				left = T.getOffsetLeft(showObj),// 文本框的左边位置
				bottom = T.getOffsetTop(showObj) + 25,// 文本框的下边位置
				cDiv,cifr,cArr=[],
				cityHtml = '',
				boxId = 'trip8080Pca',
				ifrId = 'trip8080Iframe',
				proId = 'trip8080Pro',
				closeCity = function(){
					T.hide(boxId);
					T.hide(ifrId);
				};

			if(T.byId(boxId)){
				T.show(boxId);
			}else{
				cDiv = document.createElement('div');
				cDiv.id = boxId;cDiv.className='trip8080_kongTouying';
				document.body.appendChild(cDiv);
				cityHtml += '<div class="trip8080_kongTouying_boder">';
				cityHtml += '<div class="trip8080_kongDiv trip8080_kongDivheight" id="trip8080Pro"><center>正在加载...</center>';
				cityHtml += '</div></div>';
				if(!T.byId(ifrId)){
					cifr = document.createElement('iframe');
					cifr.id = ifrId;
					cifr.style.cssText = 'border:0;z-index:999;position:absolute;';
					document.body.appendChild(cifr);
				}
				T.byId(boxId).innerHTML = cityHtml;
			}
			if(!config.store['pcaPro']) {
				T.jsonp({
					url : config.pcaProvinceUrl + '?t=' + type,
					success : function(){
						var proStr = '';
						if(pArr.length>0){
							proStr += '<table class="trip8080_kongTouying_tab" width="100%" border="0" cellpadding="0" cellspacing="0"><tr><th><span>省份</span></th><td>';
							for(i=0,l=pArr.length;i<l;i++){
								var _item = pArr[i]; 
								proStr += '<a href="javascript:;" id="trip8080_pro_'+_item[0]+'_'+_item[1]+'_'+_item[2]+'" class="trip8080_blue" title="'+_item[1]+'">'+_item[1]+'</a>';
							};
							proStr += '</td></tr></table>';
						}
						T.byId(proId).innerHTML = proStr;
						config.cache('pcaPro',proStr);
						// 绑定点击事件
						proItems = T.byId(proId).getElementsByTagName('a');
						for (var i = proItems.length - 1; i >= 0; i--) {
							var p_item = proItems[i];
								p_item_split = p_item.id.split('_'),
								param = {'id':p_item_split[2],'name':p_item_split[3],'code':p_item_split[4]};
								var f = function(param){
									return function(){
										clickFun(param);
										closeCity();
									};
								};
							p_item.onclick = f(param);
						};
					}
				});
			}else{
				T.byId(proId).innerHTML = config.store['pcaPro'];
				// 绑定点击事件
				proItems = T.byId(proId).getElementsByTagName('a');
				for (var i = proItems.length - 1; i >= 0; i--) {
					var p_item = proItems[i];
						p_item_split = p_item.id.split('_'),
						param = {'id':p_item_split[2],'name':p_item_split[3],'code':p_item_split[4]};
						var f = function(param){
							return function(){
								clickFun(param);
								closeCity();
							};
						};
					p_item.onclick = f(param);
				};
			}
			
			var domClick = function(clickId){
				if (!T.triggerIdMap.city[clickId]) {
					closeCity();
				}
			}
			// 绑定DOM事件
			if (!T.triggerIdMap.city[triggerId]) {
				T.triggerIdMap.city[triggerId] = true;
				T.bindClick(triggerId,boxId,domClick);
			}
			
			var cityObj = T.byId(boxId);
			var iframeObj = T.byId(ifrId);
			if(left+355 > document.body.clientWidth-10){//超出浏览器宽度了
				left = document.body.clientWidth-10-355;
			}
			cityObj.style.top = bottom + 'px';
			cityObj.style.left = left + 'px';
			iframeObj.style.width = '300px';
			iframeObj.style.display = 'block';
			iframeObj.style.top = bottom + 'px';
			iframeObj.style.left = left + 'px';
			iframeObj.style.height=cityObj.offsetHeight+"px";
			
		},
		
		pcaCity : function(params){
			var type = params.type || '',
				presentId = params.presentId || '',
				triggerId = params.triggerId || '',
				provinceHtmlId =  params.pid || '',
				clickFun = params.onclick || function(){},
			
				showObj = T.byId(presentId),
				pid = T.byId(provinceHtmlId).value,
				left = T.getOffsetLeft(showObj),// 文本框的左边位置
				bottom = T.getOffsetTop(showObj) + 25,// 文本框的下边位置
				cDiv,cifr,
				cityHtml = '',
				boxId = 'trip8080Pca',
				ifrId = 'trip8080Iframe',
				proId = 'trip8080Pro',
				closeCity = function(){
					T.hide(boxId);
					T.hide(ifrId);
				};
			
			if(pid == ''){
				alert('请先选择省份');
				return;
			}
				
			if(T.byId(boxId)){
				T.show(boxId);
			}else{
				cDiv = document.createElement('div');
				cDiv.id = boxId;cDiv.className='trip8080_kongTouying';
				document.body.appendChild(cDiv);

				cityHtml += '<div class="trip8080_kongTouying_boder">';
				cityHtml += '<div class="trip8080_kongDiv trip8080_kongDivheight" id="trip8080Pro"><center>正在加载...</center>';
				cityHtml += '</div></div>';
				if(!T.byId(ifrId)){
					cifr = document.createElement('iframe');
					cifr.id = ifrId;
					cifr.style.cssText = 'border:0;z-index:999;position:absolute;';
					document.body.appendChild(cifr);
				}
				T.byId(boxId).innerHTML = cityHtml;
			}
			
			T.jsonp({
				url : config.pcaCityUrl + '?t=' + type + '&pid=' + pid,
				success : function(){
					var cityStr = '';
					if(cArr.length>0){
						cityStr += '<table class="trip8080_kongTouying_tab" width="100%" border="0" cellpadding="0" cellspacing="0"><tr><th><span>城市</span></th><td>';
						for(i=0,l=cArr.length;i<l;i++){
							var _item = cArr[i]; 
							cityStr += '<a href="javascript:;" id="trip8080_pro_'+_item[0]+'_'+_item[1]+'_'+_item[2]+'" class="trip8080_blue" title="'+_item[1]+'">'+_item[1]+'</a>';
						};
						cityStr += '</td></tr></table>';
					}
					T.byId(proId).innerHTML = cityStr;
					
					// 绑定点击事件
					proItems = T.byId(proId).getElementsByTagName('a');
					for (var i = proItems.length - 1; i >= 0; i--) {
						var p_item = proItems[i];
							p_item_split = p_item.id.split('_'),
							param = {'id':p_item_split[2],'name':p_item_split[3],'pinyinUrl':p_item_split[4]};
							var f = function(param){
								return function(){
									clickFun(param);
									closeCity();
								};
							};
						p_item.onclick = f(param);
					};
				}
			});
			var domClick = function(clickId){
				if (!T.triggerIdMap.city[clickId]) {
					closeCity();
				}
			}
			// 绑定DOM事件
			if (!T.triggerIdMap.city[triggerId]) {
				T.triggerIdMap.city[triggerId] = true;
				T.bindClick(triggerId,boxId,domClick);
			}
			
			var cityObj = T.byId(boxId);
			var iframeObj = T.byId(ifrId);
			if(left+355 > document.body.clientWidth-10){//超出浏览器宽度了
				left = document.body.clientWidth-10-355;
			}
			cityObj.style.top = bottom + 'px';
			cityObj.style.left = left + 'px';
			iframeObj.style.width = '300px';
			iframeObj.style.display = 'block';
			iframeObj.style.top = bottom + 'px';
			iframeObj.style.left = left + 'px';
			iframeObj.style.height=cityObj.offsetHeight+"px";
		}
 	})
 	return TTS;
 })