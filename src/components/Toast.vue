<template>
	<!-- 显示遮罩 -->
	<div class="hint" v-show="ishow">
		<!-- 我的佣金页面的提示信息,当前的路由名称为myCommission 显示下面的提示信息-->
		<div class="hint-box" v-show="showRoute=='earnings'">
			<div class="F3 formula">总佣金=已结佣+待结佣</div>
			<div class="F3 iknow" @click="returnShow">我知道了</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'toast',
		props: ['ishow', 'type'],
		data() {
			return {
				showRoute: '',
				hint: false,
			}
		},
		methods: {
			returnShow() {
				this.$emit('returnshow');
			}
		},
		created() {
			this.showRoute = this.$route.name;
		}
	}
</script>
<style scoped lang="less">
	.hint {
		position: absolute;
		z-index: 9999;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(99, 99, 99, 0.6);
	}
	
	.hint-box {
		width: 72%;
		background: rgba(255, 255, 255, 0.9);
		margin: 4.4rem auto 0 auto;
		border-radius: 10px;
	}
	
	.formula {
		height: 64%;
		line-height: 2.16rem;
		text-align: center;
	}
	
	.iknow {
		border-top: 1px solid #e6e6e6;
		width: 100%;
		height: 36%;
		text-align: center;
		line-height: 1.22666rem;
		color: #ED316B;
	}
	
	.reportputonrecords-title {
		text-align: center;
		margin-bottom: 0.53333rem;
	}
	
	.pdt60 {
		padding-top: 0.8rem;
	}
	
	.mgt365 {
		margin: 3.65rem auto 0 auto;
	}
	
	.mgt240 {
		margin: 3.2rem auto 0 auto;
	}
	
	.reportputonrecords-content {
		width: 5.2rem;
		margin: 0 auto;
		height: 2.26666rem;
		line-height: 1.5;
	}
	
	.mycustomer-content {
		width: 5.2rem;
		margin: 0 auto;
		height: 4rem;
		p {
			margin-bottom: 0.50666rem;
		}
		p:first-child {
			text-indent: 1em;
		}
		p:nth-child(2) {
			margin-bottom: 0.26666rem;
		}
		p:nth-child(3) {
			text-indent: 4em;
		}
	}
</style>