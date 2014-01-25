package {

	import flash.system.Security;

	import org.flixel.FlxG;
	import org.flixel.FlxGame;

	import scenes.GameScene;

	public class Game extends FlxGame {

		public static var instance:Game;

		public function Game() {

			Security.allowDomain("*");

			Game.instance = this;
			super(800, 600, GameScene, 1, 60, 30, false);

			if(Config.DEBUG_MODE) {
				forceDebugger = true;
				FlxG.visualDebug = true;
			}

		}

	}
}
