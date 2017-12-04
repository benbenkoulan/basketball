<template>
	<div class="follow-bar">
		<div class="posr follow-header" @click="showFollowInfo = !showFollowInfo;">
			{{league.leagueName}}
			<div class="follow-desc">
				<p v-show="followCount">已关注{{followCount}}个</p>
				<p class="arrow-v" :class="infoClass"></p>
			</div>
		</div>
		<div class="follow-info" v-show="showFollowInfo">
			<team :type="'ALL'" :league="league" @clickFollowAll="$emit('clickFollowAll', league.leagueID)"></team>
			<team v-for="team in league.teams" :team="team" :key="team.teamID" :type="'TEAM'" @clickFollow="$emit('clickFollow', league.leagueID, team.teamID)"></team>
		</div>
	</div>
</template>

<script>
	import team from './team'

	export default {
		data(){
			return {
				showFollowInfo: false
			}
		},
		computed: {
			infoClass(){
				return {
					open: this.showFollowInfo,
					close: !this.showFollowInfo
				}
			},
			followCount(){
				return this.league.teams.filter(team => team.follow).length;
			}
		},
		props: {
			league: {
				type: Object,
				default(){
					return {
						followAll: false,
						teams: []
					}
				}
			}
		},
		components: { team }
	}
</script>

<style scoped>
	.follow-header { padding: 0 3.2rem 0 1.2rem; width: 100%; height: 1rem; line-height: 1rem; box-sizing: border-box; background-image: url(~img/basketball.svg); background-size: 0.5rem; background-position: 0.25rem center; background-repeat: no-repeat;  border-bottom: 1px solid #ccc; }
	.follow-desc { position: absolute; top: 0; right: 0.4rem; width: 3rem; height: 100%; display: flex; align-items: center; justify-content: flex-end; }
	.follow-desc p { font-size: 0.3rem; color: #999; }

	.arrow-v { margin-left: 0.4rem; width: 0.4rem; height: 0.4rem; border-radius: 50%; border: 1px solid #333; box-shadow: 0 0 10px transparent; background-size: 0.4rem; background-position: center bottom; background-repeat: no-repeat; }
	.arrow-v.open { background-image: url(~img/arrow_down.svg); }
	.arrow-v.close { background-image: url(~img/arrow_up.svg); }
</style>