//首页业务逻辑
require.config({
	baseUrl : 'ttslib/',
	map : {
		'*' : {
			'css' : 'assets/css/css',
			'text' : 'plugins/text',
		}
	},
	shim : {
		'common' : {
			exports : 'Common'
		}
	}
	// paths : {
	// 	'css/open_style' : 'css/open_style'
	// }
});
// require(['base'],function(TTS){
	
	//测试用例
	/*
	 *@method TTS.extend
	 */ 
	// var obj = {
	// 	name : 'cheer',
	// 	age : '25',
	// 	favorite : {
	// 		color : 'red',
	// 		song : ['sentimental kills','california dream']
	// 	}
	// };
	// TTS.extend(true,obj,{
	// 	height : '163',
	// 	favorite : {
	// 		food : 'noodles'
	// 	}
	// });
	// console.log(obj);

	/*
	 *@method TTS.parseJSON
	 */ 
	//var json = TTS.parseJSON('{"a":1}');
	//console.log(json);

	// TTS.baseUrl = 'http://172.18.0.104/';
	// console.log(TTS.getBaseUrl());
// });
require(['cityset','datePicker','loginBox','jquery'],function(TTS){

	$('#bookStartCityName').click(function(){
		// this.select();
		TTS.city({
			type:'book',
			triggerId:'bookStartCityName',
			presentId:'bookStartCityName',
			onclick:function(res){
				console.log(res);
			}
		});
	});

	$('#shikeStartLink').click(function(){
		TTS.city({
			type : 'shike_st',
			presentId : 'shikeStartLink',
			triggerId : 'shikeStartLink',
			onclick : function(res){
				console.log(res);
			}
		});
		return false;
	});

	$('#shikeEndLink').click(function(){
		TTS.city({
			type : 'shike_en',
			presentId : 'shikeEndLink',
			triggerId : 'shikeEndLink',
			onclick : function(res){
				console.log(res);
			}
		});
		return false;
	})

	$('#shikeEndCityName').keyup(function(event){
		TTS.citySelect({
			type : 'shike_en',
			triggerId : 'shikeEndCityName',
			presentId : 'shikeEndCityName',
			hiddenCityId : 'shikeEndCityId',
			e : event,
			onclick : function(res){
				console.log(res);
			},
			onEnter : function(){
				console.log('enter');
			},
			onError : function(){
				console.log('error');
			}
		});
	})

	$('#stationName').keyup(function(event){
		TTS.stationSelect({
			triggerId : 'stationName',
			presentId : 'stationName',
			cityId : 1,
			e : event,
			onclick : function(res){
				console.log(res);
			},
			onEnter : function(){
				console.log('enter');
			},
			onError : function(){
				console.log('error');
			}
		});
	})

	$('#bookEndCityName').keyup(function(event){
		TTS.bookEndCity({
	        type:'book',
	        endCityHiddenId : 'bookEndCityId',
		    endCityNameId : 'bookEndCityName',
		    startCityId : 33,
	        e : event,
	        onclick:function(res){
		        console.log(res);
	        },
	       	onEnter:function(){
	        	console.log('enter');
	       	},
	       	onError:function(){
	       		console.log('error');
	       	}
	    })
	})

	TTS.setTime(function(time){
		$('#bookStartDate').val(time);
	})
	$('#bookStartDate').click(function(){
		TTS.datePicker({
			preDateId : 'preDay',
			triggerId : 'bookStartDate',
			maxSellDayId : 'maxSellDay'
		});
	})

	$('#loginBtn').click(function(){
		TTS.loginBox();
	})

	$('#stationProvinceName').click(function(){
		TTS.pcaPro({
			type : 'chezhan',
			triggerId : 'stationProvinceName',
			presentId : 'stationProvinceName',
			onclick : function(res){
				console.log(res);
				$('#provinceId').val(res.id);
			}
		})
	})

	$('#stationCityName').click(function(){
		TTS.pcaCity({
			triggerId : 'stationCityName',
			presentId : 'stationCityName',
			pid : 'provinceId',
			onclick : function(res){
				console.log(res);
			}
		})
	})

})

