<template>
	<div id="container">
		<div class="box" ref="box">
			<div class="main-top" ref="top"></div>
			<div class="nav"></div>
			<div class="main">
				<ul class="categories" @scroll.stop>
					<li v-for="category in categories" class="category"></li>
				</ul>
				<section @scroll="scrollMenu">
					<div v-for="(menu, index) in menus" class="menu">{{index}}</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
	function now(){
		return Date.now || function() {
			return new Date().getTime();
		}
	}

	function debounce(func, wait, immediate) {
		var timeout, args, context, timestamp, result;

		var later = function() {
			var last = now() - timestamp;

			if (last < wait && last >= 0) {
				timeout = setTimeout(later, wait - last);
				} else {
				timeout = null;
				if (!immediate) {
				  result = func.apply(context, args);
				  if (!timeout) context = args = null;
				}
			}
		}

		return function() {
			context = this;
			args = arguments;
			timestamp = now();
			var callNow = immediate && !timeout;
			if (!timeout) timeout = setTimeout(later, wait);
			if (callNow) {
			result = func.apply(context, args);
			context = args = null;
			}
			return result;
		}
	}

	function _scrollMenu(e){
		let target = e.target;
		let scrollTop = target.scrollTop;
		let boxScrollTop = this.$refs.box.scrollTop;
		if(boxScrollTop < this.topHeight || scrollTop < this.topHeight) {
			boxScrollTop += scrollTop - this._scrollTop;
			if(boxScrollTop > this.topHeight) boxScrollTop = this.topHeight;
			this.$refs.box.scrollTop = boxScrollTop;
		}
		this._scrollTop = scrollTop;
	}

	var scrollMenu = debounce(_scrollMenu, 30);

	export default {
		data(){
			return {
				topHeight: 0,
				_scrollTop: 0
			}
		},
		computed: {
			menus(){
				let arr = [];
				arr.length = 100;
				return arr;
			},
			categories(){
				let arr = [];
				arr.length = 20;
				return arr;
			}
		},
		mounted(){
			this.topHeight = this.$refs.top.offsetHeight;
		},
		methods: {
			scrollMenu,
			scrollTop(){
				console.log('--------------');
			},
			scrollBox(e){
				//console.log(e);
			}
		}
	}
</script>

<style scoped>
	#container { width: 100%; }
	.box { height: 100vh; overflow-y: auto; }
	.main-top { width: 100%; height: 4rem; background-color: #ff0000; }
	.nav { width: 100%; height: 1rem; background-color: #ffff00; }

	.main { display: flex; height: 100%; overflow-y: auto; }
	.main .categories { width: 2rem; height: 100%; overflow-y: auto; }
	.main .category { margin-bottom: 1px; width: 100%; height: 1rem; background-color: #333333; }
	.main section { flex: 1; height: 100%; overflow-y: auto; }
	.main .menu { margin: 20px; width: 3rem; height: 5rem; background-color: #000; color: #fff; }
</style>