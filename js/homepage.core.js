var HomePage = function(listSelector, interfaceSys) {
	this.listLinks = [];
	this.debug = false;
	this.background = null;
	this.listSelector = listSelector;
	this.interfaceSys = interfaceSys;

	this.getList = function() {
		this.print('getList');

		return this.listLinks;
	};

	this.getItem = function(index) {
		var item = this.listLinks[index];
		if(item == undefined)
			return {
				jsRank: null,
				image: null,
				text: null,
				url: null
			};
		item.jsRank = index;
		return item;
	}

	this.load = function() {
		this.print('load');

		var context = this;
		var chain = $.cookie('homepage');
		if(chain == undefined) {
			this.update().save();
			this.print('Links generated !');
		} else {
			this.listLinks = JSON.parse(chain);
			this.print('Links loaded !');
		}
		return this;
	};

	this.loadBackGround = function() {
		var background = $.cookie('homepage_background');
		return (background == undefined) ? null : background;
	};

	this.print = function(message) {
		if(this.debug)
			console.log(message);
	};

	this.save = function(callback) {
		this.print('save');
		$.cookie('homepage', JSON.stringify(this.listLinks), {
			expires: 365,
			path: '/'
		});

		this.interfaceSys.flashSaved();
		return this;
	};

	this.setBackground = function(bgurl) {
		this.background = bgurl;
		$.cookie('homepage_background', bgurl, {
			expires: 365,
			path: '/'
		})
	}

	this.setDebug = function(activate) {
		this.print('setDebug');

		activate = (activate == undefined) ? false : true;
		this.debug = activate;
	}

	this.updateOne = function(index, values, callback) {
		this.print('updateOne');
		
		this.listLinks[index] = values;
		callback(this);
		return this;
	};

	this.update = function() {
		this.print('update');
		
		this.listLinks = [];
		var context = this, current;
		jQuery(this.listSelector).each(function() {
			current = {
				image: $(this).find('.link img').attr('src'),
				text: $(this).find('.link .title').text(),
				url: $(this).find('.link').attr('href')
			};

			current.image = (current.image == undefined) ? '' : current.image;
			current.text = (current.text == undefined) ? '' : current.text;
			current.url = (current.url == undefined) ? '' : current.url;

			context.listLinks.push(current);
		});
		return this;
	};

	this.background = this.loadBackGround();
	this.load();

	var context = this;
	jQuery('html').css({
		backgroundImage: 'url('+context.background+')'
	});

	this.print('HomePage Loaded !');
};