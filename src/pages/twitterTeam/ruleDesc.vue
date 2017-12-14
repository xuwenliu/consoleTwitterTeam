<template>
  	<div class="content">
    	<title>规则说明</title>
		<div class="ruleDesc">
			<div class="ruleDesc-table">
				<h1>佣金分配比例</h1>
				<dl>
					<dt>
						<ul>
							<li><div class="xieLine"></div></li>
							<li>成员</li>
							<li>团队</li>
						</ul>
					</dt>
					<dd v-show="result.designRatioDto && !(result.designRatioDto.memberRatio==0 && result.designRatioDto.teamRatio==0)">
						<ul>
							<li>设计</li>
							<li>{{result.designRatioDto.memberRatio | currency("",1)}}%</li>
							<li>{{result.designRatioDto.teamRatio | currency("",1)}}%</li>
						</ul>
					</dd>
					<dd v-show="result.buildRatioDto && !(result.buildRatioDto.memberRatio==0 && result.buildRatioDto.teamRatio==0)">
						<ul>
							<li>施工</li>
							<li>{{result.buildRatioDto.memberRatio | currency("",1)}}%</li>
							<li>{{result.buildRatioDto.teamRatio | currency("",1)}}%</li>
						</ul>
					</dd>
				</dl>
			</div>
			<div class="ruleDesc-desc">
				<span>说&nbsp;明</span>
				<h2>团队成员的报备客户在平台成交，即可计算佣金。</h2>
				<h1>佣金的计算规则</h1>
				<p>成员所得佣金 = 签约金额 × 成员的佣金比例</p>
				<p>团队所得佣金 = 签约金额 × 团队的佣金比例</p>
			</div>
		</div>
  	</div>
</template>
<script>
  /*mint-ui*/
import {MessageBox} from 'mint-ui';
import {Indicator} from 'mint-ui';
import {Toast} from 'mint-ui';
export default{
    name: 'ruleDesc',
    components: {
    	
    },
    data(){
      	return {
       		result:{
       			"buildRatioDto":{
					"memberRatio":"",
					"teamRatio":""
				},
				"designRatioDto":{
					"memberRatio":"",
					"teamRatio":""
				}
       		},

      	}
    },
    created(){
    	//http://192.168.28.78:8182/{version}/twitter/team/ratioInfo
		let api = window.Host.apiHost+`/twitter/team/ratioInfo`;
		Indicator.open();
		this.$http.get(api).then((res)=>{
			console.log(res)
	  		if(res.data.succ){
				Indicator.close();
	  			if(res.data.data){
	  				this.result = res.data.data;
	  			}
	  		}else{
	  			Indicator.close();
				Toast({message: res.data.message});
			}
	  	})
    },
    mounted(){

    },
    methods: {
     
    },

}

</script>

<style scoped lang="less">
.content {
	background-color: #fff;
}
.xieLine {
	width: 105%;
	height: 1px;
	transform: rotate(17deg);
	background: #fff;
	transform-origin: left;
}
.ruleDesc{
	padding: 0 0.786666rem 0 0.906666rem;
	.ruleDesc-table{
		h1 {
			color: #ED316B;
			font-size: 0.453333rem;
			line-height: 1.173333rem;
			text-align:center;
		}
		dl {
			dt,dd{
				ul{
					font-size: 0.373333rem;
					display: flex;
					background-color: #fff;
					color: #282828;
					li{
						flex: 1;
						text-align: center;
						height: 0.853333rem;
						line-height: 0.853333rem;
						border-right: 1px solid #a8a8a8;
						border-bottom: 1px solid #A8A8A8;
					}
				}
			}
			dt{
				ul{
					color: #fff;
					background-color: #ED316B;
					li{
						border-right: 1px solid #fff;
						border-bottom:none;
					}
					li:first-child{
						border-left: 1px solid #ED316B;
					}
					li:last-child{
						border-right: 1px solid #ED316B;
					}
				}
			}
			dd ul li:first-child{
				color: #ED316B;
				border-left: 1px solid #a8a8a8;
			}
		
		}
		
	}
	.ruleDesc-desc {
		margin-top: 1rem;
		border: 1px solid #ED316B;
		text-align: center;
		color: #282828;
		padding-bottom: 0.853333rem;
		position: relative;
		span {
			position: absolute;
			top: -0.35rem;
			left: 50%;
			margin-left: -0.733333rem;
			background: #fff;
			padding: 0 0.2rem;
			font-size: 0.453333rem;
			color: #ED316B;
			font-weight: bold;
		}
		h2{
			margin: 0.72rem 0 0.666666rem 0;
			font-size: 0.306666rem;
		}
		h1 {
			font-size: 0.346666rem;
			font-weight: bold;
		}
		p {
			font-size: 0.346666rem;
			margin-top: 0.266666rem;
		}
	}

}

</style>
