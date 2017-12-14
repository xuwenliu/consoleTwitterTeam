<template>
  	<div>
    	<title>推客团队管理后台</title>
    	<y-footer>
    		<ul class="tab bt1" >
    			<li v-for="(item,index) in tabArr" :class="{'active':inow===index}" @click="goTab(index)">
    				<img :src="item.gray" alt="" />
    				<p>{{item.title}}</p></li>
    		</ul>
    	</y-footer>
		<router-view></router-view>
  	</div>
</template>
<script>
  /*mint-ui*/
import {MessageBox} from 'mint-ui';
import {Indicator} from 'mint-ui';
import {Toast} from 'mint-ui';
import yFooter from '../../components/Footer'
export default{
	
    name: 'twitterTeam',
    components: {
    	yFooter
    },
    data(){
      	return {
      		inow:0,
       		tabArr:[
       			{
       				"title":"收益",
       				"gray":	require("../../assets/img/ht_income_ic@2x.png")
       			},
	       		{
	       			"title":"团队",
	       			"gray":require("../../assets/img/ht_group_ic@2x.png")
	       		}
       		],
       		grayBgImg:[
       			require("../../assets/img/ht_income_ic@2x.png"),
       			require("../../assets/img/ht_group_ic@2x.png")
       		],
       		lightBgImg:[
       			require("../../assets/img/ht_income_light_ic@2x.png"),
       			require("../../assets/img/ht_group_light_ic@2x.png")
       		],
       		icon:'',
       		

      	}
    },
    created(){
		this.$router.replace({'name':'earnings'});
		this.tabArr[0].gray=this.lightBgImg[0]
    },
    mounted(){

    },
    methods: {
     	goTab(index) {
     		this.inow = index;
     		if(index===0){
     			this.tabArr[0].gray=this.lightBgImg[0];
     			this.tabArr[1].gray=this.grayBgImg[1];
     			this.$router.replace({'name':"earnings"});
     		}else {
     			this.tabArr[1].gray=this.lightBgImg[1];
     			this.tabArr[0].gray=this.grayBgImg[0];
     			this.$router.replace({'name':"team"});
     		}
     	}
    },
    beforeRouteEnter (to, from, next) {
    	next(vm => {
		   if(from.name=="changePwd"||from.name=="addMember"){
		   		vm.inow=1;
		   		vm.tabArr[1].gray=vm.lightBgImg[1];
     			vm.tabArr[0].gray=vm.grayBgImg[0];
    			vm.$router.replace({'name':'team'})
    		}
		})
  	},
	

}

</script>

<style scoped lang="less">
.tab {
	display: flex;
	li{
		flex: 1;
		height: 1.306666rem;
		padding-top: 0.253333rem;
		img{
			width: 0.6rem;
			height: 0.533333rem;
			vertical-align: middle;
		}
	}
	li.active {
		color: #ED316B;
	}
}
</style>
