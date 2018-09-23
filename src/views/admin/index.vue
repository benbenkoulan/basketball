<template>
	<div class="page">
		<div>今日比赛</div>
		<game v-for="game in games" :game="game" :key="game.homeID"></game>
	</div>
</template>

<script>
	import game from './game'
	import { getGames } from 'api'

	export default {
		data(){
			return {
				games: []
			}
		},
		components: { game },
		fetchData(){
			return getGames().then(data => {
				return { games: data }
			});
		}
	}
</script>