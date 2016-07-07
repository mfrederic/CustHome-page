var interfaceSys 	= new Interface('#manage', '#manageBackground', '#alertSaved');
var homePageSys 	= new HomePage('#listLinks li', interfaceSys);
var linksSys 		= new Links('#listLinks', 'li', homePageSys, interfaceSys);
var date 			= new Date();

jQuery(document).ready(function($) {
	linksSys.init();

	function setViewTime() {
		$('#currentTime .hours').text(date.getHours());
		$('#currentTime .minutes').text(date.getMinutes());
	};

	function runClock(interval) {
		if(interval != undefined)
			clearInterval(interval);
		date = new Date();
		setViewTime();
		setTimeout(function() { runClock(); runSeconds(); }, 60000);
	}

	function runSeconds() {
		var degMultiplicator = 360/60;
		var currentSeconds = date.getSeconds();
		$('#currentTime .seconds').css({
			transform: 'rotate('+(currentSeconds*degMultiplicator)+'deg)'
		});
		setTimeout(function() { runSeconds(); }, 1000);
	}

	function initializeClock() {
		setViewTime();
		var secondsLaunch = false;
		var interval = setInterval(function() {
			date = new Date();
			if(date.getSeconds() == 0)
				runClock(interval);

			if(date.getMilliseconds() < 120 && !secondsLaunch) {
				runSeconds();
			}
		}, 100);
	};

	$('#currentTime').ready(function() {
		initializeClock();
	});

	$('.manage').attr('onclick', 'linksSys.setLinkManager($(this));');
	$('#manage .cancel').attr('onclick', 'linksSys.unSetLinkManager();');
	$('#manage .save').attr('onclick', 'linksSys.saveLink($(this));');
	$('#manageBackground .save').attr('onclick', 'linksSys.saveBg();');
	$('.auto-select').attr('onfocus', '$(this).select();');

	$('.manage-background').attr('onclick', 'linksSys.setBgManager()');
	$('#manageBackground .cancel').attr('onclick', 'linksSys.unsetBgManager()');

	$('.link img').attr('onload', 'linksSys.centerImage($(this));');
	$('#listLinks li a').attr('onfocus', '$(this).parents("li").addClass("active");').attr('onblur', '$(this).parents("li").removeClass("active");');
});