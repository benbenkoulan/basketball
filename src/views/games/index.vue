<template>
	<div id="container">
		<div class="tabs">
			<div class="tab" :class="{'active': index == 0}" @click="slideTo(0)">进行中</div>
			<div class="tab" :class="{'active': index == 1}" @click="slideTo(1)">已完成</div>
			<p class="tab-active-line" :style="{ transform: 'translateX(' + x + 'px)' }"></p>
		</div>
		<div id="pageWrapper">
			<div id="pageScroller">
				<div id="doingWrapper" class="wrapper game-page">
					<div class="scroller" ref="doingScroller">
						<p v-for="(item, index) in items">{{index}}-----{{index}}----{{index}}</p>
					</div>
				</div>
				<div id="doneWrapper" class="wrapper game-page">
					<div class="scroller" ref="doneScroller">
						<p v-for="(item, index) in items">{{index}}----{{index}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import tab from './tab'
	import Scroll from 'com/scroll'
	import { requestAnimationFrame, cancelAnimationFrame } from 'utils/raf'

	var hScroll,
		vScrolls = {}

	export default {
		data(){
			return {
				x: 0,
				index: 0
			}
		},
		computed: {
			items(){
				var items = [];
				items.length = 100;
				return items.fill(100);
			},
			doingScroller(){
				return this.$refs.doingScroller;
			},
			doneScroller(){
				return this.$refs.doneScroller;
			}
		},
		components: { tab },
		mounted(){
			vScrolls.doingScroll = new Scroll('#doingWrapper', {
				vertical: true,
				slide: true,
				max: 0,
				min: window.innerHeight - this.doingScroller.clientHeight,
				name: 'doingScroll'
			});

			vScrolls.doneScroll = new Scroll('#doneWrapper', {
				slide: true,
				vertical: true,
				max: 0,
				min: window.innerHeight - this.doneScroller.clientHeight,
				name: 'doneScroll'
			});

			hScroll = new Scroll('#pageWrapper', {
				max: 0,
				noOutOfBounds: true,
				min: -window.innerWidth,
				step: window.innerWidth,
				name: 'hScroll'
			});

			var self = this;
			hScroll.on('move', function(delta){
				self.transitionDuration = 0;
				self.x -= delta / 2;
			})
			.on('moveEnd', function(){
				self.index = this.getIndex();
				self.transformX(self.index * window.innerWidth / 2)
			})
		},
		methods: {
			slideTo(index){
				if(this.index == index) return;
				this.index = index;
				hScroll.slideTo(index, 600)
			},
			transformX(toX){
				var self = this,
					id;
				var delta = toX - self.x;
				if(delta == 0) return;
				var ratio = delta / Math.abs(delta);
				var transform = function(){
					if((ratio > 0 && self.x < toX) || (ratio < 0 && self.x > toX)){
						self.x += (ratio * 10);
					} else {
						self.x = toX;
						cancelAnimationFrame(id);
						return;
					}
					id = requestAnimationFrame(transform);
				}
				transform();
			}
		}
	}
</script>

<style scoped>
	.tabs { display: flex; position: relative; }
	.tab { flex: 1; text-align: center; height: 1.2rem; line-height: 1.2rem; }
	.tab.active { color: #00BFFF; }
	.tab-active-line { position: absolute; left: 0; bottom: 0; width: 50%; height: 5px; background: #00BFFF; content: ""; }

	#pageWrapper { overflow: hidden; }
	#pageScroller { display: flex; }
	.game-page { width: 100%; height: 100%; flex-shrink: 0; text-align: center; }

	.wrapper { overflow: hidden; }
	.scroller { transform: translateZ(0); }

</style>