/*ttslib v-1.0.0
 *基础模块，可以单独引用或是当成模块引用
 *@author raul73521@yahoo.com.cn
 */
(function(W,T,undefined){
	if (W[T] === undefined) W[T] = {};
    T = W[T];
	var rtrim = /(^\s*)|(\s*$)/g;
   	var _innerFlag,_innerHeight;
   	if(top !== W) {
   		_innerFlag = true;
   		_innerHeight = document.documentElement.clientHeight;
   	}
   	//jquery的实现方式
	var _extend = function(){
		//参数可选，deep,target,options
		var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !T.isFunction(target) ) {
			target = {};
		}

		// extend TTS itself if only one argument is passed
		if ( length === i ) {
			target = this;
			--i;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( T.isPlainObject(copy) || (copyIsArray = T.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && T.isArray(src) ? src : [];

						} else {
							clone = src && T.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = T.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

    _extend (T, {
    	baseUrl : 'http://www.trip8080.com/',

    	serverTime : '',

    	isArray : function(elem){
			return Object.prototype.toString.call(elem) === '[object Array]';
		},

		isFunction : function(elem){
			return Object.prototype.toString.call(elem) === '[object Function]';
		},

		/**
		 * TODO
		 * see http://lifesinger.org/blog/2010/12/thinking-of-isplainobject/
		 */ 
		isPlainObject:function (o) {
            return o && toString.call(o) === '[object Object]' && 'isPrototypeOf' in o;
        },

    	parseJSON : function( data ) {
			if ( !data || typeof data !== "string") {
				return null;
			}

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = T.trim( data );

			// Attempt to parse using the native JSON parser first
			if ( window.JSON && window.JSON.parse ) {
				return window.JSON.parse( data );
			}

			if ( rvalidchars.test( data.replace( rvalidescape, "@" )
				.replace( rvalidtokens, "]" )
				.replace( rvalidbraces, "")) ) {
				return ( new Function( "return " + data ) )();
			}
		},

		trim : function(str){
			if(str==null){return '';}
			return str.replace(rtrim, '');
		},

		_t : function(t){
			if(typeof t != 'number'){return;}
			var tt = Math.round(t);
			return tt<10?'0'+tt:tt;
		},

		byId : function(id){
			return document.getElementById(id)?document.getElementById(id):null;
		},

		byClass : function(className,context){
			var res = [];
			var _all = context!=null ? context : document.getElementsByTagName('*');
			for(var i = 0,l=_all.length;i<l;i++){
				if(_all[i].className == className){
					res.push(_all[i]);
				}
			}
			return res;
		},

		parent : function(elem){
			var res = [],
				t = elem.parentNode;
			while(t = t.parentNode){
				res.push(t);
			}
			return res;
		},

		getOffsetTop : function(el){
			var _t =el.offsetTop;
	        while(el = el.offsetParent){
	        	_t += el.offsetTop;
	    	}
	    	return _t;
		},

		getOffsetLeft : function(el){
			var _t =el.offsetLeft;
		        while(el =el.offsetParent){
		        _t += el.offsetLeft;
		    }
		    return _t;
		},

		hide : function(id){
			if (T.byId(id)) {T.byId(id).style.display = 'none'}
		},

		show : function(id){
			if (T.byId(id)) {T.byId(id).style.display = 'block'}
		},

		limitLenStr : function(str,maxLen){
			return str!=null && str.length > maxLen ? str.slice(0,maxLen)+'...' : str;
		},

		jsonp : function(params){
			this.url = params.url || "";
			var success = params.success || function(){};
			var callback = params.callback||function(){};
			jsonpcallback = callback;
			var d = document,w = window;
			var script = d.createElement("script");
			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			script.src = this.url + (this.url.indexOf('?')==-1?'?callback=jsonpcallback':'&callback=jsonpcallback');
			head.insertBefore(script,head.firstChild);
			var done = false;
			
			script.onload = script.onreadystatechange = function(){
				if ( !done && (!this.readyState ||
						this.readyState === "loaded" || this.readyState === "complete") ) {
					done = true;
					success();
					script.onload = script.onreadystatechange = null;
					if ( head && script.parentNode ) {
						head.removeChild( script );
					}
				}
			};
		},

		//jquery
		//@TODO
		inArray: function( elem, arr, i ) {
			var len;

			if ( arr ) {
				if ( Array.prototype.indexOf ) {
					return Array.prototype.indexOf.call( arr, elem, i );
				}

				len = arr.length;
				i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

				for ( ; i < len; i++ ) {
					// Skip accessing in sparse arrays
					if ( i in arr && arr[ i ] === elem ) {
						return i;
					}
				}
			}

			return -1;
		},

		getBaseUrl : function(){
			return T.baseUrl;
		},

		bindClick : function (triggerId,boxId,closeFun) {// 触发事件的ID，控件ID，关闭控件方法
			if(document.onclick != null){
				var clickFun = document.onclick;
				document.onclick = function(event){
					var e=event||window.event; 
					var srcElement =e.srcElement||e.target;
					var clickId = srcElement.id;
					if(srcElement.id != triggerId){
						while (srcElement && srcElement.id!=boxId){
			            	srcElement = srcElement.parentNode?srcElement.parentNode:srcElement.parentElement;
			       		}
						if (srcElement == null){
							if (closeFun!=null) {
								closeFun(clickId);
							}
						}
					}
					clickFun();
				}
			}else{
				document.onclick=function(event){	
					var e=event||window.event; 
					var srcElement =e.srcElement||e.target;
					var clickId = srcElement.id;
					if(srcElement.id != triggerId){
						while (srcElement && srcElement.id!=boxId){
			            	srcElement = srcElement.parentNode?srcElement.parentNode:srcElement.parentElement;
			       		}
						if (srcElement == null){
							if (closeFun!=null) {
								closeFun(clickId);
							}
						}
					}
			     }
			}
		},

		setTime : function(fn){
			if(T.serverTime == ''){
				T.jsonp({
					url : T.baseUrl + 'open/getTime.jspx',
					success : function(){
						if(trip8080Time != null){
							T.serverTime = trip8080Time;
							fn(T.serverTime);
						}
					}
				});
			}
			if(fn && typeof fn === 'function'){
				fn(T.serverTime);
			}
		},

		extend : _extend,

		/**
		 * 所有触发事件的ID集合，现在分三种，城市控件、日期控件、下拉列表。 /*
		 * 记录这些id的原因在于：避免绑定dom的onclick事件所引发重复关闭。 /*
		 * 比如时刻出发和到达两个图标a,b都能触发城市控件。城市控件的DIV是同一个，而给a和b绑定的dom事件都是关闭城市控件这一个动作。
		 */
		triggerIdMap : {
			'city':{},
			'date':{},
			'select':{}
		},

		innerFlag : _innerFlag,

		innerHeight : _innerHeight


    });

	// T.extend({
		
	// 	componentConfig : {
	// 		'cssUrl' : T.getBaseUrl() + 'open/css/open_style.css',
	// 		'bookEndUrl' : T.baseUrl + 'open/book.jspx',
	// 		'citySelUrl' : T.baseUrl + 'open/citySelect.jspx',
	// 		'stationSelUrl' : T.baseUrl + 'open/chezhan.jspx',
	// 		'pcaProvinceUrl' : T.baseUrl + 'open/pcaProvinces.jspx',
	// 		'pcaCityUrl' : T.baseUrl + 'open/pcaCities.jspx',
	// 		'serverTimeUrl' : T.baseUrl + 'open/getTime.jspx',
	// 		'cityTypeConfig':{
	// 			'cityUrl' : T.baseUrl +'open/cityArr.jspx',
	// 			'book' : {'arr':[],'hotStr':'','otherStr':'','q':'book'},
	// 			'shike' : {'arr':[],'hotStr':'','otherStr':'','q':'shike'},
	// 			'chezhan' : {'arr':[],'hotStr':'','otherStr':'','q':'chezhan'},
	// 			'daishou' : {'arr':[],'hotStr':'','otherStr':'','q':'daishou'},
	// 			'shike_st' : {'arr':[],'hotStr':'','otherStr':'','q':'shike_st'},
	// 			'shike_en' : {'arr':[],'hotStr':'','otherStr':'','q':'shike_en'},
	// 			'weather' : {'arr':[],'hotStr':'','otherStr':'','q':'weather'}
	// 		},
	// 		'bookEndCityArr':[],
	// 		'citySelectArr':[],		// 缓存城市下拉匹配
	// 		'stationSelectArr':[],	// 缓存车站下拉匹配
	// 		'pcaProvinceStr': ''	// 缓存省份列表
	// 	}
	// })

    if(typeof define === 'function' && define.amd){
       	define('base', function () { return T; });
    }
})(window,'TTS');