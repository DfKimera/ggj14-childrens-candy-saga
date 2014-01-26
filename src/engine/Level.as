package engine {

	import org.flixel.FlxG;
	import org.flixel.FlxGroup;
	import org.flixel.FlxSprite;
	import org.flixel.FlxU;

	public class Level extends FlxSprite {

		[Embed(source="../../assets/scene_house_outside.png")]
		public static var BACKGROUND:Class;

		[Embed(source="../../assets/scene_house_outside.json", mimeType='application/octet-stream')]
		public static var LEVEL:Class;

		public var hulls:Array = [];
		public var $hulls:FlxGroup = new FlxGroup();

		public var props:Array = [];
		public var $props:FlxGroup = new FlxGroup();

		public var areas:Array = [];
		public var $areas:FlxGroup = new FlxGroup();

		public function Level() {
			loadGraphic(BACKGROUND, false, false);

			this.loadJSON();
		}

		override public function update():void {
			checkPlayerCurrentArea();
		}

		public function checkPlayerCurrentArea():void {
			FlxG.overlap(Player.instance, $areas, onPlayerEnterArea);
		}

		public function onPlayerEnterArea(player:Player, area:Area):void {
			for each(var a:Area in areas) {
				if(a.isPlayerInside && a.id != area.id) {
					a.onPlayerLeave();
				}
			}

			area.onPlayerEnter();
		}

		public function loadJSON():void {

			var levelJSON:String = new LEVEL();
			var levelData:Object = JSON.parse(levelJSON);

			if(levelData.hulls) {
				for(var i:String in levelData.hulls) {
					var hull:Object = levelData.hulls[i];

					if(!hull) { continue; }

					hulls[hull.id] = new Hull(hull.x, hull.y, hull.w, hull.h, hull.id);
					$hulls.add(hulls[hull.id]);
				}
			} else {
				trace("Missing level data: hulls");
			}

			if(levelData.props) {
				for(var j:String in levelData.props) {
					var prop:Object = levelData.props[j];

					if(!prop) { continue; }

					props[prop.id] = new Prop(prop.x, prop.y, prop.name, prop.id);
					$props.add(props[prop.id]);
				}
			} else {
				trace("Missing level data: props");
			}

			if(levelData.areaMarkers) {
				for(var k:String in levelData.areaMarkers) {
					var areaMarker:Object = levelData.areaMarkers[k];

					if(!areaMarker) { continue; }

					areas[areaMarker.id] = new Area(areaMarker.x, areaMarker.y, areaMarker.w, areaMarker.h, areaMarker.name, areaMarker.id);
					$areas.add(areas[areaMarker.id]);
				}
			} else {
				trace("Missing level data: area markers");
			}


		}
	}
}
