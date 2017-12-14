<template>
	<div class="footer">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name: 'footer'
	}
</script>
<style scoped>
	.footer {
		width: 100%;
		height: 1.30666rem;
		background-color: #fff;
		font-size: 0.293333rem;
		color: #737373;
		text-align: center;
		position: fixed;
		bottom: 0;
		z-index: 999;
	}
</style>
