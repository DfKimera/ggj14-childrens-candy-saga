package engine {
	import org.flixel.FlxG;

	public class SFX {


		public static function play(name:String):void {
			var sound:Class = SFX["SFX_"+name.toUpperCase()];
			trace("SFX: ", sound);
			FlxG.play( sound, 0.5 );
		}

	}
}
