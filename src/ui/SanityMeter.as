package ui {
	import engine.Player;

	import org.flixel.FlxSprite;

	public class SanityMeter extends FlxSprite {

		[Embed(source="../../assets/candymeter.png")]
		public static var SPRITE:Class;

		public function SanityMeter() {

			this.scrollFactor.x = 0;
			this.scrollFactor.y = 0;

			loadGraphic(SPRITE, false, false, 152, 296);
			addAnimation("idle", [1,2,3,4,5,6,7,8,9,10,11], 0, true);
			play("idle");

		}

		override public function update():void {
			frame = int(Player.getInsanityRatio() * 11);
		}
	}
}
