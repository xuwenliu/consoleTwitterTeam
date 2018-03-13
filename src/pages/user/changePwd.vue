<template>
<div class="content">
  <title>修改密码</title>
  <div class="changePwd">
    <div class="reg-input-area">
      <span class="fc2">原密码</span>
      <input type="password" placeholder="请输入管理员账号原密码" maxlength="20" v-model="oldPwd" @keyup="eventUserNameInput">
    </div>
    <div class="reg-input-area">
      <span class="fc2">新密码</span>
      <input type="password" placeholder="请输入8-20位数字或字母" maxlength="20" v-model="newPwd" @keyup="eventUserNameInput">
    </div>
    <div class="reg-input-area">
      <span class="fc2">确认密码</span>
      <input type="password" style="margin-left: 0.53333rem;" placeholder="请再次输入新密码" maxlength="20" v-model="confirmPwd">
    </div>
    <div class="login-button">
      <button class="fc0 f28" :disabled="loginBtnEnable" :class="{'login-button-n':!loginBtnEnable}" @click="listenerConfirmClick([oldPwd,newPwd,confirmPwd])">确&nbsp;认</button>
    </div>
  </div>
</div>
</template>

<script>
/*mint-ui*/
import {
  MessageBox
} from 'mint-ui';
import {
  Indicator
} from 'mint-ui';
import {
  Toast
} from 'mint-ui';

export default {
  name: 'changePwd',
  components: {

  },
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      confirmPwd: "",
      loginBtnEnable: true,
    }

  },
  created() {

  },
  mounted() {

  },

  methods: {
    eventUserNameInput() {
      this.loginBtnEnable = this.oldPwd.length == 0 ? true : false;
    },

    /*确认*/
    listenerConfirmClick(dt) {
      if (this.loginBtnEnable) return false;
      if (!dt) {
        return false;
      }

      if (!(Regex.password.test(dt[0]))) {
        Toast({
          message: '原密码格式不正确'
        });
        return false
      }
      if (!(Regex.password.test(dt[1]))) {
        Toast({
          message: '新密码格式不正确'
        });
        return false
      }

      if (!(Regex.password.test(dt[2]))) {
        Toast({
          message: '确认密码格式不正确'
        });
        return false
      }
      if (dt[1] != dt[2]) {
        Toast({
          message: '密码两次输入不一致'
        });
        return false
      }
      let data = {
        "oldPassword": Rsa(dt[0]),
        "newPassword": Rsa(dt[2])
      }

      //https://devcustomer.yingwumeijia.com:443/{version}/team/user/changePassword?oldPassword=123&newPassword=456
      Indicator.open();
      let api = window.Host.apiHost + `/team/user/changePassword`;
      this.$http.post(api, data).then((res) => {
        console.log(res);
        if (res.data.stateCode === 0) {
          Indicator.close();
          Toast({
            message: '操作成功'
          });
          this.$router.go(-1);
        } else {
          Indicator.close();
          Toast({
            message: res.data.message
          });
        }

      })
    },


  }
}
</script>

<style scoped lang="less">
.content {
    background-color: #fff;
}
.changePwd {
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
        input::-webkit-input-placeholder {
            color: #B2B2B2;
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
