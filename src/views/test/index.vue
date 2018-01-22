<template>
	<div>
		这是测试页面
	</div>
</template>

<script>
	import TestClz from './TestClz';

	export default {
		data(){
			return {}
		},
		mounted(){
			var tc = new TestClz('tc1');
			console.log(tc);
			console.log(TestClz.getName());
		}
	}
</script>