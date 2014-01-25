package engine {
	import org.flixel.FlxSprite;

	public class Player extends FlxSprite {

		[Embed(source="../../assets/dev_character.png")]
		public static var DEV_SPRITE:Class;

		public function Player() {
			loadGraphic(DEV_SPRITE, false, false, 60, 100);
		}

	}
}
