package engine {
	import flash.events.TimerEvent;
	import flash.utils.Timer;

	import org.flixel.FlxG;
	import org.flixel.FlxSprite;
	import org.flixel.FlxU;

	public class Prop extends FlxSprite {

		public var id:int;
		public var name:String;

		public var insanityDamageTimer:Timer = new Timer(500);

		public var spriteClass:Class;
		public var spriteData:Array;

		[Embed(source="../../assets/props/Abajur.png")]
		public static var PROP_ABAJUR:Class;
		public static var DATA_ABAJUR:Array = [128,384,5];

		[Embed(source="../../assets/props/KitchenSink.png")]
		public static var PROP_KITCHENSINK:Class;
		public static var DATA_KITCHENSINK:Array = [128,225, 6];

		public function Prop(x:int, y:int, name:String, id:int) {
			this.x = x;
			this.y = y;
			this.name = name;
			this.id = id;

			insanityDamageTimer.addEventListener(TimerEvent.TIMER, onInsanityDamage);
			insanityDamageTimer.start();

			setupGraphics();
		}

		public function setupGraphics():void {

			spriteClass = Prop['PROP_'+(name.replace(".png","").toUpperCase())];
			spriteData = Prop['DATA_'+(name.replace(".png","").toUpperCase())];

			if(!spriteClass || !spriteData) {
				trace("Skipping prop load: " + name + " (missing sprite metadata)");
				return;
			}

			loadGraphic(spriteClass, true, false, spriteData[0], spriteData[1]);

			var frames:Array = [];
			for(var i:int = 1; i <= spriteData[3]; i++) {
				frames.push(i);
			}

			addAnimation("idle", frames, 0, true);
			play("idle", true);

		}

		override public function update():void {
			super.update();
			this.handleInsanityTransformation();
		}

		private function onInsanityDamage(ev:TimerEvent):void {
			var dist:Number = FlxU.getDistance(this.getMidpoint(), Player.instance.getMidpoint());
			if(dist > Config.INSANITY_BASE_DIST) { return; }

			var amountInsanity:Number = 1 - (dist / Config.INSANITY_BASE_DIST);

			trace("Apply insanity: ", amountInsanity, "x",Config.INSANITY_DAMAGE_MULTIPLIER," sanity=",Player.sanity);

			Player.applyInsanityDamage(amountInsanity);
		}

		public function handleInsanityTransformation():void {

			if(!spriteData) {
				return;
			}

			var numFrames:int = spriteData[2];
			frame = int( Player.getInsanityRatio() * (numFrames - 1) );

		}

	}
}
