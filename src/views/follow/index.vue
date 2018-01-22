<template>
	<div id="container">
		<div id="header">
			<div class="tabs">
				<p class="tab" :class="{'active': index == 0}" @click="slideTo(0)">关注列表</p>
				<p class="tab" :class="{'active': index == 1}" @click="slideTo(1)">已关注</p>
			</div>
		</div>
		<div id="content">
			<div id="scroller">
				<div class="wrapper follow-list">
					<div class="scroller" ref="followListScroller">
						<follow-bar v-for="league in leagues" :key="league.leagueID" :league="league" @clickFollowTeam="followTeam" @clickFollowLeague="followLeague" @clickArrow="updateFollowScroll"></follow-bar>
					</div>
				</div>
				<div class="wrapper followed-list">
					<div class="scroller" ref="followedListScroller">
						<team v-for="team in teams" :team="team" :key="team.teamID" @clickFollowTeam="followTeam"></team>
					</div>
				</div>
			</div>
		</div>
		<div id="footer">
			<div class="btn">完成</div>
		</div>
	</div>
</template>

<script>
	import team from './team'
	import followBar from './follow-bar'

	//import MobileScroll from 'mobilescroll'
	import MobileScroll from 'com/scroll'

	var hScroll,
		followScroll,
		followedScroll;

	export default {
		data(){
			return {
				index: 0,
				_index: 0

			}
		},
		computed: {
			teams(){
				return this.$store.state.team.teams
			},
			leagues(){
				return this.$store.state.league.leagues
			},
			followedTeams(){
				return this.$store.getters.followedTeams
			},
			followListScroller(){
				return this.$refs.followListScroller
			},
			followedListScroller(){
				return this.$refs.followedListScroller
			}
		},
		watch: {
			index(newIndex, oldIndex){
				this.oldIndex = oldIndex;
				if(oldIndex == 0 && newIndex == 1){
					this.updateFollowedList();
					this.updateFollowedScroll();
				} else if(oldIndex == 1 && newIndex == 0){
					this.updateFollowList();
				}
			}
		},
		mounted(){
			hScroll = new MobileScroll('#content', { max: 0, noOutOfBounds: true, min: -window.innerWidth, step: window.innerWidth, bounceThreshold: 1 / 3 })

			var self = this;
			hScroll.on('moveStart', function(){
				self._index = this.getIndex();
			})
			.on('move', function(){
				let direction = this.distX < 0 ? 1 : -1;
				if(Math.abs(this.distX) > window.innerWidth * this.bounceThreshold){
					self.index = self._index + direction;
				} else {
					self.index = self._index;
				}
				if(self.index < 0){
					self.index = 0;
				} else if(self.index > 1){
					self.index = 1;
				}
			})
			.on('moveEnd', function(){
				self.index = this.getIndex();
			})

			var followMin = window.innerHeight - this.followListScroller.clientHeight - G.size * 2.4;
			followScroll = new MobileScroll('.follow-list', { slide: true, vertical: true, max: 0, min: followMin, noOutOfBounds: followMin > 0 })

			var followedMin = window.innerHeight - this.followedListScroller.clientHeight - G.size * 2.4;
			followedScroll = new MobileScroll('.followed-list', { slide: true, vertical: true, max: 0, min: followedMin, noOutOfBounds: followedMin > 0 })
		},
		components: { team, followBar },
		fetchData({ store, router }){
			var fetchLeagues = store.dispatch('FETCH_LEAGUES');
			var fetchTeams = store.dispatch('FETCH_FOLLOW_TEAMS');
			return new Promise(resolve => {
				setTimeout(function(){
					Promise.all([fetchLeagues, fetchTeams]).then(resolve);
				}, 0)
			})
		},
		methods: {
			slideTo(index){
				if(this.index == index) return;
				this.index = index;
				hScroll.slideTo(index, 500);
			},
			getLeague(leagueID){
				return this.leagues.find(league => league.leagueID == leagueID);
			},
			followTeam(team){
				team.follow = !team.follow;
				var league = this.getLeague(team.leagueID);
				if(!league.teams.every(team => team.follow)) league.followAll = false;
			},
			followLeague(league){
				league.followAll = !league.followAll;
				league.teams = league.teams.map(team => {
					team.follow = league.followAll;
					return team;
				})
			},
			updateFollowList(){
				var unFollowTeams = this.teams.filter(team => !team.follow);
				unFollowTeams.forEach(unFollowTeam => {
					let league = this.getLeague(unFollowTeam.leagueID);
					let team = league.teams.find(team => team.teamID == unFollowTeam.teamID);
					team.follow = false;
				});
				var leagues = this.leagues.map(league => {
					if(!league.teams.every(team => team.follow)) league.followAll = false;
					return league;
				})
				this.$store.dispatch('UPDATE_LEAGUES', leagues);
			},
			updateFollowedList(){
				this.$store.dispatch('UPDATE_FOLLOW_TEAMS', this.followedTeams);
			},
			updateFollowScroll(){
				this.$nextTick(() => {
					var min = window.innerHeight - this.followListScroller.clientHeight - G.size * 2.4;
					followScroll && followScroll.updateOptions({ min, noOutOfBounds: min > 0 });
				})
			},
			updateFollowedScroll(){
				this.$nextTick(() => {
					var min = window.innerHeight - this.followedListScroller.clientHeight - G.size * 2.4;
					followedScroll && followedScroll.updateOptions({ min, noOutOfBounds: min > 0 });
				})
			}
		}
	}
</script>

<style scoped>
	#container { display: flex; flex-direction: column; height: 100%; overflow-y: hidden; justify-content: space-between; }
	#header { width: 100%; height: 1.2rem; flex-shrink: 0; background: #63B8FF; display: flex; justify-content: center; align-items: center; }
	#header .tabs { display: flex; border: 1px solid #fff; border-radius: 10px; box-sizing: border-box; overflow: hidden; }
	#header .tab { width: 2rem; height: 0.7rem; line-height: 0.7rem; font-size: 0.3rem; text-align: center; color: #fff;  }
	#header .tab.active { background: #fff; color: #63B8FF; }

	#content { flex: 1; overflow-y: auto; }
	#scroller { display: flex; height: 100%; will-change: transform; }
	#scroller .wrapper { width: 100%; height: 100%; flex-shrink: 0; }
	#scroller .wrapper .scroller { will-change: transform; }
	.followed-list { padding-bottom: 2px; background-color: #f0f0f0; }
	
	#footer { padding: 0 0.2rem; width: 100%; height: 1.2rem; flex-shrink: 0; border-top: 1px solid #cccccc; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }
	#footer .btn { background: #63B8FF; text-align: center; height: 1rem; line-height: 1rem; color: #fff; border-radius: 6px; }
</style>