<template>
	<div class="view-follow2 wao-row">
		<div class="wao-sider follow-league-list">
			<p v-for="league in leagues" class="follow-league" :class="{active: selectedLeague && selectedLeague.leagueID === league.leagueID}" @click="changeSelectedLeague(league.leagueID)">{{league.leagueName}}({{league.followCount}})</p>
		</div>
		<div class="wao-content wao-row wao-grid wao-gutter__10 follow-team-list">
			<div v-if="selectedLeague" v-for="team in selectedLeague.teams" class="wao-grid__8">
				<p class="follow-team">{{team.teamName}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'

	export default {
		computed: {
			...mapState({
				leagues: state => {
					return (state.league.leagues || []).map((league) => {
						league.followCount = league.teams.filter(team => team.follow).length;
						return league;
					});
				},
				
				selectedLeague: state => state.league.selectedLeague,
			}),
		},

		fetchData({ store }) {
			return store.dispatch('FETCH_LEAGUES');
		},

		methods: {
			...mapMutations({
				changeSelectedLeague: 'CHANGE_SELECTED_LEAGUE',
			}),
		}
	}
</script>

<style scoped>
@import 'layout';
.view-follow2 { height: 100%; overflow: hidden; }
.follow-league-list { width: 6em; overflow-y: auto; border-right: 1px solid #cccccc; text-align: center; }
.follow-league { height: 3em; line-height: 3em; overflow: hidden; border-bottom: 1px solid #cccccc; }
.follow-league.active { background-color: #00BFFF; color: #ffffff; }

.follow-team-list { overflow-y: auto; text-align: center; }
.follow-team { height: 2.4em; line-height: 2.4em; border-radius: 1em; border: 1px solid #cccccc; }
</style>