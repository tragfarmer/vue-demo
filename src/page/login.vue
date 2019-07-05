<template>
  <div class="m-login">
    <div class="m-login-title">后台管理系统</div>
    <div class="m-login-form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <div class="m-login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <div class="m-login-tips">Tips : 用户名和密码随便填。</div>
      </el-form>
    </div>
  </div>
</template>

<script>
import User from '@/common/user.js'
export default {
  data: function () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    submitForm (formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          let userinfo = {
            username: this.ruleForm.username,
            token: 'dfdfdfdfdfdfdfdfdf'
          }
          let menus = [{
            'icon': 'el-icon-document',
            'index': '/readme',
            'title': '自述'
          }, {
            'icon': 'el-icon-document',
            'index': '/test',
            'title': 'Test'
          }, {
            'icon': 'el-icon-menu',
            'index': '1',
            'title': 'Demo',
            'subs': [
              {
                'index': '/demo/permissionTest',
                'title': '权限测式'
              },
              {
                'index': '/demo/shortcutDemo',
                'title': '快捷键指令'
              }
            ]
          },
          {
            'icon': 'el-icon-menu',
            'index': '2',
            'title': 'Plug-in',
            'subs': [
              {
                'index': '/plugin/vuexDemo',
                'title': 'Vuex Demo'
              },
              {
                'index': '/plugin/echartsDemo',
                'title': 'ECharts demo'
              }
            ]
          }]
          let authorityList = [{
            name: 'readme'
          },
          {
            name: 'permissionTest',
            permission: ['edit', 'delete']
          },
          {
            name: 'shortcutDemo'
          },
          {
            name: 'vuexDemo'
          }, {
            name: 'echartsDemo'
          }, {
            name: 'test'
          }]
          User.saveUser(userinfo)
          User.saveMenus(menus)
          User.saveAuthorityList(authorityList)
          self.$router.push('/readme')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.m-login {
  width: 100%;
  height: 100%;
  background: #409eff;
  overflow-y: scroll;
  overflow-x: visible;
}
.m-login-title {
  width: 100%;
  margin-top: 50px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.m-login-form {
  width: 300px;
  position: relative;
  left: 50%;
  margin-left: -165px;
  margin-top: 30px;
  padding: 30px;
  border-radius: 5px;
  background: #fff;
}
.m-login-btn {
  text-align: center;
}
.m-login-btn button {
  width: 100%;
  height: 36px;
}
.m-login-tips {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
</style>
