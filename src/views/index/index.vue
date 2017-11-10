<template>
	<div @touchmove.prevent id="container">
		<div id="wrapper" ref="wrapper">
			<div id="scroller">
				<div>
					<img src="https://mdn.mozillademos.org/files/12245/frame_image.svg" alt="link" width="32" height="32" />
					哇哦哇哦测试
				</div>
				<p v-for="(item, index) in items">{{index}}-----{{index}}----{{index}}</p>
			</div>
		</div>
	</div>
</template>

<script>
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
			wrapper(){
				return this.$refs.wrapper;
			}
		},
		mounted(){
			var scroll = new Scroll(this.wrapper, {  vertical: true, noBounce: true, slide: true, deceleration: 0.005 });
			scroll.on('move', function(postion){
				console.log(postion);
			})
			.on('moveEnd', function(position){
				console.log('-------end---------');
				console.log(position);
				console.log('-------end---------');
			})
		}
	}
</script>

<style scoped>
	#container { overflow: hidden; height: 100%; display: flex; flex-direction: column; }
	#wrapper { overflow: hidden; }
	#scroller { overflow-y: auto; }
</style>