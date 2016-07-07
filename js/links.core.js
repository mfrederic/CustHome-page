var Links = function(listId, listItem, homePageSys, interfaceSys) {
	this.list = listId;
	this.listItem = listItem;
	this.listItems = this.list + ' ' + this.listItem;
	this.interfaceSys = interfaceSys;
	this.homePageSys = homePageSys;

	this.centerImage = function(img) {
		if($(img).height() < 150) {
			var padding = (150 - $(img).height()) / 2;
			$(img).velocity({
				opacity: 1,
				paddingTop: padding,
				paddingBottom: padding
			}, { duration : 150 });
		}
	}

	this.centerImages = function() {
		var context = this;
		$(this.listItems + ' .link img').each(function() {
			context.centerImage($(this));
		});
	}

	this.init = function() {
		var context = this;

		this.setSortable('.sortable');

		$(this.listItems + ' .manage').each(function(index) {
	    	$(this).attr('js-rank', index);
	    });

		var listLinks = this.homePageSys.getList();
		$.each(listLinks, function(index) {
			var current = $(context.listItems + ':eq('+index+')');

			current.find('.link').prop('href', (this.url != '') ? this.url : 'javascript:;');

			current.find('.link img').prop('src', this.image);
			if(this.image != '') current.find('.link img').show(0);

			current.find('.link .title').text(this.text);
			if(this.text != '') current.find('.link .title').show(0);
		});

		return this;
	};

	this.setBgManager = function() {
		this.interfaceSys.showBgManager().setBgManagerData(this.homePageSys.background);
	};

	this.saveBg = function() {
		this.homePageSys.setBackground(this.interfaceSys.getBgManagerData());
		this.interfaceSys.hideBgManager().updateBg(this.homePageSys.background);
	};

	this.saveLink = function(elt) {
		var currentContext = this;
		var manage = elt.parents('#manage');
		var rank = manage.attr('js-rank');

		this.homePageSys.updateOne(rank, currentContext.interfaceSys.getLinkManagerData(), function(context) {
			var link = context.listLinks[rank];
			var item = $(currentContext.listItems + ':eq(' + rank + ')');

			item.find('.link').prop('href', link.url);
			item.find('.link img').prop('src', link.image);
			if(link.image != '') item.find('.link img').show(0);
			else item.find('.link img').hide(0);
			item.find('.link .title').text(link.text);
			if(link.text != '') item.find('.link .title').show(0);
			else item.find('.link .title').hide(0);
		}).save();

		this.centerImages();
		this.unSetLinkManager();
	};

	this.setLinkManager = function(elt) {
		var jsRank = elt.attr('js-rank');
		var data = this.homePageSys.getItem(jsRank);
		data.jsRank = jsRank;
		this.interfaceSys.showLinkManager().setLinkManagerData(data);
	};

	this.setSortable = function(cssClass) {
		var context = this;
		$(cssClass).sortable({
			items: '> ' + context.listItem,
			opacity: 0.5,
			revert: 100,
			scroll: false,
			zIndex: 10000,
			update: function(event, ui) {
				$(context.listItems).each(function(index) {
					$(this).find('.manage').attr('js-rank', index);
				});
				context.homePageSys.update().save();
			}
		});

	    $(cssClass).disableSelection();
	};

	this.unsetBgManager = function() {
		this.interfaceSys.hideBgManager();
	}

	this.unSetLinkManager = function() {
		this.interfaceSys.hideLinkManager().setLinkManagerData({
			jsRank: null,
			image: null,
			text: null,
			url: null
		});
	};

};