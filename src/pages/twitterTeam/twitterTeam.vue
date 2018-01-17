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
      		inow:1,
       		tabArr:[
       			{
       				"title":"客户",
       				"gray":	require("../../assets/img/customer_ic_gray.png")
       			},
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
       			require("../../assets/img/customer_ic_gray.png"),
       			require("../../assets/img/ht_income_ic@2x.png"),
       			require("../../assets/img/ht_group_ic@2x.png")
       		],
       		lightBgImg:[
       			require("../../assets/img/customer_ic.png"),
       			require("../../assets/img/ht_income_light_ic@2x.png"),
       			require("../../assets/img/ht_group_light_ic@2x.png")
       		],
       		icon:'',
       		leaveRouter:""

      	}
    },
    created(){
		this.$router.replace({'name':'earnings'});
		this.tabArr[1].gray=this.lightBgImg[1]
    },
    mounted(){

    },
    methods: {
     	goTab(index) {
     		this.inow = index;
     		switch(index){
     			case 0:
     					this.tabArr[0].gray=this.lightBgImg[0];
     					this.tabArr[1].gray=this.grayBgImg[1];
     					this.tabArr[2].gray=this.grayBgImg[2];
						this.$router.replace({'name':"noSignCustomer"});
     					break;
     			case 1:
		     			this.tabArr[1].gray=this.lightBgImg[1];
		     			
		     			this.tabArr[2].gray=this.grayBgImg[2];
		     			this.tabArr[0].gray=this.grayBgImg[0];
		     			this.$router.replace({'name':"earnings"});
		     			break;
     			case 2:
		     			this.tabArr[2].gray=this.lightBgImg[2];
		     			this.tabArr[1].gray=this.grayBgImg[1];
		     			this.tabArr[0].gray=this.grayBgImg[0];
		     			this.$router.replace({'name':"team"});
		     			break;
     			
     		}
 
     	}
    },

    beforeRouteEnter (to, from, next) {
    	console.log(to);
    	console.log(from)
    	next(vm => {
		   if(from.name=="changePwd"||from.name=="addMember"){
		   		vm.inow=2;
		   		vm.tabArr[2].gray=vm.lightBgImg[2];
     			vm.tabArr[1].gray=vm.grayBgImg[1];
     			vm.tabArr[0].gray=vm.grayBgImg[0];
    			vm.$router.replace({'name':'team'})
    		}

	   		if(from.name=="fitmentTeam" || from.name=="materialSubsidy" || from.name=="signRecord"){
		   		vm.inow=0;
		   		vm.tabArr[0].gray=vm.lightBgImg[0];
				vm.tabArr[1].gray=vm.grayBgImg[1];
				vm.tabArr[2].gray=vm.grayBgImg[2];
				vm.$router.replace({'name':"noSignCustomer"});
		   	}

		})
  	},
  	watch:{
  		$route(to,from){
  			
  			if(to.name=="earnings"){
  				this.inow = 1;
  				this.tabArr[1].gray=this.lightBgImg[1];
  				
     			this.tabArr[0].gray=this.grayBgImg[0];
     			this.tabArr[2].gray=this.grayBgImg[2];
  			}else if(to.name=="team"){
  				this.inow = 2;
  				this.tabArr[2].gray=this.lightBgImg[2];
     			this.tabArr[1].gray=this.grayBgImg[1];
     			this.tabArr[0].gray=this.grayBgImg[0];
  			}else {
  				this.inow = 0;
  				this.tabArr[0].gray=this.lightBgImg[0];
				this.tabArr[1].gray=this.grayBgImg[1];
				this.tabArr[2].gray=this.grayBgImg[2];
  			}
  		}
  	}
	

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
