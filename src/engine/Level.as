package engine {

	import org.flixel.FlxGroup;
	import org.flixel.FlxSprite;

	public class Level extends FlxSprite {

		[Embed(source="../../assets/dev_scene_bg.png")]
		public static var BACKGROUND:Class;

		[Embed(source="../../assets/dev_scene_bg.json", mimeType='application/octet-stream')]
		public static var LEVEL:Class;

		public var hulls:Array = [];
		public var $hulls:FlxGroup = new FlxGroup();

		public var props:Array = [];
		public var $props:FlxGroup = new FlxGroup();

		public function Level() {
			loadGraphic(BACKGROUND, false, false);
			this.loadJSON();
		}

		public function loadJSON():void {

			var levelJSON:String = new LEVEL();
			var levelData:Object = JSON.parse(levelJSON);

			for(var i:String in levelData.hulls) {
				var hull:Object = levelData.hulls[i];

				if(!hull) { continue; }

				hulls[hull.id] = new Hull(hull.x, hull.y, hull.w, hull.h, hull.id);
				$hulls.add(hulls[hull.id]);
			}

		}
	}
}
