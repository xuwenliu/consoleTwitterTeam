<template>
	<div>
		<y-header>
			<ul class="tab bt1 bg0" >
    			<li v-for="(item,index) in signTypeArr"  @click="goTab(index)">
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
	import yHeader from '../../../components/Header'
export default {
	name: 'customer',
	components: {
		yHeader
	},
	data() {
		return {
			inow:0,
			signTypeArr:['未签约客户','已签约客户']
		}
	},
	created() {
		this.$router.replace({'name':'noSignCustomer'});
	},
	methods: {
		goTab(index) {
			this.inow = index;
			switch(index){
				case 0:this.$router.replace({'name':"noSignCustomer"});break;
				case 1:this.$router.replace({'name':"signCustomer"});break;
			}
		}
	},//methods结束
	watch:{
		$route(to,from){
			if(to.name=="noSignCustomer"){
				this.inow = 0;
			}
		}
	}
}
</script>

<style scoped lang="less">
.content {
	top: 1.2rem;
	bottom: 1.30666rem;
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
</style>