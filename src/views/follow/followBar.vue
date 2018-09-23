<template>
	<div class="follow-bar">
		<div class="posr follow-header" @click="toggleFollowInfo">
			{{league.leagueName}}
			<div class="follow-desc">
				<p>已关注{{followCount}}个</p>
				<p class="arrow-v" :class="{open}"></p>
			</div>
		</div>
		<div class="follow-info" v-show="open">
			<team :league="league" :type="'LEAGUE'"></team>
			<team v-for="team in league.teams" :key="team.teamID" :team="team"></team>
		</div>
	</div>
</template>

<script>
	import team from './team'

	export default {
		data(){
			return {
				open: false
			}
		},

		computed: {
			followCount(){
				return this.league.teams.filter(team => team.follow).length;
			}
		},
		
		props: {
			league: {
				type: Object,
				default(){
					return {
						follow: false,
						teams: []
					}
				}
			}
		},

		methods: {
			toggleFollowInfo(){
				this.open = !this.open;
				this.$emit('clickArrow')
			}
		},
		
		components: { team },
	}
</script>

<style scoped>
	.follow-header { padding: 1em 6em 1em 4em; width: 100%; box-sizing: border-box; background-image: url(~img/basketball.svg); background-size: 2em 2em; background-position: 1em center; background-repeat: no-repeat;  border-bottom: 1px solid #ccc; }
	.follow-desc { position: absolute; top: 0; right: 0; width: 6em; height: 100%; display: flex; align-items: center; justify-content: center; }
	.follow-desc p { font-size: .8rem; color: #999; }

	.arrow-v { margin-left: 0.2em; width: 1em; height: 1em; border-radius: 50%; border: 1px solid #333; box-shadow: 0 0 10px transparent; background-size: 1em; background-position: center bottom; background-repeat: no-repeat; background-image: url(~img/arrow_up.svg); }
	.arrow-v.open { background-image: url(~img/arrow_down.svg)!important; }
</style>