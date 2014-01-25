package engine {
	import org.flixel.FlxSprite;

	public class Level extends FlxSprite {

		[Embed(source="../../assets/dev_scene_bg.png")]
		public static var BACKGROUND:Class;

		[Embed(source="../../assets/dev_scene_bg.json")]
		public static var LEVEL:Class;

		public function Level() {
			loadGraphic(BACKGROUND, false, false);
		}
	}
}
