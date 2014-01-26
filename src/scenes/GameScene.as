package scenes {
	import engine.Level;
	import engine.Player;

	import org.flixel.FlxCamera;

	import org.flixel.FlxG;
	import org.flixel.FlxGroup;
	import org.flixel.FlxState;

	import ui.SanityMeter;

	public class GameScene extends FlxState {

		public var player:Player;
		public var level:Level;

		public var $ui:FlxGroup = new FlxGroup();

		override public function create():void {

			FlxG.bgColor = Config.BACKGROUND_COLOR;

			player = new Player(400, 1275);
			level = new Level();

			$ui.add(new SanityMeter());

			add(level);
			add(level.$hulls);
			add(level.$props);
			add(player);
			add(level.$areas);
			add($ui);

			FlxG.camera.follow(player.cameraAnchor, FlxCamera.STYLE_PLATFORMER);

			FlxG.worldBounds.make(0, 0, 3000, 3000);

		}

		override public function update():void {

			super.update();

			FlxG.collide(player, level.$hulls);

		}

	}
}
