//手机号的校验
export const phone = (required = true, trigger = 'blur') => {
  return [{
    required: required,
    message: '请输入手机号码',
    trigger: trigger
  }, { validator: function (rule, value, callback) {
    if (!/^1[345678]\d{9}$/.test(value)) {
      callback(new Error('请输入正确的手机号'))
    } else {
      callback()
    }
  },
  trigger: 'blur'
  }]
}
//邮箱的校验
export const email = (required = true, trigger = 'blur') => {
  return [
    { required: required, message: '请输入邮箱地址', trigger: trigger },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change']
    }
  ]
}
//用户名的校验
export const username = (required = true, trigger = 'blur') => {
  return [{
    required: required,
    message: '请输入用户名',
    trigger: trigger
  }, {
    min: 2,
    max: 16,
    message: '长度在 2 到 16 个字符'
  }, {
    pattern: /^[0-9a-zA-Z]{2,16}|[\u4E00-\u9FA5]+$/,
    message: '只能输入2-16个字母、数字或中文'
  }]
}

// 姓名的校验
export const realName = (required = true, trigger = 'blur') => {
  return [
    {
      required: required,
      message: '请输入姓名',
      trigger: trigger
    }, {
      min: 2,
      max: 16,
      message: '长度在 2 到 16 个字符'
    }, {
      pattern: /^[\u4E00-\u9FA5]+$/,
      message: '姓名只能为中文'
    }
  ]
}
//密码的校验
export const password = () => {
  return [{
    min: 6,
    max: 16,
    message: '长度在 6 到 16 个字符'
  }, {
    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
    message: '密码为6-16位数字字母组合'
  }]
}
//验证码的校验
export const verificationCode = (required = true, trigger = 'blur') => {
  return [{
    required: required,
    message: '验证码',
    trigger: trigger
  }, {
    min: 6,
    max: 6,
    message: '请输入6位验证码'
  }, {
    pattern: /^[0-9]{6}$/,
    message: '只能输入数字'
  }]
}
