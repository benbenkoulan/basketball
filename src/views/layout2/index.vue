<template>
	<div class="view-layout2 view-layout2-wrapper" :class="{ 'with-bottom': showBottom }" ref="view">
		<div class="view-layout2-scroller">
			<div class="top-container" ref="top"></div>
			<div class="category-group-list-wrapper">
				<div class="wao-row wao-flex category-group-list-scroller">
					<div v-for="i in 10" class="category-group">分组{{i}}</div>
				</div>
			</div>
			<div class="wao-row main-container" ref="main">
				<div class="wao-sider category-list-wrapper">
					<div class="category-list-scroller">
						<p v-for="i in 14" class="category">分类{{i}}</p>
					</div>
				</div>
				<div class="wao-content product-list-wrapper">
					<div class="product-list-scroller">
						<div v-for="i in 8" class="product-list-box">
							<div v-for="j in 4" class="product">商品{{i}}---{{j}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="showBottom" class="bottom-container" @click="clearBottom"></div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'

	export default {
		data() {
			return {
				showBottom: true,

				viewScroll: null,
				categoryScroll: null,
				productScroll: null,
			}
		},

		mounted() {
			const height = document.documentElement.getBoundingClientRect().height;
			this.$refs.view.style.height = `${height - 50}px`;
			this.$refs.main.style.height = `${height - 50 - 50}px`;
			this.viewScroll = new BScroll('.view-layout2-wrapper', { probeType: 3, bounce: { top: false, bottom: false } , eventPassthrough: 'horizontal' });
			const productScroll = new BScroll('.product-list-wrapper', { probeType: 3 });
			productScroll.on('scroll', ({ x, y }) => {
				if (y < this.viewScroll.maxScrollY && this.viewScroll.enabled) this.viewScroll.disable()
				else if (y >= this.viewScroll.maxScrollY && !this.viewScroll.enabled) this.viewScroll.enable();
			});
			this.productScroll = productScroll;
			this.categoryScroll = new BScroll('.category-list-wrapper', { probeType: 3, bounce: { top: false, bottom: false }, stopPropagation: true });
		},

		methods: {
			clearBottom() {
				this.showBottom = false;
				const height = document.documentElement.getBoundingClientRect().height;
				this.$refs.view.style.height = `${height}px`;
				this.$refs.main.style.height = `${height - 50}px`;
				this.viewScroll.refresh();
				this.productScroll.refresh();
			}
		}
	}
</script>

<style>
@import 'layout';
.view-layout2 {
	&.with-bottom { position: relative; margin-bottom: 50px; }
	& .top-container { height: 160px; background-color: red; }
	& .category-group-list-wrapper {
		height: 50px; overflow: hidden; background-color: brown;
		& .category-group-list-scroller { height: 100%; white-space: nowrap; overflow-y: auto; }
		& .category-group { padding: 0 10px; line-height: 50px; color: #ffffff; }
	}
	& .main-container { width: 100%; }
	& .category-list-wrapper {
		width: 100px; height: 100%; background-color: black; overflow: hidden;
		& .category { line-height: 50px; text-align: center; border-bottom: 1px solid #ffffff; color: #ffffff; }
	}
	& .product-list-wrapper { height: 100%; overflow: hidden; }
	& .product-list-box {
		background-color: blue;
		& .product { line-height: 100px; text-align: center; border-bottom: 1px solid #ffffff; color: #ffffff; }
	}
	& .bottom-container { position: fixed; bottom: 0; left: 0; width: 100%; height: 50px; background-color: green; }
}
</style>