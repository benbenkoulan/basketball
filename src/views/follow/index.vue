<template>
	<div id="container">
		<div id="header">
			<div class="tabs">
				<p class="tab active">关注列表</p>
				<p class="tab">已关注</p>
			</div>
		</div>
		<div id="content">
			<div class="wrapper">
				<follow-bar v-for="league in leagues" :key="league.leagueID" :league="league" @clickFollow="follow" @clickFollowAll="followAll"></follow-bar>
			</div>
		</div>
		<div id="footer">
			<div class="btn">完成</div>
		</div>
	</div>
</template>

<script>
	import followBar from './followBar'

	export default {
		data(){
			return {
			}
		},
		computed: {
			items(){
				var items = [];
				items.length = 20;
				items.fill(20);
				return items;
			},
			leagues(){
				return this.$store.state.league.leagues;
			}
		},
		mounted(){
		},
		components: { followBar },
		fetchData({ store, router }){
			return store.dispatch('FETCH_LEAGUES')
		},
		methods: {
			getFollow(leagueID, teamID){
				var league = this.leagues.find(league => league.leagueID == leagueID);
				if(!teamID) return league;
				var teamIndex = league.teams.findIndex(team => team.teamID == teamID);
				return {league, teamIndex}
			},
			follow(leagueID, teamID){
				var follow = this.getFollow(leagueID, teamID);
				if(follow){
					var league = follow.league;
					var teamIndex = follow.teamIndex;
					if(teamIndex > -1){
						let team = league.teams[teamIndex];
						team.follow = !team.follow;
						league.teams.splice(teamIndex, 1, team);
						league.followAll = league.teams.every(team => team.follow);
						this.$set(this.leagues, leagueID, league);
					}
				}
			},
			followAll(leagueID){
				var league = this.getFollow(leagueID);
				league.followAll = !league.followAll;
				league.teams = league.teams.map(team => {
					team.follow = league.followAll;
					return team;
				})
				this.$set(this.leagues, leagueID, league);
			}
		}
	}
</script>

<style>
	#container { display: flex; flex-direction: column; height: 100%; overflow-y: hidden; justify-content: space-between; }
	#header { width: 100%; height: 1.2rem; flex-shrink: 0; background: #63B8FF; display: flex; justify-content: center; align-items: center; }
	#header .tabs { display: flex; border: 1px solid #fff; border-radius: 10px; overflow: hidden; }
	#header .tab { width: 2rem; height: 0.7rem; line-height: 0.7rem; font-size: 0.3rem; text-align: center; color: #fff;  }
	#header .tab.active { background: #fff; color: #63B8FF; }

	#content { flex: 1; overflow-y: auto; }

	#content .wrapper { height: 100%; }
	
	#footer { padding: 0 0.2rem; width: 100%; height: 1.2rem; flex-shrink: 0; border-top: 1px solid #cccccc; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }
	#footer .btn { background: #63B8FF; text-align: center; height: 1rem; line-height: 1rem; color: #fff; }
</style>