<template>
  	
    	<!--<title>推客团队管理后台</title>-->
		<div>
			<div v-show="showWriteMemorandum" @touchmove.prevent>
	            <div class="show-input-box">
	                <div class="inputBox">
	                    <div class="F2 C1 inputBox-title">备忘录</div>
	                    <div class="textarea-border">
	                        <textarea placeholder="请输入备注，30字以内" maxlength="30" v-model.trim="memorandumContent" rows="30" cols="4" class="inputBox-input F4"></textarea>
	                    </div>
	                    <div class="inputBox-btn C6 F3">
	                        <div style="border-right:1px solid #737373" @click="callOff">取消</div>
	                        <div @click="sure">确定</div>
	                    </div>
	                </div>
	            </div>
        	</div>
        	
			<div class="companyInfo">
				<h1>{{teamInfo.twitterTeamName}}</h1>
				<div class="companyInfo-info bb1 bg0 clearfix">
					<div class="companyInfo-info-left fl">
						<div class="companyInfo-info-left-box">
							<h2><img src="../../assets/img/ht_manager_ic@2x.png"/><span>管理员</span>&nbsp;<i>{{teamInfo.userName}}</i></h2>
							<h2><img src="../../assets/img/ht_phone_ic@2x.png"/><span>手机号</span>&nbsp;<i>{{teamInfo.userPhone | phonefilter(3)}}</i></h2>
						</div>
					</div>
					<div class="companyInfo-info-right fr">
						<div class="verLine"></div>
						<div class="companyInfo-info-right-box">
							<router-link tag="button" :to="{'name':'changePwd'}">修改密码</router-link>
							<button @click="logOut">退出登录</button>
						</div>
					</div>
					
				</div>
				<router-link tag="div" :to="{'name':'addMember'}" class="add f28 clearfix" >
					<p class="fl">添加新成员</p>
					<p class="fr"><span>点击此处添加</span><img src="../../assets/img/more_ico@2x.png"/></p>
				</router-link>
				 <div class="page-loadmore">
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
	                 <dl>
					<dt>所属推客（{{twitterCount}}）</dt>
					<dd v-for="item in listData">
						<div class="twitter-info bb1 clearfix">
							<div class="twitter-info-left fl">
								<h2>
									<p class="f30 fwb">{{item.twitterName}}</p>
									<p class="f24">{{item.createTime | setDate}}</p>
								</h2>
							</div>
							<div class="twitter-info-right fr">
								<span class="f28">成交笔数&nbsp;&nbsp;<i class="fwb">{{item.dealCount}}</i></span>
								<div class="phone fr">
									<a :href="'tel:'+item.twitterPhone"><img src="../../assets/img/ht_call_ic@2x.png"/></a>
								</div>
							</div>
						</div>
						<div class="memo f24 clearfix" @click="showWritememorandum(item.twitterId,item.remarks)">
							<div class="memo-left fl">
								<span>备忘录：</span>
								<p v-if="item.remarks" class="f24 textcut">{{item.remarks}}</p>
								<p v-else class="f24" >点击填写备忘录</p>
							</div>
							<div class="memo-right fr">
								<img src="../../assets/img/more_ico@2x.png"/>
							</div>
						</div>
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
export default{
    name: 'team',
    components: {
    	
    },
    data(){
      	return {
      		top:"",
      		allLoaded: false,
        	bottomStatus: '',
        	topStatus:"",
        	page:1,					//当前页数
			pageSize:20,			//每页请求的条数
			totalPage:0,			//总页数
			
      		showWriteMemorandum:false,
       		memorandumContent: "", //备忘录内容
       		
       		teamInfo:{},
       		listData:[],
       		twitterCount:"",		//所属推客个数
       		twitterId:"",			//列表下提交备忘录需要的推客id

      	}
    },
    created(){
    	this.getTeamInfo();
    	this.getDataList();
		/*模拟数据 start*/
		/*this.twitterCount = 555;
		this.teamInfo={
   			"id": 0,
		    "twitterTeamName": "妈咪妈咪",
		    "userId": 0,
		    "userName": "李四",
		    "userPhone": "15892591500"
   		}
		this.listData = [
			{
	          	"twitterId": 0,
	          	"twitterName": "张国荣",
	          	"twitterPhone": "15892591500",
	          	"dealCount": 40,
	          	"createTime": 1511338775000,
	          	"remarks":"我是备注"
	        },
	        {
	          	"twitterId": 1,
	          	"twitterName": "黎明",
	          	"twitterPhone": "13892591500",
	          	"dealCount": 20,
	          	"createTime": 1511338775000,
	          	"remarks":""
	        }
		]
		/*模拟数据end*/
		
    },
    mounted(){
		this.$nextTick(()=> {  
			document.querySelector(".mint-loadmore-top").style.fontSize="0.37333rem";
			document.querySelector(".mint-loadmore-bottom").style.fontSize="0.37333rem";
        });  
    },
    methods: {
    	/*获取团队基本信息*/
    	getTeamInfo() {
    		//https://devcustomer.yingwumeijia.com:443/{version}/twitter/team/teamInfo
    		let api = window.Host.apiHost+`/twitter/team/teamInfo`;
    		Indicator.open();
    		this.$http.get(api).then((res) => {
				Indicator.close();
	          	console.log(res);
		        if (res.data.succ) {
					this.teamInfo = res.data.data;
		        	
		        } else {
		        	Indicator.close();
		            Toast({message: res.data.message});
		        }
	        })
    	},
    	/*获取列表数据*/
    	getDataList() {
    		//https://devcustomer.yingwumeijia.com:443/{version}/twitter/team/123/twitter?pageNum=1&pageSize=20
    		let api = window.Host.apiHost+`/twitter/team/twitter?pageNum=${this.page}&pageSize=${this.pageSize}`;
    		this.$http.get(api).then((res) => {
	          	console.log(res);
		        if (res.data.succ) {
		        	this.twitterCount = res.data.data.twitterCount;
					this.onResponseList(res.data.data.twitterBasicDtos);
		        	
		        }else{
		            Toast({message: res.data.message});
		        }
	        })
    	},
    	/*退出登录*/
    	logOut() {
    		
    		MessageBox.confirm('确定退出登录?').then(() => {
    			//确定
    			Indicator.open();
    			let api = window.Host.apiHost+`/team/user/logout`;
				this.$http.post(api).then((res) => {
					Indicator.close();
		          	console.log(res);
			        if (res.body.succ) {
						localStorage.clear();
			        	Toast({message: "退出成功", duration: 2000});
			            this.$router.replace({name:'login'});
			        } else {
			            Toast({message: res.data.message});
			        }
		        })
			},()=>{
				//取消
			});
    	},
    	/*显示填写备忘录弹框*/
    	showWritememorandum(twitterId,remarks) {
    		if(remarks){
    			this.memorandumContent = remarks;
    		}
    		this.twitterId = twitterId;
    		this.showWriteMemorandum=true;
    	},
    	/*填写备忘录-取消*/
     	callOff() {
            this.showWriteMemorandum=false;
            this.memorandumContent="";
        },
        /*填写备忘录-确定*/
        sure() {
            if(this.memorandumContent.length == 0 || this.memorandumContent == "") {
                Toast({message:"输入不能为空"});
                return false;
            }
           //http://192.168.28.78:8182/{version}/twitter/team/twitter/remarks?twitterId=1313&remarks=1616
        	let api = window.Host.apiHost+`/twitter/team/twitter/remarks?twitterId=${this.twitterId}&remarks=${this.memorandumContent}`;
 
        	Indicator.open();
        	this.$http.post(api).then((res) => {
					Indicator.close();
		          	console.log(res);
			        if (res.data.succ) {
			        	this.getDataList();//需要考虑加载第几页
                        this.callOff();
                        Toast({message: "操作成功"});
			        } else {
			            Toast({message: res.data.message});
			        }
		        })
        },
        loadTop() {
        	this.page = 1;
          	setTimeout(() => {
          		this.getDataList();
          		 this.allLoaded = false;
                this.$refs.loadmore.onTopLoaded();
               
            }, 1500);
        },
        onResponseList(result) {
			if (this.page == 1) {
				this.listData = result;
				if(this.listData.length<this.pageSize){
					this.allLoaded = true;
				}else {
					this.allLoaded = false;
				}
			}else{
				if(result){
					this.listData=this.listData.concat(result);
					this.allLoaded = false;
				}else {
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
/*备忘录弹窗start*/
.show-input-box {
    display: flex;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
}
.show-input-box > div {
    width: 70%;
}
.show-input-box .inputBox {
    text-align: center;
    background: #fff;
    .inputBox-title{
    	height: 1rem;
    	line-height: 1rem;
    }
}
    
.textarea-border{
    width: 70%;
    border:1px solid #737373;
    text-align: start;
    padding: 0.13333rem;
    box-sizing: border-box;
    margin:0 auto;
    margin-bottom: 0.53333rem;
}
.inputBox-input {
    width: 100%;
    height: 2rem;
    resize: none;
}
.inputBox-btn {
    border-top: 1px solid #737373;
    height: 1.2rem;
    position: relative;
}

.inputBox-btn div {
    float: left;
    width: 49.5%;
    height: 1.2rem;
    line-height: 1.2rem;
}
/*备忘录弹窗end*/
.companyInfo {
	padding-bottom: 1.30666rem;
	h1{
		height: 1.213333rem;
		line-height: 1.213333rem;
		color: #fff;
		font-size: 0.4rem;
		font-weight: bold;
		background-color: #ED316B;
		text-align: center;
	}
	.companyInfo-info {
		.companyInfo-info-left {
			margin-left: 0.826666rem;
			display:table;
			height:2.62666rem;
			
			.companyInfo-info-left-box{
				display: table-cell;
				vertical-align: middle;
				h2{
					
					font-size:0.373333rem;
					color: #282828;
					img{
						width: 0.48rem;
						height: 0.48rem;
						margin-right: 0.333333rem;
						vertical-align: text-bottom;
					}
				}
				h2:last-child{
					margin-top: 0.56rem;
					img{
						width: 0.34666rem;
						height: 0.49333rem;
						
					}
				}
			}
			
		}
		.companyInfo-info-right {
				margin-right: 0.76rem;
				display: table;
				height: 2.62666rem;
				.companyInfo-info-right-box{
					display: table-cell;
					vertical-align: middle;
				}
				.verLine{
					width: 1px;
					height: 1.38666rem;
					background-color: #A8A8A8;
					margin-top: 0.62rem;
				}
				/*border-left: 1px solid #a8a8a8;*/
			button {
				margin-left: 1.026666rem;
				width: 1.893333rem;
				height: 0.613333rem;
				color: #ED316B;
				border:1px solid #ED316B;
				border-radius: 0.08rem;
				text-align: center;
				font-size: 0.32rem;
				background-color: #fff;
				display: block;
			}
			button:last-child{
				margin-top: 0.186666rem
			}
		}
		
	}
	.add {
			height: 1.333333rem;
			margin-top: 0.32rem;
			background-color: #fff;
			line-height: 1.333333rem;
			color: #282828;
			padding: 0 0.64rem 0 0.626666rem;
			p{
				img{
					width: 0.186666rem;
					height: 0.346666rem;
					vertical-align: middle;
					margin-left: 0.16rem;
				}
			}
		}
	dl {
		dt {
			background-color: #f5f5f5;
			font-size: 0.32rem;
			color: #737373;
			line-height: 1.173333rem;
			margin-top: 0.44rem;
			padding-left: 0.586666rem;
		}
		dd {
			margin-bottom: 0.21333rem;
			padding:0 0.546666rem 0 0.586666rem;
			background-color: #fff;
			.twitter-info {
				/*padding: 0.426666rem 0 0.44rem;*/
				height:1.8rem;
				.twitter-info-left {
					display: table;
					height: 1.8rem;
					h2{
						display: table-cell;
						vertical-align: middle;
						p:last-child{
							margin-top: 0.2rem;
						}
					}
				}
				.twitter-info-right {
					padding-top: 0.51333rem;
					span{
						margin-right: 0.52rem;
					}
					.phone{
						border-left: 1px solid #a8a8a8;
						a{
							display:block;
							margin-left: 0.56rem;
							img{
								width: 0.72rem;
								height: 0.72rem;
								vertical-align: middle;
								display: block;
							}
						}
							
					}
					
				}
			}
			.memo {
				line-height: 1.04rem;
				.memo-left{
					color: #282828;
					width:95%;
					p{
						width: 80%;
						color: #a8a8a8;
						line-height: normal;
						display: inline-block;
						vertical-align: text-bottom;
					}
				}
				.memo-right{
					img{
						width: 0.186666rem;
						height: 0.346666rem;
						vertical-align: middle;	
					}
				}
			}
		}
	}
	
}
</style>
