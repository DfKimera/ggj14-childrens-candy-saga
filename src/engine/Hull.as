package engine {
	import org.flixel.FlxObject;
	import org.flixel.FlxSprite;

	public class Hull extends FlxObject {

		public var id:int;

		[Embed(source="../../assets/debug_pink.png")]
		public static var DEBUG_PINK:Class;

		public function Hull(x:int, y:int, w:int, h:int, id:int) {

			super();

			trace("created hull: ",x,y,w,h,id);

			this.id = id;
			this.x = x;
			this.y = y;
			this.width = w;
			this.height = h;

			solid = true;
			immovable = true;

			if(Config.DEBUG_MODE) {
				//loadGraphic(DEBUG_PINK, false, false, w, h); // need to change to FlxSprite to render this
			}

		}
	}
}
