'use strict';

var SearchInput = (function() {
	var SearchInput = function() {
		this.parent = $('.daft__search-result').eq(0);
		this.ele = $('<form>').addClass('daft__search-input');
		this.input = $('<input>')
			.attr('id','daft__search-input')
			.attr('placeholder', 'search')
			.addClass('daft__search-input__text');

		this.searchBtn = $('<button>')
			.attr('id','daft__search-input__btn')
			.addClass('daft__search-input__btn')
			.html('GO');

		this.init();
	};

	SearchInput.prototype.init = function() {
		var me = this;

		me.initElements();
		me.initEvents();
	};

	SearchInput.prototype.initEvents = function() {
		var me = this;
		this.searchBtn.on('click', function(e) {
			e.preventDefault();
			var val = me.input.val();
			console.log(val);
		});
	};

	SearchInput.prototype.initElements = function() {
		this.ele.append(this.input);
		this.ele.append(this.searchBtn);
		this.parent.append(this.ele);
	};

	return SearchInput;
})();

var Modal = (function($) {
	var Modal = function() {
		this.ele = $('<div>')
			.addClass('daft__modal')
			.css({
				width: '100%',
				height: '100%',
				position: 'fixed',
				bottom: '0',
				top: '0',
				backgroundColor: '#000',
				opacity: '0.5',
				textAlign: 'center',
				fontSize: '30px',
				lineHeight: '400px',
				color: '#fff'
			})
			.html('loading ....');

		this.init();
	};

	Modal.prototype.init = function() {
		$('body').append(this.ele);
		this.ele.hide();
	};
	Modal.prototype.show = function() {
		this.ele.fadeIn();
	};

	Modal.prototype.hide = function() {
		this.ele.fadeOut();
	};
	return Modal
})(jQuery);

/**
 * VIEW
 * Search Result
 */
var SearchResult = (function($) {
	var SearchResult = function() {
		this.parent = $('.daft__search-result').eq(0);
		this.ele = $('<div>');
		this.parent.append(this.ele);
		this.data = null;
		this.listItem = [];
	};

	SearchResult.prototype.setData = function(data) {
		this.data = data;
		this.updateData();
	};

	SearchResult.prototype.updateData = function(newData) {
		var li, i = 0, ln = this.data.getSize() || 0;
		var frag = $(document.createDocumentFragment());
		for(; i < ln; i++) {
			li = new SearchResultItem();
			li.setData(this.data.getAt(i));
			frag.append(li.ele);
		};
		this.ele.append(frag);
	};

	return SearchResult;
})(jQuery);

/**
 * VIEW LIST ITEM
 */
var SearchResultItem = (function() {
	var SearchResultItem = function() {
		this.ele = $('<div>').addClass('daft__search-result__item');
		this.nameEle = $('<div>');
		this.idEle = $('<div>');
		this.data = null;
		this.init();
	};

	SearchResultItem.prototype.init = function() {
		this.ele.append(this.nameEle);
		this.ele.append(this.nameEle);
	};

	SearchResultItem.prototype.setData = function(data) {
		this.data = data;
		this.data.joinView(this);
		this.updateData(data);
	};

	SearchResultItem.prototype.updateData = function(newData) {
		this.nameEle.html(newData.get('name'));
		this.idEle.html(newData.get('id'));
	};
	return SearchResultItem;
})();

/**
 * DATA
 * Search Store
 */
var Store = (function() {
	var Store = function() {
		this.data = null;
		this.records = null;
	};

	Store.prototype.setData = function(data) {
		this.data = data;
		this.updateData();
	};

	Store.prototype.updateData = function(newData) {
		var r;
		this.records = this.records || [];
		for(var i  = 0;  i < this.data.length; i++) {
			r = new Record();
			r.setData(this.data[i]);
			this.records.push(r);
		}
	};

	Store.prototype.getSize = function() {
		return this.records.length;
	};

	Store.prototype.getAt = function(index) {
		return this.records[index];
	};
	return Store;
})();

/**
 * DATA RECORD
 */
var Record = (function() {
	var Record = function() {
		this.data = null;
		this.bindedView = null;
	};

	Record.prototype.joinView = function(view) {
		this.bindedView = view;
	};

	Record.prototype.setData = function(data) {
		this.data = data;
		this.updateData(data);
	};

	Record.prototype.updateData = function(newData) {
		if(this.bindedView) {
			this.bindedView.setData(newData);
		}
	};

	Record.prototype.get = function(pro) {
		return this.data[pro];
	};

	return Record;
})();

/**
 * HANDLER / CONTROLLER
 */
var SearchHandler = (function($) {
	
	var SearchHandler = function() {
		this.modal = new Modal();
	};

	SearchHandler.prototype.request = function(fn) {
		var me = this;
		me.modal.show();
		setTimeout(function() {
			$.post('query-handler.php', {name: 'hello'}, function(data, status){
				fn.call({}, data, status)
				me.modal.hide();
	    	});
		}, 1000);
	};

	return SearchHandler;
})(jQuery);

var si = new SearchInput();
var store = new Store();
var list = new SearchResult();
var sh = new SearchHandler();

var onRequest = function(data) {
	data = JSON.parse(data);
    store.setData(data);
    list.setData(store);
};

sh.request(onRequest);
