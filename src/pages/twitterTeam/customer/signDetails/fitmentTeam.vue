<template>
	<div>
		
		<NoFile v-show="!listData.length">
            <img slot="bgimg"  src="../../../../assets/img/no_data_ic.png">
            <span slot="info">该用户暂未联系装修团队</span>
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
			
			 	<div class="fitmentTeam">
		        	<ul>
		        		<li class="bg0" v-for="(item,index) in listData" :key="index">
		        			<div>
		        				<p class="f24">通过作品-{{item.caseName}}<span class="fr">{{item.createTime | setDate}}</span></p>
		        				<h1 class="f28 fwb">联系了{{item.companyName}}</h1>
		        			</div>
		        		</li>
		        	</ul>
	        	</div>
					           
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
			userId:this.$route.query.userId,
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
	},
	mounted(){
		this.$nextTick(()=> {  
			document.querySelector(".mint-loadmore-top").style.fontSize="0.37333rem";
			document.querySelector(".mint-loadmore-bottom").style.fontSize="0.37333rem";
        });  
    },
	methods: {
		/*获取列表数据*/
    	getDataList() {
    		//https://devcustomer.yingwumeijia.com:443/{version}/twitter/team/contactInfo?userId=123&pageNum=1&pageSize=20
    		let api = window.Host.apiHost+`/twitter/team/contactInfo?userId=${this.userId}&pageNum=${this.page}&pageSize=${this.pageSize}`;

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
          		this.getDataList();
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
          		this.getDataList();
                this.$refs.loadmore.onBottomLoaded();
            }, 1500);
    	},
	},//methods结束
}
</script>

<style scoped lang="less">
.nofile{
	img{
		width: 4.26666rem !important;
		height: 2.78666rem !important;
		display: block !important;
		
	}
}
.fitmentTeam {
	ul li{
		padding: 0.52rem 0.58666rem 0.54666rem;
		margin-top: 0.29333rem;
		color: #282828;
		margin-bottom: 0.29333rem;
		p{
			margin-bottom:0.29333rem;
			span {
				color: #a8a8a8;
			}
		}
		
	}

}
</style>