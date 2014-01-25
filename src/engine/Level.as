package engine {
	import org.flixel.FlxSprite;

	public class Level extends FlxSprite {

		[Embed(source="../../assets/dev_scene_bg.png")]
		public static var BACKGROUND:Class;

		[Embed(source="../../assets/dev_scene_collision.png")]
		public static var COLLISION_MASK:Class;

		public function Level() {
			loadGraphic(BACKGROUND, false, false);
		}
	}
}
