<template>
  <div class="passWord-login">
    <div class="passWord-container">
      <el-container class="container">
        <el-main>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="55px">
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model.number="ruleForm.phone"
                auto-complete="on"
                prefix-icon="el-icon-service"
                placeholder="请输入手机号"
              />
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
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
                <el-button @click="takeVerifica()">获取验证码</el-button>
              </el-form-item>
            </div>
            <div class="register-login">
              <p>
                <router-link to="/Register" class="register">注册账户</router-link>
              </p>
              <p>
                <router-link to="/" class="passWord">手机登录</router-link>
              </p>
            </div>
            <div class="immediately-login">
              <el-button class="btn" type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
            </div>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  name:'passWordLogin',
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
        return callback(new Error("验证码不能为空"));
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
      ruleForm: {
        phone: "", //手机号
        verification: "", //验证码
        passWord: "" //密码
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "click" }],
        verification: [{ validator: verification, trigger: "click" }]
      }
    };
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
    takeVerifica() {}
  }
};
</script>
<style  lang="less">
.passWord-login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .passWord-container {
    width: 600px;
    border: 1px solid #cccccc;
    .container {
      width: 100%;
      height: 100%;
      .verification {
        width: 500px;
      }
      .verification-num {
        display: flex;
      }
      .immediately-login {
        text-align: center;
        margin: 40px 0 0 55px;
      }
      .btn {
        width: 100%;
      }
      .register-login {
        margin-left: 55px;
        display: flex;
        justify-content: space-between;
        .register,
        .passWord {
          text-decoration: none;
          color: #cccccc;
        }
      }
    }
  }
}
</style>