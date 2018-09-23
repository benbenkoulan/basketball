<template>
	<div class="com-games-game wao-row wao-ja__center">
		<div class="wao-sider game-team">{{game.home}}</div>
		<div class="wao-content wao-col wao-ja__center game-info">
			<p>{{game.gameType}}</p>
			<div class="wao-row">
				<p>{{game.homeScore}}</p>
				<p>-</p>
				<p>{{game.guestScore}}</p>
			</div>
		</div>
		<div class="wao-sider game-team">{{game.guest}}</div>
	</div>
</template>

<script>
	export default {
		props: {
			game: {
				type: Object,
				default: {}
			}
		}
	}
</script>

<style>
@import 'layout';
.com-games-game {
	border-bottom: 1px solid #cccccc;
	& .game-team { width: 4em; text-align: center; }
	& .game-info { padding: .5em; }
}
</style>