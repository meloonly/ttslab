require.config({
	baseUrl : 'ttslib/',
	map : {
		'*' : {
			'css' : 'assets/css/css',
			'text' : 'plugins/text'
		}
	},
	shim : {
		'common' : {
			exports : 'Common'
		}
	}
});
var TTS = {
	baseUrl : 'http://172.18.0.104/'	
};