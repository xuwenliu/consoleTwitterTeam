<template>
  	<div class="content">
    	<title>添加新成员</title>
		<div class="addMember">
			<div class="methods-1">
				<h1>方法一</h1>
				<p>扫码注册，立即加入团队</p>
				<div>
					<qriously class="qrcode" :value="qrcodeData" :size="200"/>
				</div>
				<div class="line"></div>
			</div>
			<div class="methods-2">
				<h1>方法二</h1>
				<a :href="qrcodeData">直接打开注册页面</a>
				<p>打开后可以转发给微信好友</p>
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
    name: 'addMember',
    components: {
    	
    },
    data(){
      	return {
       		qrcodeData:"",
      	}
    },
    created(){
    	//http://192.168.28.78:8182/{version}/twitter/team/url
    	let api = window.Host.apiHost+`/twitter/team/url`
    	Indicator.open();
    		this.$http.get(api).then((res) => {
				Indicator.close();
	          	console.log(res);
		        if (res.data.succ) {
		        	var url = res.data.data
                    var finalUrl = url.replace(".com/", ".com/"+version+"/");
		        	//this.qrcodeData = "http://192.168.28.50:900/template/twitter/share.shtml?teamId=5&teamName=TeamO";
					console.log(finalUrl)
		        	this.qrcodeData = finalUrl;
		        	
		        }else{
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
.addMember {
	padding: 0 1.173333rem;
	text-align: center;
	color: #282828;
	overflow: hidden;
	.methods-1 {
		margin-top:1rem;
		h1 {
			font-weight: bold;
			font-size: 0.453333rem;
			
		}
		p {
			font-size: 0.373333rem;
			margin:0.466666rem 0 0.373333rem 0;
		}
		.line{
			margin-top:0.933333rem;
			width: 100%;
			height: 1px;
			background: -webkit-radial-gradient(#bbb,#bdbdbd,#d2d2d2,#e4e4e4,#efefef,#fff); /* Safari 5.1 - 6.0 */
    		background: -o-radial-gradient(#bbb,#bdbdbd,#d2d2d2,#e4e4e4,#efefef,#fff); /* Opera 11.6 - 12.0 */
    		background: -moz-radial-gradient(#bbb,#bdbdbd,#d2d2d2,#e4e4e4,#efefef,#fff); /* Firefox 3.6 - 15 */
			background: radial-gradient(#bbb,#bdbdbd,#d2d2d2,#e4e4e4,#efefef,#fff);
		}
	}
	.methods-2{
		margin-top: 0.893333rem;
		h1 {
			font-weight: bold;
			font-size: 0.453333rem;
			
		}
		a{
			display: inline-block;
			margin: 0.6rem 0 0.32rem 0;
			line-height: 1.04rem;
			color: #fff;
			text-align: center;
			width: 4.08rem;		
			font-size: 0.4rem;
			background-color: #ED316B;
			border-radius: 0.08rem;
		}
		p {
			font-size: 0.346666rem;
		}
	}
}
</style>
