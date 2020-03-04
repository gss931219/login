import cookie from 'js-cookie'
import cookieKeys from '@/const/cookie-keys'
const cookiePath = process.env.COOKIE_PATH
// 最好提前在你的 store 中初始化好所有所需属性
export const state = () => ({
    // 这两个用于client side的使用, 又放cookie里是为了刷新时状态不丢失
    userId: '',
    token: '',
    tenantId: '',
    username: '', // 用户名
    companyId: '', // 公司ID
    companyName: '', // 公司名称
    companyType: '', // 企业类型
    authenticateFlag: '', // 关联企业认证标识，true-已认证，false-未认证
    roleType: '0', // 默认是经营企业
    desc: 'roleType:0-企业,1-医疗，-1-系统管理员',
    meta: {},
    user: {},
    menuList: [],
    activeIndex: 0, // 顶部一级菜单, 面包屑还需要，所以提到全局，并不能在menuList加路由层级，因为，nuxt已经生成路由
    activeNameArr: [], // 路由守卫根据id计算出来的地址，用于面包屑
    layoutHandle: {}, // 面包屑右侧的方法回调
    btnRoleArr: [], // 记录该用户所有的权限按钮
    permission: {}
  })
  // Action 提交的是 mutation，而不是直接变更状态
// Action 可以包含任意异步操作
export const actions = {
    async login (context, payload) {
      // store 对象
      let { commit, state, dispatch } = context
  
      let resp = await this.$axios.$post(
        loginUrl,
        payload
      )
  
      const userDetail = { ...resp.payload }
      commit('login', userDetail)
  
      dispatch('fetchUserAndMenuList')
    },
    // 存储权限按钮集合,记录该成员拥有的按钮级权限
    pushRoleArr ({ commit }, str) {
      commit('pushRoleArr', str)
    },
    async fetchUserAndMenuList ({ dispatch, commit, state }) {
      // let user = await this.$axios.$get(
      //   `/deepexi-permission/api/v1/users/currentUser`
      // )
  
      // commit('update', { user: user.payload || {} })
      let menuResources = await this.$axios.$get(getResourceTree, {
        params: {
          userId: state.userId
        }
      })
  
      // 给获取到的菜单进行id赋值
      // 赋key，val用于反向选中菜单
      // let list = []
      // if (menuResources.payload) {
      //   // 如果是超级管理员，则不需要剪切，非超级管理员剪切
      //   if (state.roleType === '-1') {
      //     list = menuResources.payload
      //   } else {
      //     list = menuResources.payload.length ? (menuResources.payload[0].children ? menuResources.payload[0].children : []) : []
      //   }
      // }
      let list = menuResources.payload ? menuResources.payload : []
      function iterator (list = [], id = '', supParentIndex) {
        list.forEach((item, index) => {
          item.idKey = !id ? id + index : id + '-' + index
          item.supParentIndex = supParentIndex || index + ''
          if (item.children && item.children.length) {
            iterator(item.children, item.idKey, item.supParentIndex)
          }
        })
      }
      iterator(list)
  
      commit('update', {
        menuList: list
      })
    },
    // 配置的元信息
    async fetchMetaInfo ({ commit }) {
      let resp = await this.$axios.$get('/deepexi-permission/api/v1/configs')
      let meta = {}
      resp.payload.forEach(item => {
        meta[item.key] = item.value
      })
      commit('update', { meta })
    }
  }