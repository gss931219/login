<template>
  <div class="login">
    <div class="login-container">
      <el-container class="container">
        <el-main height="auto">
          <div class="main">
            <p class="login-title">您好，欢迎登录</p>
            <el-tabs class="login-tab" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="密码登录" name="passwordForm">
                <el-form
                  :model="passwordForm"
                  :rules="passwordFormRules"
                  ref="passwordForm"
                  label-width="65px"
                >
                  <el-form-item label="手机号" prop="username">
                    <el-input
                      v-model="passwordForm.username"
                      clearable
                      prefix-icon="el-icon-service"
                      placeholder="请输入手机号/账号"
                      maxlength="16"
                    />
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input
                      v-model="passwordForm.password"
                      clearable
                      prefix-icon="el-icon-service"
                      placeholder="请输入密码"
                      maxlength="16"
                    />
                  </el-form-item>
                  <!-- <div class="verification-num">
                    <el-form-item label="验证码" prop="verification" class="verification">
                      <el-input
                        v-model.number="ruleForm.verification"
                        prefix-icon="el-icon-goods"
                        placeholder="请输入验证码"
                      />
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="takeVerifica()">获取验证码</el-button>
                    </el-form-item>
                  </div>-->

                  <div class="passWord-login">
                    <p>
                      <router-link to="/Register" class="register">注册账户</router-link>
                    </p>
                    <!-- <p>
                      <router-link to="/" class="passWord">手机登录</router-link>
                    </p>-->
                  </div>
                  <el-form-item class="pass-login">
                    <el-button
                      class="btn"
                      type="primary"
                      @click="login"
                      :loading="submitLoading"
                    >立即登录</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="验证码登录" name="verifyCodeForm">
                <el-form
                  :model="verifyCodeForm"
                  :rules="verifyCodeFormRules"
                  ref="verifyCodeForm"
                  label-width="65px"
                >
                  <el-form-item label="手机号" prop="username">
                    <el-input
                      v-model.number="verifyCodeForm.username"
                      maxlength="11"
                      prefix-icon="el-icon-service"
                      placeholder="请输入手机号"
                      clearable
                    />
                  </el-form-item>
                  <div class="verification-num">
                    <el-form-item label="验证码" prop="password" class="verification">
                      <el-input
                        v-model.number="verifyCodeForm.password"
                        prefix-icon="el-icon-goods"
                        placeholder="请输入验证码"
                        maxlength="6"
                        clearable
                      />
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="sendCode()" :loading="codeLoading">{{sendCodeTitle}}</el-button>
                    </el-form-item>
                  </div>
                  <div class="register-passWord">
                    <p @click="goRegister" class="registers">注册账户
                      <!-- <router-link to="/Register"  class="register">注册账户</router-link> -->
                    </p>
                    <!-- <p>
                      <router-link to="/passWordLogin" class="passWord">密码登录</router-link>
                    </p>-->
                  </div>
                  <div class="immediately-login">
                    <el-button
                      class="btn"
                      type="primary"
                      @click="login"
                      :loading="submitLoading"
                    >立即登录</el-button>
                  </div>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import { phone } from "@/const/formValidate.js";
//tab切换的数据
const LOGIN_WAY = {
  password: "0",
  verifyCodeForm: "1"
};
const TIME_COUNT = 60;
export default {
  name: "Login",
  data() {
    return {
      //密码登录
      passwordForm: {
        username: "",
        password: ""
      },
      //密码登录的验证提示
      passwordFormRules: {
        username: [
          { required: true, message: "请输入用户名/手机号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      //验证码登录
      verifyCodeForm: {
        username: "",
        password: ""
      },
      //验证码登录的验证提示
      verifyCodeFormRules: {
        username: phone(),
        password: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            pattern: /^[0-9]{6}$/,
            message: "请输入6位数字验证码",
            trigger: "blur"
          }
        ]
      },
      submitLoading: false, // 登录按钮的loading
      activeName: "passwordForm", //默认的tab切换的显示页
      loginWay: 0, //请求的状态
      sendCodeTitle: "获取验证码",
      count: "", //验证码的过去大于0小于60可获取到验证码
      sendCodeDiabled: false, //发送验证码
      codeLoading: false //验证码的Loading
    };
  },
  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    goRegister() {
      this.$router.push({
        path: "/Register"
        // query: {
        //   loginWay: this.loginWay
        // }
      });
    },
    login() {
      let formType = "passwordForm";
      if (this.loginWay === "1") {
        formType = "verifyCodeForm";
      }
      console.log(this.$refs);
      this.$refs[formType].validate(valid => {
        if (valid) {
          this.submitLoading = true;
        }
      });
    },
    //发送验证码
    sendCode() {
      if (!/^1[345678]\d{9}$/.test(this.verifyCodeForm.username)) {
        return;
      }
      this.codeLoading = true;
      this.$axios({
        method: "get"
        // url: sendCodeRemoveDoc,
        // params: {
        //   phone: this.verifyCodeForm.username,
        //   prefix: 'loginVerificationcode'
        // }
      })
        .then(data => {
          if (data.data.code === "0") {
            this.messageBox("验证码发送成功！", "success");
          }
        })
        .finally(() => {
          this.codeLoading = false;
          this.countDown();
        });
    },
    //获取验证码的倒计时
    countDown() {
      if (this.sendCodeDiabled) return;
      this.sendCodeDiabled = true;
      this.count = TIME_COUNT;
      let timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--;
          this.sendCodeTitle = `${this.count}秒后重新获取`;
        } else {
          this.sendCodeTitle = "重新获取";
          this.timer = null;
          this.sendCodeDiabled = false;
          clearInterval(timer);
        }
      }, 1000);
    },
    handleClick() {
      this.loginWay = LOGIN_WAY[this.activeName];
      this.$refs[this.activeName].resetFields();
    }
  }
};
</script>
<style lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-container {
    width: 600px;
    border: 1px solid #cccccc;
    .container {
      width: 100%;
      height: 100%;
      .main {
        .login-title {
          margin-bottom: 10px;
          font-size: 24px;
          font-weight: 500;
        }
        .login-tab {
          .el-tabs__nav-wrap {
            &::after {
              height: 0;
            }
          }

          .el-tabs__active-bar {
            width: 20px !important;
          }
        }
        .passWord-login {
          margin-left: 65px;
          display: flex;
          justify-content: space-between;
          .register {
            text-decoration: none;
            color: #cccccc;
          }
        }
        .pass-login {
          margin-top: 40px;
        }
        .verification {
          width: 500px;
        }
        .verification-num {
          display: flex;
        }
        .immediately-login {
          text-align: center;
          margin: 40px 0 0 65px;
        }
        .btn {
          width: 100%;
        }
        .register-passWord {
          margin-left: 65px;
          display: flex;
          justify-content: space-between;
          p {
            color: #cccccc;
          }
        }
        .registers,
        .passWord {
          text-decoration: none;
          color: #cccccc;
        }
      }
    }
  }
}
</style>