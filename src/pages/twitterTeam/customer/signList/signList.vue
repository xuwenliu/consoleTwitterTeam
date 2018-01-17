<template>
	<div>
	
        <NoFile v-show="!listData.length">
            <img slot="bgimg"  src="../../../../assets/img/no_data_ic.png">
            <span slot="info">{{routerType===1?'暂无未签约客户':'暂无签约客户'}}</span>
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
				<ul class="signList">
					<li class="bg0" v-for="(item,index) in listData" :key="index">
						<div class="signList-box">
							<h1 class="f30"><span class="fwb">{{item.userName}}</span>&nbsp;&nbsp;<p class="phone">{{item.userPhone | phonefilter(3)}}</p></h1>
							<p class="f26">
								<span>联系装修团队&nbsp;{{item.imCount}}次</span>
								<span>申请主材补贴&nbsp;{{item.materialCount}}次</span>
								
							</p>
							<p class="time f24">{{item.registerTime | setDate}}</p>
						</div>
						<router-link tag="div" :to="{'name':'signDetails',query:{'userId':item.userId,'userName':item.userName}}"  class="signList-box-right">
							<img src="../../../../assets/img/more_ico@2x.png" alt="" />
						</router-link >
					</li>
				</ul>	            
                </mt-loadmore>
            </div>
        </div>
	</div>
</template>

<script>
/*mint-ui*/
import {MessageBox} from 'mint-ui';
import {Indicator} from 'mint-ui';
import {Toast} from 'mint-ui';
import NoFile from '../../../../components/NoFile'
export default {
	name: '',
	components: {
		NoFile
	},
	data() {
		return {
			routerType:1,	//1=未签约客户，2=已签约客户
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
		if(this.$route.name=="noSignCustomer"){
			this.routerType = 1;
		}else {
			this.routerType = 2;
		}
		this.getDataList(this.routerType);
	},
	mounted(){
		this.$nextTick(()=> {  
			document.querySelector(".mint-loadmore-top").style.fontSize="0.37333rem";
			document.querySelector(".mint-loadmore-bottom").style.fontSize="0.37333rem";
        });  
    },
	methods: {
		/*获取列表数据*/
    	getDataList(type) {
    		//https://devcustomer.yingwumeijia.com:443/{version}/twitter/team/customerList?customerType=1&pageNum=1&pageSize=20
    		let api = window.Host.apiHost+`/twitter/team/customerList?customerType=${type}&pageNum=${this.page}&pageSize=${this.pageSize}`;

			Indicator.open();
			this.$http.get(api).then((res)=>{
				console.log(res)
		  		if(res.data.succ){
					Indicator.close();
		  			if(res.data.data){
		  				this.onResponseList(res.data.data.result);
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
          		this.getDataList(this.routerType);
                this.$refs.loadmore.onTopLoaded();
            }, 1500);
        },
        onResponseList(result) {
			if (this.page == 1) {
				this.listData = result || [];
			}else{
				if(result) {
					this.listData=this.listData.concat(result);
				}
			}
			
		},
		handleTopChange(status) {
			this.topStatus = status;
		},
        //mint-ui 上拉加载
		handleBottomChange(status) {
        	this.bottomStatus = status;
    	},
    	loadBottom() {
			this.page += 1;
            setTimeout(() => {
          		this.getDataList(this.routerType);
                this.$refs.loadmore.onBottomLoaded();
            }, 1500);
    	},
	},//methods结束
}
</script>

<style scoped lang="less">
.signList {
	li{
		margin-top: 0.29333rem;
		padding: 0.45333rem 0.56rem 0.45333rem 0.61333rem;	
		color: #282828;
	    display: flex;
		justify-content: space-between;
		.signList-box {
			h1 {
				.phone{
					display: inline-block;
					margin-top: 0;
				}
			}
			p{
				margin-top: 0.37333rem;
				span{
					padding-left: 0.28rem;
				}
				span:first-child {
					padding-left: 0;
					padding-right: 0.28rem;
					border-right: 1px solid #e6e6e6;
				}
				
			}
		}
		.signList-box-right {
				flex: 1;
			    display: flex;
			    justify-content: flex-end;
			    align-items: center;
			img{
					width: 0.18666rem;
					height: 0.34666rem;
					vertical-align: middle;
					float: right;
				}
		}
		
	}
		
}
</style>