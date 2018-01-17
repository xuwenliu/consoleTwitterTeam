<template>
	<div class="signDetails">
		<y-header>
			<h1 class="signDetails-userName bg0">{{userName}}</h1>
			<ul class="tab bt1 bg0" >
    			<li v-for="(item,index) in arr"  @click="goTab(index)">
    				<span class="F4 C1" :class="{'active':inow==index}">{{item}}</span>
    			</li>
    		</ul>
		</y-header>
		<div class="content">
            <router-view></router-view>
        </div>
	</div>
</template>

<script>
	import yHeader from '../../../../components/Header'
export default {
	name: '',
	components: {
		yHeader
	},
	data() {
		return {
			inow:0,
			arr:['联系装修团队','申请主材补贴','签约记录'],
			userId:this.$route.query.userId,
			userName:this.$route.query.userName,
		}
	},
	created() {
		this.$router.replace({'name':'fitmentTeam',query:{'userId':this.userId}});
	},
	methods: {
		goTab(index) {
			this.inow = index;
			switch(index){
				case 0:this.$router.replace({'name':"fitmentTeam",query:{'userId':this.userId}});break;
				case 1:this.$router.replace({'name':"materialSubsidy",query:{'userId':this.userId}});break;
				case 2:this.$router.replace({'name':"signRecord",query:{'userId':this.userId}});break;
			}
		}
	},//methods结束
}
</script>

<style scoped lang="less">
.content {
	top: 2.37333rem;
	overflow-y: auto;
}
.tab {
	display: flex;
	li{
		flex: 1;
		line-height: 1.2rem;
		text-align: center;
	}
	.active {
	    color: #ed316b;
	    border-bottom: 2px solid #ed316b;
	    padding-bottom: 0.18666rem;
  
	}
}
.signDetails-userName {
	line-height: 1.17333rem;
	text-align: center;
	font-size: 0.45333rem;
}
</style>