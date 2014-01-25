package scenes {
	import engine.Level;
	import engine.Player;

	import org.flixel.FlxG;
	import org.flixel.FlxState;

	public class GameScene extends FlxState {

		public var player:Player;
		public var level:Level;

		override public function create():void {

			FlxG.bgColor = Config.BACKGROUND_COLOR;

			player = new Player(100, 475);
			level = new Level();

			add(level);
			add(level.$hulls);
			add(level.$props);
			add(player);

			FlxG.camera.follow(player);

			FlxG.worldBounds.make(0, 0, 3000, 3000);

		}

		override public function update():void {

			super.update();

			FlxG.collide(player, level.$hulls);

		}

	}
}
