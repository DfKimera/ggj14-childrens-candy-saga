package {

	import flash.display.Sprite;

	[SWF(backgroundColor="#000000", frameRate="30", width = "1024", height = "768")]
	[Frame(factoryClass="Preloader")]
	public class Bootstrap extends Sprite {

		public static var game:Game;
		public static var instance:Bootstrap;

	    public function Bootstrap() {

		    Bootstrap.instance = this;
			Bootstrap.game = new Game();
		    addChild(Bootstrap.game);

	    }
	}
}
