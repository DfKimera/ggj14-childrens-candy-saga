package engine {

	import org.flixel.FlxG;
	import org.flixel.FlxObject;
	import org.flixel.FlxSprite;

	public class Player extends FlxSprite {

		[Embed(source="../../assets/dev_character.png")]
		public static var DEV_SPRITE:Class;

		public static var speed:Number = 300;
		public static var sanity:int = 100;

		public function Player(startX:int, startY:int) {

			super();

			x = startX;
			y = startY;

			maxVelocity.x = speed;
			maxVelocity.y = Config.GRAVITY;
			acceleration.y = Config.GRAVITY;

			drag.x = maxVelocity.x * 4;

			acceleration.y = Config.GRAVITY;

			solid = true;

			loadGraphic(DEV_SPRITE, false, false, 60, 100);
		}

		override public function update():void {

			this.processPlayerMovement();
			super.update();

		}

		public function processPlayerMovement():void {

			acceleration.x = 0;

			if(FlxG.keys.LEFT) {
				acceleration.x = - maxVelocity.x * 4;
			} else if(FlxG.keys.RIGHT) {
				acceleration.x = maxVelocity.x * 4;
			}

			if((FlxG.keys.SPACE || FlxG.keys.UP) && isTouching(FLOOR)) {
				velocity.y = -maxVelocity.y / 2;
			}

		}

	}
}
