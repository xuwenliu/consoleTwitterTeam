<template>
  <div class="content">
   	<title>推客团队管理后台</title>
    <div class="login">
    	<div class="login-input-area">
	      <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="phoneNumber" @keyup="eventUserNameInput">
	    </div>
	    <div class="login-input-area" style="margin-top: 0.56rem">
	      <input type="password" placeholder="请输入密码" maxlength="20" v-model="pwd" @keyup="eventUserNameInput">
	    </div>
	    <div class="login-button">
	      <button :disabled="loginBtnEnable" class="fc0 f28" :class="{'login-button-n':!loginBtnEnable}" @click="listenerLoginClick([phoneNumber,pwd])">登&nbsp;录</button>
	    </div>
	    <div class="extra-button-area">
	      <button class="bg0" @click="listenerFindClick">忘记密码?</button>
	    </div>
		</div>
	</div>
</template>
<script>
  import {MessageBox} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  export default{
    name: 'login',
    components: {
    },
    data(){
      return {
        phoneNumber: '',//手机号码
        pwd: '',//密码
        loginBtnEnable: true,
      }
    },
    created(){
     	/*登录直接跳首页*/
	    if (localStorage.sessions) {
	     	this.$router.replace({name: "earnings"})
	    }
    },
    methods: {
      getQuery(){
        const uri = this.$route || "";
        return uri.fullPath.replace(uri.path, '') || "?";
      },
      /*登录按钮变化*/
      eventUserNameInput() {
      	this.loginBtnEnable = this.phoneNumber.length == 0 ? true : false;
      },
      /*忘记密码*/
      listenerFindClick(){
        this.$router.push({"name":"findPwd"});
      },
      /*login*/
      listenerLoginClick(dt){
        if (!dt) {
          return false
        }
        if(dt[0]==""){
        	Toast({message: '请输入手机号'});
          return false
        }
        if (!(Regex.phone.test(dt[0]))) {
          Toast({message: '手机号格式不正确'});
          return false
        }
				if(dt[1]==""){
        	Toast({message: '请输入密码'});
          return false
        }
        if (!(Regex.password.test(dt[1]))) {
          Toast({message: '密码格式不正确'});
          return false
        }
        let api = window.Host.apiHost+`/team/user/login`;
        const data = {
        	"identityInfo":{
        		"phone": dt[0],
          	"password": Rsa(dt[1])
        	}
        };
        Indicator.open();
        this.$http.post(api, data).then((res) => {
          console.log(res);
          if(res.data.stateCode === 0) {
          	Indicator.close();
            localStorage.sessions = JSON.stringify(res.data.data.userSession);//刷新仍登录
//          localStorage.userId = res.data.data.id;
            Toast({message: "登录成功",duration: 2000});
            this.$router.replace({name: "earnings"});
          }else {
          	Indicator.close();
            Toast({message: res.data.message});
          }
        })
      }
    },
  }

</script>

<style scoped lang="less">
.content {
	background-color: #fff;
}
.login {
	overflow: hidden;
	.login-input-area {
		height: 1.33333rem;
		margin: 0.56rem 0.74rem 0;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1px #282828;
		font-size: 0.4rem;
		input {
			flex-grow: 2;
			width: 100%;
			font-size: 0.4rem;
		}
		input::-webkit-input-placeholder{color:#B2B2B2;}
	}
	.login-button {
		margin: 1.33333rem 0.48rem 0;
	  button {
		  width: 100%;
		  height: 1.2rem;
		  line-height: 1.2rem;
		  text-align: center;
		  border-radius: 0.08rem;
		  background-color: #ED316B;
		  opacity: 0.7;
		}
		button.login-button-n {
			opacity: 1;
		}
	}
	.extra-button-area {
		font-size: 0.373333rem;
		color: #505050;
		text-align: center;
		margin-top: 0.773333rem;
	}
}





</style>
