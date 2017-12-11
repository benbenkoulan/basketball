<template>
	<transition name="fade">
		<div class="mask" v-show="show">
			<div class="box"></div>
		</div>
	</transition>
</template>

<script>
	export default {
		data(){
			return {
				show: false
			}
		},
		methods: {
			start(){
				this.show = true;
			},
			stop(){
				this.show = false;
			}
		}
	}
</script>

<style scoped>
	.mask { position: fixed; top: 0; left: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height:  100%; overflow: hidden; z-index: 99; background-color: rgba(0, 0, 0, .0); }
	.box { width: 5rem; height: 4rem; background-image: url(~img/loader.gif); background-repeat: no-repeat; background-position: center center; background-size: 1.2rem; border-radius: 10px; overflow: hidden; text-align: center; font-size: 0.5rem; opacity: .5 }
</style>