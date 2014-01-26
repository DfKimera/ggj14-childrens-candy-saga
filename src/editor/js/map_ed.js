var MapEd = {

	levelName: 'scene_house_outside',

	exportURL: 'http://dfk-zoe/maped/export.php',
	importURL: 'http://dfk-zoe/maped/import.php',
	backgroundURL: 'http://dfk-zoe/maped/background.php',
	propListURL: 'http://dfk-zoe/maped/prop_list.php',

	elements: {},
	elementIndex: 0,

	hulls: {},
	props: {},
	pointMarkers: {},
	areaMarkers: {},

	$tools: null,
	$dialogs: null,
	$container: null,
	$level: null,
	$background: null,
	$canvas: null,

	init: function() {
		$tools = $('.tools');
		$dialogs = $('.dialogs');
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
		$dialogs.css({width: screenW, height: screenH - 30});

		$level.css({width: levelW, height: levelH});
		$canvas.css({width: levelW, height: levelH});
		$background.css({width: levelW, height: levelH});

	},

	setupToolButtons: function() {
		$tools.on('click', '.btn-create-hull', MapEd.onCreateHull);
		$tools.on('click', '.btn-create-prop', MapEd.onCreateProp);
		$tools.on('click', '.btn-create-area-marker', MapEd.onCreateAreaMarker);
		$tools.on('click', '.btn-import-json', MapEd.importJSON);
		$tools.on('click', '.btn-export-json', MapEd.exportJSON);

		$dialogs.on('click', '.prop-list .prop', MapEd.onSpawnProp);
	},

	updateElementIndex: function(id) {
		if(id > MapEd.elementIndex) {
			MapEd.elementIndex = id + 2;
		}
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
		var offset = ui.position;

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

	getPropByElement: function(elm) {
		var lookupID = parseInt(elm.attr('rel'));
		return MapEd.props[lookupID];
	},

	updatePropDisplay: function(elm, prop) {
		elm.find('p').text("x=" + prop.x + ", y=" + prop.y + ", name=" + prop.name);
	},

	onCreateProp: function() {
		MapEd.refreshPropList(function(list) {
			$dialogs.show().find('.prop-list').show();
		})
	},

	onSpawnProp: function() {
		var name = $(this).attr('rel');
		MapEd.createProp(100, 100, ++MapEd.elementIndex, name);
		$dialogs.hide().find('.prop-list').hide();
	},

	createProp: function(x, y, id, name) {

		var prop = {
			id: id,
			x: x,
			y: y,
			name: name
		};

		MapEd.elements[prop.id] = $('<div class="prop" id="prop-'+prop.id+'" rel="'+prop.id+'"><img src="props/'+prop.name+'" /><p></p></div>').appendTo($canvas);

		var img = MapEd.elements[prop.id].find('img');
		var propW = img.width();
		var propH = img.height();

		$(MapEd.elements[prop.id])
			.css({left: prop.x, top: prop.y, width: propW, height: propH})
			.draggable({containment: '.canvas', scroll: true, scrollSensitivity: 200, scrollSpeed: 5, drag: MapEd.onPropDrag});

		MapEd.props[prop.id] = prop;

		MapEd.updatePropDisplay(MapEd.elements[prop.id], prop);

	},

	onPropDrag: function(ev, ui) {
		var elm = $(ev.target);
		var offset = ui.position;

		var prop = MapEd.getPropByElement(elm);
		prop.x = offset.left;
		prop.y = offset.top;

		MapEd.updatePropDisplay(elm, prop);

	},

	createPointMarker: function() {

	},

	onCreateAreaMarker: function() {
		MapEd.createAreaMarker(100, 100, 100, 100, prompt('Area marker name:', 'generic'), ++MapEd.elementIndex);
	},

	createAreaMarker: function(x, y, w, h, name, id) {

		var areaMarker = {
			id: id,
			x: x,
			y: y,
			w: w,
			h: h,
			name: name
		};

		MapEd.elements[areaMarker.id] = $('<div class="area-marker" id="area-marker-'+areaMarker.id+'" rel="'+areaMarker.id+'"><p></p></div>').appendTo($canvas);
		$(MapEd.elements[areaMarker.id])
			.css({left: areaMarker.x, top: areaMarker.y, width: areaMarker.w, height: areaMarker.h})
			.draggable({containment: '.canvas', scroll: true, scrollSensitivity: 200, scrollSpeed: 5, drag: MapEd.onAreaMarkerDrag})
			.resizable({containment: '.canvas', resize: MapEd.onAreaMarkerResize});

		MapEd.areaMarkers[areaMarker.id] = areaMarker;

		MapEd.updateAreaMarkerDisplay(MapEd.elements[areaMarker.id], areaMarker);

	},

	getAreaMarkerByElement: function(elm) {
		var lookupID = parseInt(elm.attr('rel'));
		return MapEd.areaMarkers[lookupID];
	},

	updateAreaMarkerDisplay: function(elm, areaMarker) {
		elm.find('p').text("area=" + areaMarker.name + ", x=" + areaMarker.x + ", y=" + areaMarker.y + ", w=" + areaMarker.w + ", h=" + areaMarker.h);
	},

	onAreaMarkerDrag: function(ev, ui) {
		var elm = $(ev.target);
		var offset = ui.position;

		var areaMarker = MapEd.getAreaMarkerByElement(elm);
		areaMarker.x = offset.left;
		areaMarker.y = offset.top;

		MapEd.updateAreaMarkerDisplay(elm, areaMarker);

	},

	onAreaMarkerResize: function(ev, ui) {
		var elm = $(ev.target);
		var position = ui.position;
		var size = ui.size;

		var areaMarker = MapEd.getAreaMarkerByElement(elm);
		areaMarker.x = position.left;
		areaMarker.y = position.top;
		areaMarker.w = size.width;
		areaMarker.h = size.height;

		MapEd.updateAreaMarkerDisplay(elm, areaMarker);
	},

	refreshPropList: function(callback) {

		$.get(
			MapEd.propListURL,
			{},
			function (raw) {
				var list = $.parseJSON(raw);
				var $propList = $dialogs.find('.prop-list').html('');

				for(var i in list) {
					$propList.append('<div class="prop" rel="'+list[i]+'"><img src="props/'+list[i]+'" /><p>'+list[i]+'</p></div>');
				}

				if(callback) {
					callback(list);
				}
			}
		)

	},

	exportJSON: function() {

		MapEd.levelName = $('.fld-level-name').val();

		var jsonObj = {
			hulls: MapEd.hulls,
			props: MapEd.props,
			areaMarkers: MapEd.areaMarkers
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

				$canvas.html('');
				MapEd.hulls = {};
				MapEd.props = {};
				MapEd.areaMarkers = {};

				var obj = $.parseJSON(data);

				if(obj.hulls) {
					for(var i in obj.hulls) {
						var hull = obj.hulls[i];
						if(!hull) { continue; }

						MapEd.updateElementIndex(hull.id);
						MapEd.createHull(hull.x, hull.y, hull.w, hull.h, hull.id);
					}
				}

				if(obj.props) {
					for(var j in obj.props) {
						var prop = obj.props[j];
						if(!prop) { continue; }

						MapEd.updateElementIndex(prop.id);
						MapEd.createProp(prop.x, prop.y, prop.id, prop.name);
					}
				}

				if(obj.areaMarkers) {
					for(var k in obj.areaMarkers) {
						var areaMarker = obj.areaMarkers[k];
						if(!areaMarker) { continue; }

						MapEd.updateElementIndex(areaMarker.id);
						MapEd.createAreaMarker(areaMarker.x, areaMarker.y, areaMarker.w, areaMarker.h, areaMarker.name, areaMarker.id);
					}
				}



			}
		)

	}

};