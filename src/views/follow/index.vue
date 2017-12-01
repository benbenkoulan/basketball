<template>
	<div id="container">
		<div id="header">
			<div class="tabs">
				<p class="tab active">关注列表</p>
				<p class="tab">已关注</p>
			</div>
		</div>
		<div id="content">
			<div class="wrapper">
				<follow-bar v-for="item in items"></follow-bar>
			</div>
		</div>
		<div id="footer">
			<div class="btn">完成</div>
		</div>
	</div>
</template>

<script>
	import followBar from './followBar'

	export default {
		computed: {
			items(){
				var items = [];
				items.length = 20;
				items.fill(20);
				return items;
			}
		},
		components: { followBar }
	}
</script>

<style>
	#container { display: flex; flex-direction: column; height: 100%; overflow-y: hidden; justify-content: space-between; }
	#header { width: 100%; height: 1.2rem; flex-shrink: 0; background: #63B8FF; display: flex; justify-content: center; align-items: center; }
	#header .tabs { display: flex; border: 1px solid #fff; border-radius: 10px; overflow: hidden; }
	#header .tab { width: 2rem; height: 0.7rem; line-height: 0.7rem; font-size: 0.3rem; text-align: center; color: #fff;  }
	#header .tab.active { background: #fff; color: #63B8FF; }

	#content { flex: 1; overflow-y: auto; }
	
	#footer { padding: 0 0.2rem; width: 100%; height: 1.2rem; flex-shrink: 0; border-top: 1px solid #cccccc; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }
	#footer .btn { background: #63B8FF; text-align: center; height: 1rem; line-height: 1rem; color: #fff; }
</style>