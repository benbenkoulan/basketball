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
						<follow-bar v-for="league in leagues" :key="league.leagueID" :league="league" @clickFollowTeam="followTeam" @clickFollowLeague="followLeague" @clickArrow="refreshFollowScroll"></follow-bar>
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

	import Scroll from 'com/scroll'

	var hScroll,
		followScroll,
		followedScroll;

	export default {
		data(){
			return {
				index: 0
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
					this.refreshFollowedList();
					this.refreshFollowedScroll();
				} else if(oldIndex == 1 && newIndex == 0){
					this.refreshFollowList();
				}
			}
		},
		mounted(){
			hScroll = new Scroll('#content', { max: 0, noOutOfBounds: true, min: -window.innerWidth, step: window.innerWidth })

			var self = this;
			hScroll.on('move', function(){
				let position = this.getPosition();
				let X = Math.abs(position.X);
				self.index = Math.round(X / window.innerWidth);
			})

			var followMin = window.innerHeight - this.followListScroller.clientHeight - G.size * 2.4;
			followScroll = new Scroll('.follow-list', { slide: true, vertical: true, max: 0, min: followMin, noOutOfBounds: followMin > 0 })

			var followedMin = window.innerHeight - this.followedListScroller.clientHeight - G.size * 2.4;
			followedScroll = new Scroll('.followed-list', { slide: true, vertical: true, max: 0, min: followedMin, noOutOfBounds: followedMin > 0 })
		},
		components: { team, followBar },
		fetchData({ store, router }){
			var fetchLeagues = store.dispatch('FETCH_LEAGUES');
			var fetchTeams = store.dispatch('FETCH_FOLLOW_TEAMS');
			return new Promise(resolve => {
				setTimeout(function(){
					Promise.all([fetchLeagues, fetchTeams]).then(resolve);
				}, 1000)
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
			refreshFollowList(){
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
			refreshFollowedList(){
				this.$store.dispatch('UPDATE_FOLLOW_TEAMS', this.followedTeams);
			},
			refreshFollowScroll(){
				this.$nextTick(() => {
					var min = window.innerHeight - this.followListScroller.clientHeight - G.size * 2.4;
					followScroll && followScroll.updateOptions({ min, noOutOfBounds: min > 0 });
				})
			},
			refreshFollowedScroll(){
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
	#scroller { display: flex; height: 100%; }
	#scroller .wrapper { width: 100%; height: 100%; flex-shrink: 0; }
	.followed-list { padding-bottom: 2px; background-color: #f0f0f0; }
	
	#footer { padding: 0 0.2rem; width: 100%; height: 1.2rem; flex-shrink: 0; border-top: 1px solid #cccccc; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }
	#footer .btn { background: #63B8FF; text-align: center; height: 1rem; line-height: 1rem; color: #fff; border-radius: 6px; }
</style>