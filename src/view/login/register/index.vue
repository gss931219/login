<template>
  <div class="register">
    <div class="register-container">
      <el-container class="container">
        <el-main>
           <p class="register-title">注册账户</p>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="55px">
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model.number="ruleForm.phone"
                auto-complete="on"
                prefix-icon="el-icon-service"
                placeholder="请输入手机号"
              />
            </el-form-item>
            <el-form-item label="验证" prop="verification">
              <el-input
                v-model.number="ruleForm.passWord"
                auto-complete="on"
                prefix-icon="el-icon-service"
                placeholder="请输入密码"
              />
            </el-form-item>
            <div class="verification-num">
              <el-form-item label="验证码" prop="verification" class="verification">
                <el-input
                  v-model.number="ruleForm.verification"
                  auto-complete="on"
                  prefix-icon="el-icon-goods"
                  placeholder="请输入验证码"
                />
              </el-form-item>
              <el-form-item>
                <el-button  :disabled="sendCodeDiabled" :loading="codeLoading"  @click="sendCode">{{ sendCodeTitle }}</el-button>
              </el-form-item>
            </div>
            <div class="register-passWord">
              <p @click="phoneLogin" class="passWord">
                手机登录
                <!-- <router-link to="/phoneLogin" class="passWord"></router-link> -->
              </p>
              <p>
                <router-link to="/" class="register">密码登录</router-link>
              </p>
            </div>
            <div class="agreement"> 
              <!-- 我已阅读并接受《百家在线服务条款》协议 -->
              <el-checkbox  class="check"><router-link to="/Agreement" class="read-agreement">我已阅读并接受《百家在线服务条款》协议</router-link></el-checkbox>
            </div>
            <div class="immediately-register">
              <el-button class="btn" type="primary" @click="submitForm('ruleForm')">注册</el-button>
            </div>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
const TIME_COUNT = 60
export default {
  name:"Register",
  
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var verification = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else {
        const reg = /^[0-9]$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的验证码"));
        }
      }
    };
    return {
      codeLoading: false, // 验证码按钮loading
       // 注册时手机发送验证码携带的前缀
      prefix: 'registerVerificationcode',
      sendCodeTitle: '获取验证码',
      sendCodeDiabled: false,
      ruleForm: {
        phone: "", //手机号
        verification: "", //验证码
        passWord: "", //密码
        bol: true //协议
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "click" }],
        verification: [{ validator: verification, trigger: "click" }]
      },
      count: '',
    };
  },
  mounted() {
    console.log( this.$route.query.activeNames)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    phoneLogin(){
      // var loginWay=this.$route.query.loginWay='1'
      this.$router.push({
        path: "/",
        // query: {
        //   loginWay:loginWay
        // }
      });
    },
    countDown () {
      if (this.sendCodeDiabled) return
      this.sendCodeDiabled = true
      this.count = TIME_COUNT
      let timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--
          this.sendCodeTitle = `${this.count}秒后重新获取`
        } else {
          this.sendCodeTitle = '重新获取'
          this.timer = null
          this.sendCodeDiabled = false
          clearInterval(timer)
        }
      }, 1000)
    },
      sendCode () {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.codeLoading = true
          this.$axios({
            method: 'get',
            url: sendCodeRemoveDoc,
            url: '',
            params: {
              phone: this.ruleForm.phone,
              prefix: this.prefix
            }
          })
            .then(data => {
              if (data.data.code * 1 === 0) {
                this.$message({
                  message: '验证码发送成功！',
                  type: 'success'
                })
                this.countDown()
              }
            })
            .finally(() => {
              this.codeLoading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
};
</script>
<style lang="less">
.register {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .register-container {
    width: 600px;
    border: 1px solid #cccccc;
    .container {
      width: 100%;
      height: 100%;
      .register-title{
        margin-bottom: 20px;
          font-size: 24px;
          font-weight: 500;
      }
      .verification {
        width: 500px;
      }
      .verification-num {
        display: flex;
      }
      .immediately-register {
        text-align: center;
        margin: 40px 0 0 55px;
      }
      .btn {
        width: 100%;
        background: #cccccc;
        border: 1px solid #cccccc;
      }
      .register-passWord {
        margin-left: 55px;
        display: flex;
        justify-content: space-between;

        .register,
        .passWord {
          text-decoration: none;
          color: #cccccc;
        }
      }
      .agreement {
        margin-left: 55px;
        .check {
          color: #666;
        }
        .read-agreement{
          text-decoration: none;
          color: #666;
        }
      }
    }
  }
}
</style>