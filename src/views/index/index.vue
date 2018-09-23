<template>
	<div class="view-index">
		<div class="wao-row wao-flex">
			<router-link class="wao-flex__item" to="games">games</router-link>
			<router-link class="wao-flex__item" to="follow">follow</router-link>
			<router-link class="wao-flex__item" to="layout">layout</router-link>
			<router-link class="wao-flex__item" to="admin">admin</router-link>
			<router-link class="wao-flex__item" to="follow2">follow2</router-link>
		</div>
		<div class="wao-row wao-grid">
			<router-link class="wao-grid__6" to="games">games</router-link>
			<router-link class="wao-grid__6" to="follow">follow</router-link>
			<router-link class="wao-grid__6" to="layout">layout</router-link>
			<router-link class="wao-grid__6" to="layout2">layout2</router-link>
			<router-link class="wao-grid__6" to="admin">admin</router-link>
			<router-link class="wao-grid__6" to="follow2">follow2</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		computed: {
		},
		mounted(){
		}
	}
</script>

<style>
@import 'layout';
.view-index {
	height: 100%; text-align: center;
	& .wao-flex__item { background-color: #00BFFF; color: #ffffff; }
	& .wao-grid__6 { background-color: #ff893a; color: #ffffff; }
}
</style>