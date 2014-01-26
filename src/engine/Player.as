package engine {

	import org.flixel.FlxG;
	import org.flixel.FlxObject;
	import org.flixel.FlxSprite;

	public class Player extends FlxSprite {

		[Embed(source="../../assets/dev_character.png")]
		public static var DEV_SPRITE:Class;

		public static var instance:Player;
		public static var speed:Number = 400;
		public static var sanity:int = 100;
		public static var maxSanity:int = 100;

		public var cameraAnchor:FlxObject = new FlxObject(0,0,0,0);

		public function Player(startX:int, startY:int) {

			Player.instance = this;

			super();

			x = startX;
			y = startY;

			maxVelocity.x = speed;
			maxVelocity.y = Config.GRAVITY;
			acceleration.y = Config.GRAVITY;

			drag.x = maxVelocity.x * 4;

			acceleration.y = Config.GRAVITY;

			solid = true;

			loadGraphic(DEV_SPRITE, false, false, 128, 256);
		}

		override public function update():void {

			cameraAnchor.x = this.x;
			cameraAnchor.y = this.y - Config.CAMERA_Y_MARGIN;

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

			//if(Config.DEBUG_MODE) {
				if(FlxG.keys.UP) {
					acceleration.y = - maxVelocity.x * 4;
				} else if(FlxG.keys.DOWN) {
					acceleration.y = maxVelocity.x * 4;
				}
			//}

		}

		public static function applyInsanityDamage(amount:Number):void {
			Player.sanity -= Config.INSANITY_DAMAGE_MULTIPLIER * amount;
			if(Player.sanity < 0) {
				Player.sanity = 0;
			}
		}

		public static function getInsanityRatio():Number {
			return 1 - (Player.sanity / Player.maxSanity);
		}

		public static function teleportTo(x:int, y:int):void {
			Player.instance.x = x;
			Player.instance.y = y;
		}

	}
}
