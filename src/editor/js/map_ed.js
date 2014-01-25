var MapEd = {

	levelName: 'dev_scene_bg',

	exportURL: 'http://localhost/maped/export.php',
	importURL: 'http://localhost/maped/import.php',
	backgroundURL: 'http://localhost/maped/background.php',

	elements: {},
	elementIndex: 0,

	hulls: {},
	props: {},
	pointMarkers: {},
	areaMarkers: {},

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
		$tools.on('click', '.btn-create-hull', MapEd.onCreateHull);
		$tools.on('click', '.btn-import-json', MapEd.importJSON);
		$tools.on('click', '.btn-export-json', MapEd.exportJSON);
	},

	onCreateHull: function() {
		MapEd.createHull(100, 100, 100, 100, ++MapEd.elementIndex);
	},

	createHull: function(x, y, w, h, id) {

		var hull = {
			id: id,
			x: x,
			y: y,
			w: w,
			h: h
		};

		MapEd.elements[hull.id] = $('<div class="hull" id="hull-'+hull.id+'" rel="'+hull.id+'"><p></p></div>').appendTo($canvas);
		$(MapEd.elements[hull.id])
			.css({left: hull.x, top: hull.y, width: hull.w, height: hull.h})
			.draggable({containment: '.canvas', scroll: true, scrollSensitivity: 200, scrollSpeed: 5, drag: MapEd.onHullDrag})
			.resizable({containment: '.canvas', resize: MapEd.onHullResize});

		MapEd.hulls[hull.id] = hull;

		MapEd.updateHullDisplay(MapEd.elements[hull.id], hull);

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

		MapEd.levelName = $('.fld-level-name').val();

		var jsonObj = {
			hulls: MapEd.hulls
		};

		var jsonStr = JSON.stringify(jsonObj);

		$.post(
			MapEd.exportURL,
			{
				json: jsonStr,
				levelName: MapEd.levelName
			},
			function (status) {
				if(status != "STATUS_OK") {
					console.log(status);
					alert("ERROR: " + status);
				} else {
					alert("OK!");
				}
			}
		)

	},

	importJSON: function() {

		MapEd.levelName = $('.fld-level-name').val();

		$background.find('img').attr('src', MapEd.backgroundURL+"?levelName="+MapEd.levelName);

		$.post(
			MapEd.importURL,
			{
				levelName: MapEd.levelName
			},
			function (data) {

				var obj = $.parseJSON(data);

				for(var i in obj.hulls) {
					var hull = obj.hulls[i];
					if(!hull) { continue; }

					MapEd.createHull(hull.x, hull.y, hull.w, hull.h, hull.id);
				}

			}
		)

	}

};