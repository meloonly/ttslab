<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<script src="ttslib/require.js"></script>
<script src="js/index.js"></script>
<link type="text/css" rel="stylesheet" href="ttslib/assets/css/reset_v2.css"/>
<style>
	ul.testUl {
		list-style-type: none;
	}
	ul.testUl li{
		float: left;
		margin-left: 40px;
	}
</style>
</head>
<body>
	<ul class="testUl">
		<li>
			<input type="button" value="预订城市" id="bookStartCityName"/>
		</li>
		<li>
			<input type="button" value="时刻表出发城市" id="shikeStartLink"/>
		</li>
		<li>
			<input type="button" value="时刻表到达城市" id="shikeEndLink"/>
		</li>
		<li>
			时刻表到达城市查询：<input type="text" value="" id="shikeEndCityName"/>
		</li>
		<li>
			车站查询：<input type="text" value="" id="stationName"/>
		</li>
		<li>
			到达站查询：<input type="text" value="" id="bookEndCityName"/>
		</li>
		<li>
			时间控件：<input type="text" readonly="readonly" id="bookStartDate"/>
			<input type="hidden" id="preDay" value="2"/>
			<input type="hidden" id="maxSellDay" value="2013-02-13"/>
		</li>
		<li>
			<input type="button" value="登录" id="loginBtn"/>
		</li>
		<li>
			<input type="button" value="省份" id="stationProvinceName"/>
			<input type="hidden" id="provinceId"/>
		</li>
		<li>
			<input type="button" value="城市" id="stationCityName"/>
		</li>
	</ul>
	
</body>
</html>