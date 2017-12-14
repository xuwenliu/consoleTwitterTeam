<template>
  <div class="content">
    <title>推客团队管理后台</title>
    <!--找回密码-->
    <div class="findPwd">
    	<div class="reg-input-area">
	      <span class="fc2">手机号</span>
	      <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="phoneNumber" @keyup="eventUserNameInput">
	    </div>

	    <div class="reg-input-area">
	      <span class="fc2">验证码</span>
	      <input style="width: 2rem" type="number" placeholder="请输入验证码" maxlength="6" v-model="verificationCode" @keyup="eventUserNameInput">
	      <div style="width: 1px;background-color:#b2b2b2; height: 0.5rem"></div>
	      <button class="reg-send-text bg0 f30" :class="{'reg-send-text-d':isdisabled}" @click="getVerificationCode(phoneNumber)" :disabled="isdisabled">{{sendBtnText}}</button>
	    </div>
	
	    <div class="reg-input-area">
	      <span class="fc2">新密码</span>
	      <input type="password" placeholder="请输入8-20位数字或字母" maxlength="20" v-model="newPwd">
	    </div>
	    <div class="login-button">
	      <button class="fc0 f28" :disabled="loginBtnEnable" :class="{'login-button-n':!loginBtnEnable}" @click="listenerConfirmClick([phoneNumber,verificationCode,newPwd])">确&nbsp;认</button>
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
    name: 'findPwd',
    components: {
    },
    data(){
      return {
        sendBtnText: '发送验证码',
        phoneNumber: "",					//手机号
        verificationCode: '',			//验证码
        newPwd: '',								//新密码
        isdisabled: false,
        loginBtnEnable: true,
        totalTime: 60,
      }
    },
    created(){

    },
    mounted(){

    },

    methods: {
    	/*确认按钮状态变化*/
      eventUserNameInput(){
      	this.loginBtnEnable = this.phoneNumber.length == 0 ? true : false;
        
      },
      /*获取验证码 */
      getVerificationCode(phoneNumber){
        if(!(Regex.phone.test(phoneNumber))) {
          Toast({message: '手机号输入不正确'});
          return false
        }
        Indicator.open();
        let api = window.Host.apiHost+`/team/user/sendSmsCode?phone=${phoneNumber}&source=2`;
        this.$http.post(api).then((res) => {
          if (res.data.stateCode === 0) {
            this.downTime(this);
            Indicator.close();
          }
        })
      },
      /*倒计时*/
      downTime(dt){
        dt.isdisabled = true;
        let i = 60;
        let timer = setInterval(function () {
          i--;
          dt.sendBtnText = i + "s";
          dt.isdisabled = true;
          if (i == 0) {
            clearInterval(timer);
            dt.sendBtnText = "重新发送";
            dt.isdisabled = false
          }
        }, 1000)
      },


      /*确认*/
      listenerConfirmClick(dt){
        if(this.loginBtnEnable)return false;
        if(!dt) {
          return false;
        }

        if(!(Regex.phone.test(dt[0]))) {
          Toast({message: '手机号输入不正确'});
          return false
        }

        if (!(Regex.phonecode.test(dt[1]))) {
          Toast({message: '验证码为6位数字'});
          return false
        }

        if (!(Regex.password.test(dt[2]))) {
          Toast({message: '密码输入不正确'});
          return false
        }
        let api = window.Host.apiHost+`/team/user/getBackPassword`;
        const data = {
        	"identityInfo":{
        		"phone": dt[0],
          	"smsCode": dt[1],
          	"password": Rsa(dt[2])
        	}
        }
				Indicator.open();
        this.$http.post(api,data).then((res) => {
        	console.log(res);
          if(res.data.stateCode === 0) {
          	Indicator.close();
            localStorage.sessions = JSON.stringify(res.data.data.userSession);//密码找回成功 -收益页
//          localStorage.userId = res.data.data.id;
            Toast({message: '操作成功'});
           	this.$router.replace({name:'earnings'});
          }else{
          	Indicator.close();
           	Toast({message: res.data.message});
          }

        })
      },

    },


  }

</script>

<style scoped lang="less">
.content {
	background-color: #fff;
}
.findPwd {
	overflow: hidden;
	.reg-input-area {
		height: 1.33333rem;
		margin: 0.56rem 0.74rem 0;
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1px #282828;
		font-size: 0.4rem;
		input {
	    flex-grow: 2;
	    margin-left: 0.93333rem;
	  }
	  input::-webkit-input-placeholder{color:#B2B2B2;}
	  .reg-send-text {
		  color: #ED316B;
		  width: 2.4rem;
		  text-align: center;
		}
		.reg-send-text.reg-send-text-d {
		  color: #b2b2b2;
		}
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
}
</style>
