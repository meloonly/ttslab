/**
 *@fileoverview 基础模块，可以单独引用或是当成模块引用
 *@author raul73521@yahoo.com.cn
 */
(function(W,T,undefined){
	/**
	 * @name base
	 * @class  基础模块，可以单独引用或是当成模块引用
	 * @version  ttslib v-1.0.0
	 */
	if (W[T] === undefined) W[T] = {};
    T = W[T];
	var rtrim = /(^\s*)|(\s*$)/g;
   	var _innerFlag,_innerHeight;
   	if(top !== W) {
   		_innerFlag = true;
   		_innerHeight = document.documentElement.clientHeight;
   	}
   	//jquery的实现方式
   	/** @lends base.prototype*/
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
    	/**
    	 * 所有请求的基本路径
    	 */
    	baseUrl : T.baseUrl || 'http://www.trip8080.com/',

    	/**
    	 * 服务器时间
    	 */
    	serverTime : '',

    	/**
    	 * 是否是数组
    	 * @param {Object} elem
    	 * @returns {Boolean}
    	 */
    	isArray : function(elem){
			return Object.prototype.toString.call(elem) === '[object Array]';
		},

		/**
		 * 是否是函数
		 * @param {Object} elem
		 * @returns {Boolean}
		 */
		isFunction : function(elem){
			return Object.prototype.toString.call(elem) === '[object Function]';
		},

		/**
		 * 是否是对象
		 * @param {Object} o
		 * @returns {Boolean}
		 */
		//see http://lifesinger.org/blog/2010/12/thinking-of-isplainobject/
		isPlainObject:function (o) {
            return o && toString.call(o) === '[object Object]' && 'isPrototypeOf' in o;
        },

        /**
         * @param {String} data
         * @returns {Object}
         */
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

		/**
		 * 去除首尾空格
		 * @param {String} str
		 * @returns {String} 返回处理过的字符串
		 */
		trim : function(str){
			if(str==null){return '';}
			return str.replace(rtrim, '');
		},

		/**
		 * 补零函数
		 * @param {Number} t 传入数字 
		 * @returns {String} 若传入的是0-10之间的数字则补零返回，否则不做变化
		 */
		_t : function(t){
			if(typeof t != 'number'){return;}
			var tt = Math.round(t);
			return tt<10?'0'+tt:tt;
		},

		/**
		 * 返回document.getElementById(id)
		 * @param {String}  id 某元素id
		 * @returns {Object} 
		 */
		byId : function(id){
			return document.getElementById(id)?document.getElementById(id):null;
		},

		/**
		 * 返回所有指定className的元素集合
		 * @param {String} className *class名称
		 * @param {Object} context 指定一个上下文，不传默认为全局
		 * @returns {Array} 返回class为
		 */
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

		/**
		 * 返回某个元素的所有祖先节点集合
		 * @param {Object} elem *指定一个元素
		 * @returns {Array} 返回该元素的所有祖先节点，若无祖先返回[]
		 */
		parent : function(elem){
			var res = [],
				t = elem.parentNode;
			while(t = t.parentNode){
				res.push(t);
			}
			return res;
		},

		/**
		 * 获得元素的offsetTop，等同于jqueryObject.offset().top
		 * @param {Object} el *指定一个元素
		 * @returns {String} 返回元素的offsetTop 
		 */
		getOffsetTop : function(el){
			var _t =el.offsetTop;
	        while(el = el.offsetParent){
	        	_t += el.offsetTop;
	    	}
	    	return _t;
		},

		/**
		 * 获得元素的offsetLeft，等同于jqueryObject.offset().left
		 * @param {Object} el *指定一个元素
		 * @returns {String} 返回元素的offsetLeft
		 */
		getOffsetLeft : function(el){
			var _t =el.offsetLeft;
		        while(el =el.offsetParent){
		        _t += el.offsetLeft;
		    }
		    return _t;
		},

		/**
		 * 隐藏元素
		 * @param {String} id *指定需要隐藏元素的id
		 */
		hide : function(id){
			if (T.byId(id)) {T.byId(id).style.display = 'none'}
		},

		/**
		 * 显示元素
		 * @param {String} id *指定需要显示元素的id
		 */
		show : function(id){
			if (T.byId(id)) {T.byId(id).style.display = 'block'}
		},

		/**
		 * 返回一个指定长度的字符串
		 * @param {String} str *指定一个字符串
		 * @param {Number} maxLen *指定一个长度 
		 * @returns {String} 指定长度的字符串并以'...'结尾
		 */
		limitLenStr : function(str,maxLen){
			return str!=null && str.length > maxLen ? str.slice(0,maxLen)+'...' : str;
		},

		/**
		 * jsonp请求
		 * @param params
		 * @param {String} params.url *请求的url地址
		 * @param {Function} params.success *所有步骤成功了以后执行的函数
		 * @param {Function} params.callback *回调函数
		 */
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

		/**
		 * 判断某元素是否在一个数组中，并返回下标
		 * @param {Object} elem * 指定元素
		 * @param {Array} arr * 指定数组
		 * @param {Number} i  指定数组的起始位置
		 * @returns {Number}  如果存在则返回该元素在指定数组中的下标，否则返回-1
		 */
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

		/**
		 * 获得baseUrl
		 * @returns {String}
		 */
		getBaseUrl : function(){
			return T.baseUrl;
		},
		
		/**
		 * 绑定点击事件
		 * @param triggerId *触发事件的ID
		 * @param boxId *控件ID
		 * @param closeFun *关闭控件方法
		 */
		bindClick : function (triggerId,boxId,closeFun) {
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

		/**
		 * 获得服务器时间并执行回调函数
		 * @param {Function} fn
		 */
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

    if(typeof define === 'function' && define.amd){
       	define('base', function () { return T; });
    }
})(window,'TTS');