<template>
	<div>
		<ToastMsg :ishow="isShow" @returnshow="changeShow"></ToastMsg>
		<div class="content">
		<div class="earnings">
			<div class="money">
				<p class="F3 C1">总佣金(元) 
				<img src="../../assets/img/info_note_ic@3x.png" @click="changeShow"> </p>
				<h1 class="money-total C1 fwb">{{baseData.commissionTotal | currency('',2)}}</h1> 
				<router-link tag="button" :to="{'name':'commissionDetails'}">查看明细</router-link>
			</div>
			<ul class="money-list">
				<router-link tag="li" :to="{'name':'commissionRecord',query:{teamId:baseData.teamId}}">
					<div class="money-list-box clearfix bb1">
						<div class="money-left">
							<img src="../../assets/img/money_done_ic@2x.png">
							<span class="C1">已结佣</span>
						</div>
						<div class="money-right">
							<span class="F2 C1 fwb">{{baseData.settledTotal | currency('',2)}}</span> 
							<img src="../../assets/img/more_ico@2x.png" alt="">
						</div>
					</div>
					
					
				</router-link>
				<li class="bb1">
					<div class="money-list-box clearfix">
						<div class="money-left">
							<img src="../../assets/img/money_wait_pay_ic@2x.png">
							<span class="C1">待结佣</span>
						</div>
						<div class="money-right-dai">
							<div>
								 <span class="F2 C1 fwb">{{baseData.toSettleTotal | currency('',2)}}</span> 
								<p>平台会在每周二结算佣金</p>
							</div>
							
						</div>
					</div>	
				</li>
				<router-link class="bb1" style="margin-top: 0.333333rem;" tag="li" :to="{'name':'ruleDesc'}">
					<div class="money-list-box clearfix">
						<div class="money-left">
							<img style="width: 0.46666rem;height: 0.53333rem;" src="../../assets/img/ht_ruels_info_ic@2x.png">
							<span class="C1">分佣规则说明</span>
						</div>
						<div class="money-right">
							<img src="../../assets/img/more_ico@2x.png">
						</div>
					</div>	
				</router-link>
			</ul>
		</div>
  	</div>
	</div>
  	
</template>
<script>
  /*mint-ui*/
import {MessageBox} from 'mint-ui';
import {Indicator} from 'mint-ui';
import {Toast} from 'mint-ui';
import ToastMsg from '../../components/Toast'
export default{
    name: 'earnings',
    components: {
    	ToastMsg
    },
    data(){
      	return {
       		isShow:false,
	      	baseData:{},
      	}
    },
    created(){
		
		/*模拟数据start*/
		/*localStorage.teamId = 147;
		this.baseData = {
			"teamId":147,
			"commissionTotal":1000,//总佣金
			"settledTotal":600,//已结佣
			"toSettleTotal":400,//待结佣
		}
		/*模拟数据end*/
		this.getBaseData();
    },
    mounted(){

    },
    methods: {
     	changeShow(){
	   		this.isShow=!this.isShow;
	   	},
	   	getBaseData() {
	   		Indicator.open();
	   		/*此接口lf没有发布到swagger*/
	   		let api = window.Host.apiHost+`/twitter/team/commission`;
	   		this.$http.get(api).then((res)=> {
	   			console.log(res)
	   			if(res.data.succ) {
	   				Indicator.close();
	   				this.baseData = res.data.data;
	   			}else {
	   				Indicator.close();
	   				Toast({message: res.data.message});
	   			}
	   		})
	   	},
    },

}

</script>

<style scoped lang="less">
.money{
	width: 100%;
	background-color: #fff;
	margin-bottom: 0.26666rem;
	border-bottom: 1px solid #e6e6e6;
	text-align: center;
	overflow: hidden;
	p{
		margin-top: 0.72rem;
	}
	img{
		width: 0.4rem;
		height: 0.4rem;
		vertical-align: middle;
		margin-left: 0.37333rem;
	}
	button{
		font-size: 0.34666rem;
		width:3.88rem;
		color:rgba(237,49,107,1);
		line-height:0.94666rem;
		border:1px solid #ED316B;
		background:rgba(255,255,255,1);
		border-radius: 0.08rem; 
		margin-bottom: 0.76rem;
	}
}
.money-total{
	font-size:1.0rem;
}
.money-list li{
	padding:0 0.48rem 0 0.61333rem;
	background: #fff;
}
.money-left{
	float: left;
	line-height: 1.65333rem;
	img{
		vertical-align:middle;
		margin-right: 0.58666rem;
		width: 0.52rem;
		height: 0.58666rem;
	}
	span{
		font-size: 0.42666rem;
	}
}
.money-right{
	float: right;
	line-height: 1.65333rem;
	img{
		margin-left: 0.12rem;
		width: 0.18667rem;
		height: 0.34667rem;
	}
	
	
}
.money-right-dai{
	float: right;
	margin-right:0.37333rem;
	text-align: right;
	display: table;height: 1.65333rem;
	div {
		display: table-cell;
		vertical-align: middle;
	}
	p{
		color:rgba(115,115,115,1);
		font-size: 0.29333rem;
	}
}
</style>
