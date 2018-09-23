<template>
	<div class="follow-team" :class="{'follow': type === 'TEAM' ? team.follow : league.follow}" @click="follow">{{type === 'TEAM' ? team.teamName : '全部'}}</div>
</template>

<script>
	import { mapMutations } from 'vuex'

	export default {
		props: {
			type: {
				type: String,
				default(){
					return 'TEAM'
				}
			},	
			team: Object,
			league: Object
		},
		methods: {
			...mapMutations({
				followTeam: 'FOLLOW_TEAM',
				followLeague: 'FOLLOW_LEAGUE',
			}),

			follow(){
				if(this.type === 'TEAM') {
					this.followTeam({ leagueID: this.team.leagueID, teamID: this.team.teamID });
				} else {
					this.followLeague(this.league.leagueID);
				}
			},
		}
	}
</script>

<style scoped>
.follow-team { position: relative; padding: .5em 3em .5em 1em; background-color: #f0f0f0; border-bottom: 2px solid #fff; }
.follow-team.follow:after{
	background-image: url(~img/follow.svg);
}

.follow-team:after{
	content: '';
	position: absolute;
	top: 50%;
	right: 0.6em;
	margin-top: -0.6em;
	display: block;
	width: 1.2em;
	height: 1.2em;
	background-size: 100%;
	background-repeat: no-repeat;
	background-image: url(~img/unfollow.svg);
}
</style>