var MapEd = {

	hulls: [],
	props: [],
	pointMarkers: [],
	areaMarkers: [],

	elementIndex: 0,

	$tools: null,
	$container: null,
	$level: null,
	$background: null,
	$canvas: null,

	init: function() {
		$tools = $('.tools');
		$container = $('.level-container');
		$level = $('.level');
		$background = $('.background');
		$canvas = $('.canvas');

		this.setupScreenSize();
		this.setupToolButtons();

		$(window).resize(this.setupScreenSize());

	},

	setupScreenSize: function() {

		var screenW = $(window).width();
		var screenH = $(window).height();

		var levelW = $background.find('img').width();
		var levelH = $background.find('img').height();

		$container.css({width: screenW, height: screenH - 30});
		$level.css({width: levelW, height: levelH});
		$canvas.css({width: levelW, height: levelH});
		$background.css({width: levelW, height: levelH});

	},

	setupToolButtons: function() {
		$tools.on('click', '.btn-create-hull', MapEd.createHull);
	},


	createHull: function() {

		var hull = {
			id: ++MapEd.elementIndex,
			x: 100,
			y: 100,
			w: 100,
			h: 100,
			elm: null
		};

		hull.elm = $('<div class="hull" id="hull-'+hull.id+'" rel="'+hull.id+'"><p></p></div>').appendTo($canvas);
		$(hull.elm)
			.css({left: hull.x, top: hull.y, width: hull.w, height: hull.h})
			.draggable({containment: '.canvas', scroll: true, scrollSensitivity: 200, scrollSpeed: 5, drag: MapEd.onHullDrag})
			.resizable({containment: '.canvas', resize: MapEd.onHullResize});

		MapEd.hulls[hull.id] = hull;

		MapEd.updateHullDisplay(hull.elm, hull);
	},

	getHullByElement: function(elm) {
		var lookupID = parseInt(elm.attr('rel'));
		return MapEd.hulls[lookupID];
	},

	updateHullDisplay: function(elm, hull) {
		elm.find('p').text("x=" + hull.x + ", y=" + hull.y + ", w=" + hull.w + ", h=" + hull.h);
	},

	onHullDrag: function(ev, ui) {
		var elm = $(ev.target);
		var offset = ui.offset;

		var hull = MapEd.getHullByElement(elm);
		hull.x = offset.left;
		hull.y = offset.top;

		MapEd.updateHullDisplay(elm, hull);

	},

	onHullResize: function(ev, ui) {
		var elm = $(ev.target);
		var position = ui.position;
		var size = ui.size;

		var hull = MapEd.getHullByElement(elm);
		hull.x = position.left;
		hull.y = position.top;
		hull.w = size.width;
		hull.h = size.height;

		MapEd.updateHullDisplay(elm, hull);
	},

	createProp: function() {

	},

	createPointMarker: function() {

	},

	createAreaMarker: function() {

	},

	exportJSON: function() {

	}

};