<template>
  <div class="login-wrap">
    <el-form
    label-position="top"
    label-width="80px"
    class="login-form"
    :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button class="login-btn" type="primary" @click.prevent="handleLogin()">登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {

    async handleLogin () {
      const res = await this.$http.post('login', this.formdata)
      console.log(res)
      // const {data, meta} = res.data
      // console.log(data)
      // console.log(meta.msg)
      // console.log(meta.status)
      // 双重解构
      const {data, meta: {msg, status}} = res.data
      console.log(data)
      if (status === 200) {
        // 保存token
        localStorage.setItem('token', data.token)
        this.$router.push({name: 'home'})
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>
<style lang="less">
.login-wrap{
  height: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
  background:#324152;
  .login-form{
    width: 400px;
    background: #fff;
    border-radius:5px;
    padding:30px;
  }
  .login-btn{
    width: 100%;
  }
}
</style>
