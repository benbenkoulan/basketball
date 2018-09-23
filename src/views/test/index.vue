<template>
	<div class="view-test" @touchmove.self="test">
		<div class="mask__box">
			<div class="mask"></div>
			<div class="mask__content">
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
				<p>测试内容</p>
			</div>
		</div>

		<div v-for="i in 5" class="content__box">
			<p>这是测试页面{{count}}</p>
			<p>这是测试页面{{count}}</p>
			<p>这是测试页面{{count}}</p>
			<p>这是测试页面{{count}}</p>
			<p>这是测试页面{{count}}</p>
			<p>这是测试页面{{count}}</p>
			<p>这是测试页面{{count}}</p>
			<p>这是测试页面{{count}}</p>
		</div>
	</div>
</template>

<script>
	import TestClz from './TestClz';

	export default {
		data(){
			return {
				count: 0,
			}
		},
		mounted(){
			var tc = new TestClz('tc1');
			console.log(tc);
			console.log(TestClz.getName());
		},

		methods: {
			test() {
				this.count++;
			}
		}
	}
</script>

<style scoped>
.view-test {
	width: 100%; height: 100%; overflow-y: auto;
	& .mask__box { position: relative; }
	& .mask { position: fixed; left: 0; bottom: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .6); z-index: 10; }
	& .mask__content { position: fixed; left: 0; bottom: 0; width: 100%; max-height: 400px; overflow-y: auto; background-color: #ffffff; z-index: 11; }
	& .content__box { padding: 100px 0; }
}
</style>