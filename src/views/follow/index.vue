<template>
	<div class="wao-col view-follow">
		<div class="wao-sider wao-row wao-ja__center follow-header">
			<div class="tabs">
				<p class="tab" :class="{'active': index == 0}" @click="slideTo(0)">关注列表</p>
				<p class="tab" :class="{'active': index == 1}" @click="slideTo(1)">已关注</p>
			</div>
		</div>
		<div id="content" class="wao-content">
			<div id="scroller">
				<div class="wrapper follow-list">
					<div class="scroller" ref="followListScroller">
						<follow-bar v-for="league in leagues" :key="league.leagueID" :league="league" @clickArrow="updateFollowScroll"></follow-bar>
					</div>
				</div>
				<div class="wrapper followed-list">
					<div class="scroller" ref="followedListScroller">
						<team v-for="team in followedTeams" :team="team" :key="team.teamID"></team>
					</div>
				</div>
			</div>
		</div>
		<div class="wao-sider follow-footer">
			<div class="btn">完成</div>
		</div>
	</div>
</template>

<script>
	import team from './team'
	import followBar from './followBar'

	import { mapState, mapGetters } from 'vuex'
	import MobileScroll from 'mobilescroll'

	var hScroll,
		followScroll,
		followedScroll;

	export default {
		data(){
			return {
				index: 0,
				_index: 0,
			}
		},

		computed: {
			...mapState({
				leagues: state => state.league.leagues || [],
			}),

			...mapGetters(['followedTeams']),

			followListScroller(){
				return this.$refs.followListScroller
			},
			
			followedListScroller(){
				return this.$refs.followedListScroller
			},
		},

		mounted(){
			const self = this;
			hScroll = new MobileScroll('#content', { max: 0, noOutOfBounds: true, min: -window.innerWidth, step: window.innerWidth, bounceThreshold: 1 / 3 });
			hScroll.on('start', function(){
				self._index = this.getIndex();
			})
			.on('move', function(){
				const direction = this.distX < 0 ? 1 : -1;
				let index = 0;
				if(Math.abs(this.distX) > window.innerWidth * this.bounceThreshold){
					index = self._index + direction;
				} else {
					index = self._index;
				}
				self.index = index > 1 ? 0 : index < 0 ? 0 : index;
			})
			.on('end', function(){
				self.index = this.getIndex();
			});

			const followMin = this.getScrollerMin(this.followListScroller);
			followScroll = new MobileScroll('.follow-list', { slide: true, vertical: true, max: 0, min: followMin, noOutOfBounds: followMin > 0 });
			const followedMin = this.getScrollerMin(this.followedListScroller);
			followedScroll = new MobileScroll('.followed-list', { slide: true, vertical: true, max: 0, min: followedMin, noOutOfBounds: followedMin > 0 });
		},

		fetchData({ store, router }){
			return store.dispatch('FETCH_LEAGUES');
		},

		methods: {
			slideTo(index){
				if(this.index == index) return;
				this.index = index;
				hScroll.slideTo(index, 500);
			},

			getScrollerMin(scroller) {
				return window.innerHeight - scroller.clientHeight - G.size * 2.4;
			},

			updateFollowScroll(){
				if (followScroll) {
					this.$nextTick(() => {
						const min = this.getScrollerMin(this.followListScroller);
						followScroll.updateOptions({ min, noOutOfBounds: min > 0 });
					});
				}
			},

			updateFollowedScroll(){
				if (followedScroll) {
					this.$nextTick(() => {
						const min = this.getScrollerMin(this.followedListScroller);
						followedScroll.updateOptions({ min, noOutOfBounds: min > 0 });
					});
				}
			}
		},

		components: { team, followBar },
	}
</script>

<style scoped>
@import 'layout';
.view-follow { height: 100%; overflow: hidden; }
.follow-header { width: 100%; height: 4em; background: #63B8FF; }
.follow-header .tabs { display: flex; border: 1px solid #ffffff; border-radius: 2em; box-sizing: border-box; overflow: hidden; }
.follow-header .tab { width: 6em; height: 2em; line-height: 2em; text-align: center; color: #fff;  }
.follow-header .tab.active { background: #fff; color: #63B8FF; }

#scroller { display: flex; height: 100%; will-change: transform; }
#scroller .wrapper { width: 100%; height: 100%; flex-shrink: 0; }
#scroller .wrapper .scroller { will-change: transform; }
.followed-list { padding-bottom: 2px; background-color: #f0f0f0; }

.follow-footer { padding: 0 1em; width: 100%; height: 3em; flex-shrink: 0; border-top: 1px solid #cccccc; box-sizing: border-box; }
.follow-footer .btn { margin-top: .3em; background: #63B8FF; text-align: center; height: 2.4em; line-height: 2.4em; color: #fff; border-radius: 2.4em; }
</style>