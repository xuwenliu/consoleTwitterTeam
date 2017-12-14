<template>
  	<div class="content">
    	<title>佣金明细</title>
		<div>
			<NoFile v-show="!listData.length">
		        <img slot="bgimg" src="../../assets/img/no_money_ic@2x.png">
		        <span slot="info">您还没有获得佣金</span>
		    </NoFile>
	    	<div class="page-loadmore" v-show="listData.length">
	            <div class="page-loadmore-wrapper" ref="wrapper">
	                <mt-loadmore
	                :top-method="loadTop" 
	                :bottom-method="loadBottom"
	                :bottom-all-loaded="allLoaded"
	                @bottom-status-change="handleBottomChange"
	                @top-status-change="handleTopChange"
	                ref="loadmore"
	                :auto-fill="false"
	                :maxDistance="80"
	                :topDistance="50"
	                :bottomDistance="50"
	                bottomPullText="加载更多"
	                bottomDropText="释放加载"
	                topDropText="释放刷新"
	                topLoadingText="刷新中..."
	                >
		                <div class="detailsList-list">
					    	<div class="detailsList-list-total clearfix">
						    	<h1 class="fl fwb">成交笔数 {{dealCount}}</h1>
						   
					    	</div>
					    	<dl v-for="(item,listDataIndex) in listData">
					    		<dt class="clearfix"><p class="fl">{{item.monthDate}}</p><p class="fr">{{item.monthAmount | currency("",2)}}</p></dt>
					    	
					    		<dd  class="bb1" v-for="(i,index) in item.teamAmountInfos">
					    			<div class="dd-month bg0 clearfix">
					    				<div class="fl from">
				    						<div class="form-con">
				    							<span>来自：{{i.twitterName}}</span>
					    						<h1>{{i.createDate | setDate}}</h1>
				    						</div>
						    			</div>
						    			<div class="spread-box fr" @click="clickSpreadList(i.settlementId,listDataIndex,index)">
						    				<span class="fwb">{{i.gainAmount | currency("",2)}}</span>
						    				<img :src="i.isSpread?spreadListStatusArr[1]:spreadListStatusArr[0]"/>
						    			</div>
					    			</div>
					    			
					    			<div v-show="i.isSpread" class="signing-content" :style="{'paddingTop':item.monthAmount==0?'0.4rem':'0.2rem'}">
						    			<h1 class="signing-content-title" v-show="item.monthAmount==0" :style="{'lineHeight':item.monthAmount==0?'normal':''}">根据您的团队要求，佣金统一划入了团队账户</h1>
						    			<ul>
						    				<li class="clearfix"><p class="fl">签约客户</p><p class="fr">{{signData.customerName}}</p></li>
						    				<li class="clearfix"><p class="fl">签约日期</p><p class="fr">{{signData.signDate | setDate}}</p></li>
						    				<li class="clearfix"><p class="fl">签约类型</p><p class="fr">{{signData.signTypeDesc}}</p></li>
						    				<li class="clearfix"><p class="fl">签约金额</p><p class="fr">{{signData.signAmount | currency("",2)}}</p></li>
						    			</ul>
						    		</div>
					    		</dd>
					    		
					    	</dl>
					    </div>
	                </mt-loadmore>
	            </div>
	       </div>
		</div>
  	</div>
</template>
<script>
  /*mint-ui*/
import {MessageBox} from 'mint-ui';
import {Indicator} from 'mint-ui';
import {Toast} from 'mint-ui';
import NoFile from '../../components/NoFile'
export default{
    name: 'commissionDetails',
    components: {
    	NoFile
    },
    data(){
      	return {
			spreadListStatusArr:[require('../../assets/img/close_list_ic@2x.png'),require('../../assets/img/open_list_ic@2x.png')],//下拉菜单箭头
			allLoaded: false,
        	bottomStatus: '',
        	topStatus:"",
        	page:1,					//当前页数
			pageSize:20,			//每页请求的条数
			totalPage:0,			//总页数
			
			
			dealCount:"",			//成交笔数
			listData:[],			//列表数据
			signData:{},			//每个列表下的签约数据,通过settlementId去获取

			

      	}
    },
    created(){
		this.getDataList();
		/*模拟数据start*/
		/*this.dealCount=999;
		this.signData={				
		    "settlementId": 0,
		    "customerName": "妈妈米亚",
		    "signDate": 1412308775000,
		    "signType": "",
		    "signTypeDesc": "软装设计",
		    "signAmount": 500
		}
		/*模拟数据end*/
		
    },
    mounted(){
		this.$nextTick(()=> {  
			document.querySelector(".mint-loadmore").style.overflow="visible";
			document.querySelector(".mint-loadmore-top").style.fontSize="0.37333rem";
			document.querySelector(".mint-loadmore-bottom").style.fontSize="0.37333rem";
			document.querySelector(".mint-loadmore-bottom").style.display="none";
			
        });  
    },
    methods: {
    	/*点击展开下拉菜单并获取当前日期的签约数据*/
    	clickSpreadList(settlementId,listDataIndex,index) {
			if (this.listData[listDataIndex].teamAmountInfos[index].isSpread=="undefined") {
				this.$set(this.listData[listDataIndex].teamAmountInfos[index], 'isSpread', true);
			} else {
				this.getNodeInfo(settlementId);
				this.listData[listDataIndex].teamAmountInfos[index].isSpread = !this.listData[listDataIndex].teamAmountInfos[index].isSpread;
			}
		},
		/*获取列表数据*/
		getDataList() {
			//https://devcustomer.yingwumeijia.com:443/{version}/twitter/team/commission/customer?pageNum=1&pageSize=20
			let api = window.Host.apiHost+`/twitter/team/commission/customer?&pageNum=${this.page}&pageSize=${this.pageSize}`;
			Indicator.open();
			this.$http.get(api).then((res)=>{
				console.log(res)
		  		if(res.data.succ){
					Indicator.close();
		  			if(res.data.data){
		  				this.dealCount = res.data.data.dealCount;
		  				this.onResponseList(res.data.data.teamCommisionDtoMap);
		  				
		  			}
		  		}else{
		  			Indicator.close();
					Toast({message: res.data.message});
				}
		  	})
		},
		getNodeInfo(settlementId) {
			//http://192.168.28.78:8182/{version}/twitter/team/123/nodeInfo
			this.$http.get(window.Host.apiHost+`/twitter/team/${settlementId}/nodeInfo`).then((res)=>{
				console.log(res)
		  		if(res.data.succ){
		  			if(res.data.data){
		  				this.signData = res.data.data;
		  			}
		  		}else{
					Toast({message: res.data.message});
				}
		  	})
		},
		loadTop() {
			this.page = 1;
          	setTimeout(() => {
          		this.getDataList(this.routeType);
                this.$refs.loadmore.onTopLoaded();
                document.querySelector(".mint-loadmore-bottom").style.display="none";
                this.allLoaded = false;
            }, 1500);
        },
        onResponseList(result) {
			if (this.page == 1) {
				this.listData = result || [];
			}else{
				if(result){
					document.querySelector(".mint-loadmore-bottom").style.display="none";
					var lastMonth = this.listData[this.listData.length-1].monthDate;
					var firstMonth = result[0].monthDate;
					if(lastMonth==firstMonth){
						delete result[0].monthDate;
					}
					this.listData=this.listData.concat(result);
					this.allLoaded = false;
					
				}else {
					document.querySelector(".mint-loadmore-bottom").style.display="none";
					this.allLoaded = true;
				}
			}
		},
		handleTopChange(status) {
			this.topStatus = status;
		},
        //mint-ui 上拉加载
		handleBottomChange(status) {
        	this.bottomStatus = status;
        	document.querySelector(".mint-loadmore-bottom").style.display="block";
    	},
    	loadBottom() {
			this.page += 1;
            setTimeout(() => {
          		this.getDataList();
                this.$refs.loadmore.onBottomLoaded();
            }, 1500);
    	},
    },

}

</script>

<style scoped lang="less">
.nofile{
	margin: 3.46666rem 0 0 -1.72666rem;
}
.detailsList-list {
	.detailsList-list-total {
		padding: 0 0.42666rem 0 0.64rem;
		line-height: 1.29333rem;
		height: 1.29333rem;
		font-size: 0.42666rem;
		color: #282828;
	}
	dl {
		dt{
			height: 0.65333rem;
			line-height: 0.65333rem;
			background-color: #9E9E9E;
			padding: 0 0.42666rem 0 0.64rem;
			font-size: 0.37333rem;
			color:rgba(255,255,255,1);
		}
		dd{
			font-size: 0.4rem;
			color:rgba(40,40,40,1);
			.dd-month {
				padding: 0 0.42666rem 0 0.64rem;
			}
			.from{
				display: table;
    			height: 1.6rem;
    			.form-con{
    				display: table-cell;
    				vertical-align: middle;
    			}
			}
			.spread-box {
				line-height: 1.6rem;
				img{
					width: 0.34666rem;
					height: 0.18666rem;
					margin-left: 0.29333rem;
					
				}
			}
			.left{
				padding: 0.26666rem 0;
				margin-right: 0.38666rem;
				img{
					display: block;
					width: 1.08rem;
					height: 1.08rem;
					border-radius: 50%;
				}
			}
			.center{
				padding-top: 0.62666rem;
				p{
					span{
						padding: 0 0.15rem;
					}
				}
			}
			.right{
				padding-top: 0.41333rem;
				text-align: right;
				h2{
					color:rgba(40,40,40,1);
					font-size: 0.4rem;	
				}
				p{
					color:rgba(115,115,115,1);
					font-size: 0.32rem;
				}
				
			}
			.signing-content{
				margin: 0.29333rem 0.28rem 0.26666rem 0.29333rem;
				padding-top: 0.4rem;
				background-color: #fff;
				.signing-content-title{
					text-align: center;
					font-size: 0.29333rem;
					color:rgba(115,115,115,1);
				}
				ul{
					padding: 0 0.37333rem 0.41333rem 0.4rem;
					font-size: 0.37333rem;
					color:rgba(40,40,40,1);
					li{
						margin-top: 0.29333rem;
						    line-height: normal;
					}
				}
			}
			
		}
		
	}
}
</style>
