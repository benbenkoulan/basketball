<template>
	<div id="container">
		<div id="wrapper">
			<div id="scroller" ref="scroller">
				<p v-for="(item, index) in items">{{index}}-----{{index}}----{{index}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	var AlloyTouch;
	if(process.browser){
		AlloyTouch = require('alloytouch')
	}
	import Transform from 'css3transform'

	import Scroll from 'com/scroll'

	export default {
		name: 'index',
		data(){
			return {

			}
		},
		computed: {
			items(){
				var items = [];
				items.length = 200;
				return items.fill(200);
			},
			scroller(){
				return this.$refs.scroller;
			}
		},
		mounted(){
			var scroll = new Scroll('#wrapper', { 
				vertical: true, 
				slide: true, 
				deceleration: 0.008,
				step: 80,
				max: 0,
				min: window.innerHeight - this.items.length * 80
		 });
			/*scroll.on('move', function(postion){
				//console.log(postion);
			})
			.on('moveEnd', function(position){
			});
			Transform(this.scroller);
			var alloyTouch = new AlloyTouch({
				touch: '#wrapper',
				target: this.scroller,
				property: 'translateY',
				step: 80,
				max: 0,
				min: window.innerHeight - this.items.length * 80
			});*/
		}
	}
</script>

<style scoped>
	#container { overflow: hidden; height: 100%; display: flex; flex-direction: column; }
	#wrapper { overflow: hidden; }
	#scroller {
	    -webkit-tap-highlight-color: rgba(0,0,0,0);
	    width: 100%;
	    user-select: none;
	    text-size-adjust: none;
	    transform: translateZ(0);
	    -webkit-touch-callout: none;
	}
	#scroller p { height: 80px; line-height: 80px; border: 1px solid #ff0000; box-sizing: border-box; }
</style>