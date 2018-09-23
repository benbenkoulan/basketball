<template>
	<div class="view-flex wao-col">
		<div class="wao-content content">
			<div class="mask"></div>
		</div>
		<div class="wao-sider btn">测试button</div>
	</div>
</template>

<style>
@import 'layout';
.view-flex {
	position: absolute; left: 0; top: 0; right: 0; bottom: 0;	
	& .content { background-color: red; overflow: hidden; z-index: 1; }
	& .mask { position: fixed; left: 0; bottom: 0; width: 100%; height: 400px; background-color: #000000; z-index: 1; }
	& .btn { height: 100px; line-height: 100px; }
}
</style>