var Interface = function(linkManager, bgManager, savedBlock) {
	this.linkManager = (linkManager != undefined) ? linkManager : null;
	this.bgManager = (bgManager != undefined) ? bgManager : null;
	this.savedBlock = (savedBlock != undefined) ? savedBlock : null;

	this.flashSaved = function() {
		if(this.savedBlock != null)
			$(this.savedBlock).velocity({ opacity: 1 }, {
				duration: 150,
				easing: 'easeInOutQuint',
				display: 'block'
			}).velocity('reverse', {
				delay: 1500,
				display: 'none'
			});
		return this;
	};

	this.getBgManagerData = function() {
		if(this.bgManager != null)
			return $(this.bgManager).find('#bgurl').val();
		return this;
	};

	this.getLinkManagerData = function() {
		if(this.linkManager != null){
			return {
				jsRank: $(this.linkManager).attr('js-rank'),
				image: $(this.linkManager).find('#image').val(),
				text: $(this.linkManager).find('#text').val(),
				url: $(this.linkManager).find('#url').val()
			}
		}
		return this;
	};

	this.hideBgManager = function() {
		if(this.bgManager != null)
			$(this.bgManager).velocity({ right: -300 }, {
				duration: 150,
				easing: 'easeInOutQuint',
				display: 'none'
			});
		return this;
	};

	this.hideLinkManager = function() {
		if(this.linkManager != null)
			$(this.linkManager).velocity({ left: -300 }, {
				duration: 150,
				easing: 'easeInOutQuint',
				display: 'none'
			});
		return this;
	};

	this.showBgManager = function() {
		if(this.bgManager != null)
			$(this.bgManager).velocity({ right: 0 }, {
				duration: 150,
				easing: 'easeInOutQuint',
				display: 'block'
			});
		return this;
	};

	this.showLinkManager = function() {
		if(this.linkManager != null)
			$(this.linkManager).velocity({ left: 0 }, {
				duration: 150,
				easing: 'easeInOutQuint',
				display: 'block'
			});
		return this;
	};

	this.setBgManagerData = function(bgUrl) {
		if(this.bgManager != null)
			$(this.bgManager).find('#bgurl').val(bgUrl);
		return this;
	};

	this.setLinkManagerData = function(data) {
		if(this.linkManager != null){
			$(this.linkManager).attr('js-rank', data.jsRank);
			$(this.linkManager).find('#image').val(data.image);
			$(this.linkManager).find('#text').val(data.text);
			$(this.linkManager).find('#url').val(data.url);
		}
		return this;
	};

	this.updateBg = function(bgurl) {
		var width = $('html').outerWidth();
		$('html').velocity({
			'background-position-x': [width+100, 0]
		}, {
			duration: 500,
			easing: 'easeInOutQuint',
			complete: function() {
				$('html').css({'background-image': 'url('+bgurl+')'});
			}
		}).velocity({
			'background-position-x': [0, width+100]
		}, {
			delay: 500,
			duration: 500,
			easing: 'easeInOutQuint'
		});
	};
};