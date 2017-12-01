<template>
	<div class="follow-bar">
		<div class="posr follow-header">
			<div class="follow-desc">
				<p>已关注55个</p>
				<p class="arrow-v" :class="infoClass" @click="toggoleFollowInfo"></p>
			</div>
		</div>
		<div class="follow-info" v-show="showFollowInfo">
			<div class="follow-team follow">全部</div>
			<div class="follow-team follow" @click="follow">火箭</div>
			<div class="follow-team unfollow">湖人</div>
		</div>
	</div>
</template>

<script>
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
			}
		},
		methods: {
			toggoleFollowInfo(){
				this.showFollowInfo = !this.showFollowInfo;
			},
			follow(teamID){

			}
		}
	}
</script>

<style scoped>
	.follow-header { padding: 0 3.6rem 0 1.2rem; width: 100%; height: 1rem; box-sizing: border-box; border-bottom: 1px solid #ccc; }
	.follow-desc { position: absolute; top: 0; right: 0.4rem; width: 3rem; height: 100%; display: flex; align-items: center; justify-content: space-between; }
	.follow-desc p { font-size: 0.3rem; color: #999; }

	.arrow-v { width: 0.4rem; height: 0.4rem; border-radius: 50%; border: 1px solid #333; box-shadow: 0 0 10px transparent; background-size: 0.4rem; background-position: center bottom; background-repeat: no-repeat; }
	.arrow-v.open { background-image: url(~img/arrow_down.svg); }
	.arrow-v.close { background-image: url(~img/arrow_up.svg); }

	.follow-info .follow-team { position: relative; padding: 0 0.5rem; height: 1rem; line-height: 1rem; border-bottom: 1px solid #fff; background: #f0f0f5; }
	.follow-info .follow-team.follow:after{
		background-image: url(~img/follow.svg);
	}
	.follow-info .follow-team.unfollow:after{
		background-image: url(~img/unfollow.svg);
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
	}
</style>