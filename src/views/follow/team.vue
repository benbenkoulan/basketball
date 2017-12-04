<template>
	<div class="follow-team" :class="{'follow': isAll ? league.followAll : team.follow}" @click="follow">{{isAll ? '全部' : team.teamName}}</div>
</template>

<script>
	export default {
		computed: {
			isAll(){
				return this.type === 'ALL' 
			}
		},
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
			follow(){
				if(this.type === 'TEAM') {
					this.$emit('clickFollow', this.team.leagueID, this.team.teamID)
				} else {
					this.$emit('clickFollowAll', this.league.leagueID)
				}
			}
		}
	}
</script>

<style scoped>
	.follow-info .follow-team { position: relative; padding: 0 1.2rem 0 0.4rem; height: 1rem; line-height: 1rem; background-color: #f0f0f0; border-bottom: 1px solid #fff; }
	.follow-info .follow-team.follow:after{
		background-image: url(~img/follow.svg);
	}

	.follow-info .follow-team:after{
		content: '';
		position: absolute;
		top: 0.25rem;
		right: 0.4rem;
		display: block;
		width: 0.5rem;
		height: 0.5rem;
		background-size: 0.5rem;
		background-repeat: no-repeat;
		background-image: url(~img/unfollow.svg);
	}
</style>