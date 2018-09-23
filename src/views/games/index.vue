<template>
	<div class="view-game">
		<div class="wao-row wao-flex">
			<div class="wao-flex__item" :class="{'active': index == 0}" @click="slideTo(0)">进行中</div>
			<div class="wao-flex__item" :class="{'active': index == 1}" @click="slideTo(1)">已完成</div>
		</div>
		<div id="pageWrapper">
			<div id="pageScroller">
				<div id="doingWrapper" class="wrapper game-page">
					<div class="scroller" ref="doingScroller">
						<game v-for="game in games" :key="game.gameID" :game="game"></game>
					</div>
				</div>
				<div id="doneWrapper" class="wrapper game-page">
					<div class="scroller" ref="doneScroller">
						<p v-for="(item, index) in games">{{index}}----{{index}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getGames } from 'api'
	import game from './game'

	import { mapState } from 'vuex'

	import MobileScroll from 'mobilescroll'
	import WSC from 'com/websocket/client'

	var hScroll,
		vScrolls = {}

	export default {
		data(){
			return {
				index: 0,
			}
		},

		computed: {
			...mapState({
				games: state => state.game.games,
			}),
		},

		mounted(){
			const doingScroller = this.$refs.doingScroller;
			const doneScroller = this.$refs.doneScroller;
			vScrolls.doingScroll = new MobileScroll('#doingWrapper', {
				vertical: true,
				slide: true,
				max: 0,
				min: window.innerHeight - doingScroller.clientHeight - G.size,
			});

			vScrolls.doneScroll = new MobileScroll('#doneWrapper', {
				vertical: true,
				slide: true,
				max: 0,
				min: window.innerHeight - doneScroller.clientHeight - G.size,
			});

			hScroll = new MobileScroll('#pageWrapper', {
				max: 0,
				noOutOfBounds: true,
				min: -window.innerWidth,
				step: window.innerWidth,
			});

			const self = this;
			hScroll.on('move', function(){
				let position = this.getPosition();
				let X = Math.abs(position.X);
				self.index = Math.round(X / window.innerWidth);
			});
			// const wsc = new WSC();
		},

		fetchData({ store }) {
			return store.dispatch('FETCH_GAMES');
		},

		methods: {
			slideTo(index){
				if(this.index == index) return;
				this.index = index;
				hScroll.slideTo(index, 500)
			}
		},

		components: { game },
	}
</script>

<style>
@import 'layout';
.view-game {
	& .wao-flex__item { text-align: center; height: 3.6em; line-height: 3.6em; border-bottom: 1px solid #ccc; }
	& .wao-flex__item.active { color: #00BFFF; border-bottom: 4px solid #00BFFF; }

	& #pageWrapper { overflow: hidden; }
	& #pageScroller { display: flex; }
	& .game-page { width: 100%; height: 100%; flex-shrink: 0; text-align: center; box-sizing: border-box; }

	& .wrapper { overflow: hidden; }
	& .scroller { transform: translateZ(0); }
}
</style>