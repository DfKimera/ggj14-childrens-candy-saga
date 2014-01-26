package engine {
	import org.flixel.FlxSprite;

	public class Area extends FlxSprite {

		public var id:int;
		public var name:String;
		public var isPlayerInside:Boolean = false;

		public static var SHADOW_COLOR:uint = 0xDD000000;

		public function Area(x:int, y:int, w:int, h:int, name:String, id:int) {
			this.x = x;
			this.y = y;
			this.width = w;
			this.height = h;
			this.name = name;
			this.id = id;

			if(name == "staircase_down" || name == "staircase_up") {
				makeGraphic(w, h, 0x00000000, false);
				return;
			}

			makeGraphic(w, h, SHADOW_COLOR, false)
		}



		public function onPlayerEnter():void {

			if(name == "staircase_down") {
				Player.teleportTo(2415, 1250);
			} else if(name == "staircase_up") {
				Player.teleportTo(2470, 380);
			}

			Utils.fadeOut(this, 1);
			isPlayerInside = true;
		}

		public function onPlayerLeave():void {
			Utils.fadeIn(this, 1);
			isPlayerInside = false;
		}

	}
}
