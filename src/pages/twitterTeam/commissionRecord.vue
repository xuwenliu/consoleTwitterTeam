<template>
  	<div class="content">
    	<title>结佣记录</title>
		<div>
			<!-- 没有结佣记录 -->
            <NoFile v-show="!listData.length">
                <img slot="bgimg"  src="../../assets/img/no_details_ic@2x.png">
                <span slot="info">您还没有结佣记录</span>
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
	                :max-distance="80"
	                bottomPullText="加载更多"
	                bottomDropText="释放加载"
	                topDropText="释放刷新"
	                topLoadingText="刷新中..."
	                >
	                <div class="commissionDetails-have">
		            	<div class="commissionDetails-desc">根据国家法律规定，给您的结佣金额已扣除了个人所得税</div>
		            </div>
		            <dl class="commissionDetails-list" v-for="item in listData">
		            	<dt>{{item.monthDate}}</dt>
		            	<dd tag="dd"  class="bb1 bg0 clearfix" v-for="i in item.transferItemDtos">
		            		<div class="commissionDetails-list-left">
		            			<div>
		            				<h2>{{i.transferTime | setDate}}</h2>
		            				<p>{{i.payTool}}</p>
		            			</div>
		            		</div>
		            		<router-link tag="div" :to="{'name':'commissionVoucher',query:{credential:i.credential}}"  class="commissionDetails-list-right">
		            			<span class="F2 C1 fwb">{{i.transferAmount | currency("",2)}}</span>
								<img src="../../assets/img/more_ico@2x.png" alt="">
		            		</router-link>
		            	</dd>
		            </dl>		            
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
    name: 'commissionRecord',
    components: {
    	NoFile
    },
    data(){
      	return {
       		allLoaded: false,
        	bottomStatus: '',
        	topStatus:"",
        	page:1,					//当前页数
			pageSize:20,			//每页请求的条数
			totalPage:0,			//总页数
			
			listData:[],
      	}
    },
    created() {
    	this.getDataList();
    	/*模拟数据start*/
    	/*后端返回的数据格式*/
    	/*var arr = [
				{
					"transferTime": 1512408375000,//时间17.12.05
			        "transferAmount": 10,//金额
			        "payTool": "网银支付",//方式
			        "credential": "http://img0.imgtn.bdimg.com/it/u=4225722360,1367332860&fm=214&gp=0.jpg",//凭证
			        "postscript": "",//备注
				},
				{
					"transferTime": 1512308775000,//时间2017.12.03
			        "transferAmount": 20,//金额
			        "payTool": "网银支付",//方式
			        "credential": "http://img0.imgtn.bdimg.com/it/u=4225722360,1367332860&fm=214&gp=0.jpg",//凭证
			        "postscript": "",//备注
				},
				{
					"transferTime": 1511338775000,//时间2017.11.22
			        "transferAmount": 50,//金额
			        "payTool": "网银支付",//方式
			        "credential": "http://img0.imgtn.bdimg.com/it/u=4225722360,1367332860&fm=214&gp=0.jpg",//凭证
			        "postscript": "",//备注
				},
				{
					"transferTime": 1485273600000,//时间17.01.25
			        "transferAmount": 60,//金额
			        "payTool": "网银支付",//方式
			        "credential": "http://img0.imgtn.bdimg.com/it/u=4225722360,1367332860&fm=214&gp=0.jpg",//凭证
			        "postscript": "",//备注
				},
				{
					"transferTime": 1485014400000,//时间17.01.25
			        "transferAmount": 80,//金额
			        "payTool": "网银支付",//方式
			        "credential": "http://img0.imgtn.bdimg.com/it/u=4225722360,1367332860&fm=214&gp=0.jpg",//凭证
			        "postscript": "",//备注
				},
			]
    	/*转换为下面格式*/
		/*var bb =[
			{
				"year_month":"2017-11",
				"list":[
					{
						"transferTime": 1511338775000,//时间2017.11.22
				        "transferAmount": 50,//金额
				        "payTool": "网银支付",//方式
				        "credential": "http://img0.imgtn.bdimg.com/it/u=4225722360,1367332860&fm=214&gp=0.jpg",//凭证
				        "postscript": "",//备注
					}
				]
			},
			{
				"year_month":"2017-12",
				"list":[
					{
						"transferTime": 1512308375000,//时间17.12.03
				        "transferAmount": 60,//金额
				        "payTool": "网银支付",//方式
				        "credential": "http://img0.imgtn.bdimg.com/it/u=4225722360,1367332860&fm=214&gp=0.jpg",//凭证
				        "postscript": "",//备注
					},
					{
						"transferTime": 1512408375000,//时间17.12.03
				        "transferAmount": 60,//金额
				        "payTool": "网银支付",//方式
				        "credential": "http://img0.imgtn.bdimg.com/it/u=4225722360,1367332860&fm=214&gp=0.jpg",//凭证
				        "postscript": "",//备注
					}
				]
			},
		]
		this.listData = this.dealreturnData(arr);
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
    	dealreturnData(arr) {
    		var newArr = [];
			for(var i=0;i<arr.length;++i) {
				var yearMonth = setYearMonth(arr[i].transferTime);
				if(i>0) {
					var pre = newArr[newArr.length - 1];
					if (yearMonth === setYearMonth(pre.year_month)) {
						pre.list.push(arr[i]);
						continue;
					}
				}
				var obj = {
					year_month:yearMonth.split(".").join("-"),
					list:[arr[i]]
				}
				newArr.push(obj);
			}
			return newArr;
    	},
    	/*获取列表数据*/
    	getDataList() {
    		//https://devcustomer.yingwumeijia.com:443/{version}/twitter/team/transfers?pageNum=1&pageSize=20
    		let api = window.Host.apiHost+`/twitter/team/transfers?&pageNum=${this.page}&pageSize=${this.pageSize}`;
			Indicator.open();
			this.$http.get(api).then((res)=>{
				console.log(res)
		  		if(res.data.succ){
					Indicator.close();
		  			if(res.data.data){
		  				this.onResponseList(res.data.data.transferItemDtoMap);
		  			}
		  		}else{
		  			Indicator.close();
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
/* 没有结佣记录 */
.nocommissiondetails{
    position: absolute;
    left: 50%;
    margin: 2.26666rem 0 0 -1.72666rem; 
    img{
        width: 3.45333rem;
        height: 3.45333rem;
    }
}
/* 有结佣记录*/
.commissionDetails-have {
	.commissionDetails-desc {
		line-height: 1.17333rem;
		text-align: center;
		font-size: 0.32rem;
		color:rgba(115,115,115,1);
		
	}
}
.commissionDetails-list {
	dt{
		height: 0.65333rem;
		line-height: 0.65333rem;
		padding-left: 0.65333rem;
		background-color: #9E9E9E;
		font-size: 0.37333rem;
		color:rgba(255,255,255,1);
	}
	dd {
		padding:0 0.52rem 0 0.68rem;
		.commissionDetails-list-left{
			float: left;
			display: table;
			height:1.6rem;
			div{
				display: table-cell;
				vertical-align: middle;
				h2{
					color: #282828;
					font-size: 0.4rem;
				}
				p{
					color: #737373;
					font-size: 0.32rem;
				}
			}
		}
		.commissionDetails-list-right {
			float: right;
			line-height: 1.6rem;
			img{
				margin-left: 0.28rem;
				width: 0.18667rem;
				height: 0.34667rem;
			}
		}
	}
}
</style>
