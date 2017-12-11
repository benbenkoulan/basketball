<template>
	<div id="container">
		<router-link :to="{name: 'games'}">games</router-link>
		<br>
		<router-link :to="{name: 'follow'}">follow</router-link>
		<br>
		<router-link :to="{name: 'haha'}">haha</router-link>
		<div id="wrapper">
			<div id="scroller" ref="scroller">
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
				return items;
			},
			scroller(){
				return this.$refs.scroller;
			}
		},
		mounted(){
		}
	}
</script>

<style scoped>
	#container { overflow: hidden; height: 100%; }
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