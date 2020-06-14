<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../../static/image/logo.png" alt="显示图片" />
          </div>
        </el-col>
        <el-col :span="18">
          <h3 class="middle">电商后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a href="javascript:;" class="loginout" @click.prevent="handleSignout()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- //侧边栏 -->
      <el-aside width="200px">
        <el-menu background-color="#545c64" text-color="#fff"
         active-text-color="#ffd04b" :router="true"
         :unique-opened="true">
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="user">
              <i class="el-icon-document"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-document"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-document"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-document"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-document"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-document"></i>
              <span slot="title">数据列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  beforeCreate () {
    const token = localStorage.getItem('token')
    if (!token) {
      // token没有就跳转到登录页面
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    handleSignout () {
      // 1.清除token
      localStorage.clear()
      // 2.提示
      this.$message.success('退出成功')
      // 3.来到login组件
      this.$router.push({name: 'login'})
    }
  }
}
</script>
<style lang="less">
.el-container {
  height: 100%;
  .el-header {
    background: #adbccd;
    .el-row {
      height: 100%;
      .el-col {
        .grid-content{
          height: 100%;
          img {
          height: 100%;
          width: 100%;
        }
        }
        height: 100%;
        .middle {
          text-align: center;
          line-height: 60px;
          color: #fff;
        }
        .loginout {
          line-height: 60px;
          text-decoration: none;
        }
      }
    }
  }
  .el-aside {
    background: #d0dae5;
  }
  .el-main {
    background: #e7edf2;
  }
}
</style>
