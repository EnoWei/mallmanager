<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <!-- /首页/用户管理/用户列表 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          placeholder="请输入内容"
          clearable
          @click.prevent="loadUserList()"
          v-model="query"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click.prevent="searchUser()"></el-button>
        </el-input>
        <el-button type="success" @click.prevent="showAddUserDia()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column type="index" prop="id" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <!--userlist为data()里的对象 userlist.row数组中的每个对象 -->
        <template slot-scope="userlist">{{userlist.row.create_time | fmtdate}}</template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeMgstate(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            @click.prevent="showEditUserDia(scope.row)"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            circle
            @click="showDeleUserMsgBox(scope.row.id)"
            icon="el-icon-delete"
          ></el-button>
          <el-button size="mini" plain type="success"
          icon="el-icon-check" @click.prevent="showSetUserRoleDia(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click.prevent="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑信息对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click.prevent="editUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
              {{currUsername}}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
            {{currRoleId}}
          <el-select v-model="currRoleId" placeholder="请选择活动区域">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="item.roleName" :value="item.id"
            v-for="(item,i) in roles" :key="i"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      // username: (...)
      // email: (...)
      // mobile: (...)
      // create_time: (...)
      // mg_state: (...)
      // id: (...)
      // role_name: (...)
      userlist: [],
      total: 0,
      // 添加对话框属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRol: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      currRoleId: 0,
      currUsername: '',
      roles: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    //   分配角色 - 发送请求
    async setRole () {
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.currRoleId
      })
      console.log(res)
      // 关闭对话框
      this.dialogFormVisibleRol = false
    },
    // 分配角色 - 打开
    async showSetUserRoleDia (user) {
      // 给currUserId赋值
      this.currUserId = user.id
      this.currUsername = user.username
      // 获取所有的角色
      const res1 = await this.$http.get(`roles`)
      console.log(res1)
      this.roles = res1.data.data

      // 获取当前用户名的角色id
      const res = await this.$http.get(`users/${user.id}`)
      console.log(res)
      this.currRoleId = res.data.data.rid
      this.dialogFormVisibleRol = true
    },
    // 修改状态
    async changeMgstate (user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      )
      console.log(res)
    },
    //   编辑用户 - 发送请求
    async editUser () {
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      console.log(res)
      // 1.关闭对话框
      this.dialogFormVisibleEdit = false
      // 2.更新视图
      this.getUserList()
    },
    // 编辑用户 - 显示对话框
    showEditUserDia (user) {
      console.log(user)
      this.form = user
      // 获取用户数据
      this.dialogFormVisibleEdit = true
    },
    // 删除
    showDeleUserMsgBox (userId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(async () => {
          // 发送删除的请求
          const res = await this.$http.delete(`users/${userId}`)
          console.log(res)
          if (res.data.meta.status === 200) {
            // 更新视图
            this.getUserList()
            // 提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 添加用户 - 发送请求
    async addUser () {
      // 2.关闭对话框
      this.dialogFormVisibleAdd = false
      const res = await this.$http.post(`users`, this.form)
      const {
        meta: { status, msg },
        data
      } = res.data
      console.log(data)
      if (status === 201) {
        console.log(888888)
        // 1.提示成功
        this.$message.success(msg)
        //   3.更新视图
        this.getUserList()
        // 4.清空文本框
        // this.form = {}
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            this.form[key] = ''
          }
        }
      } else {
        this.$message.warning(msg)
      }
    },
    // 添加用户
    showAddUserDia () {
      this.dialogFormVisibleAdd = true
    },
    // 清空搜索框 重新获取数据
    loadUserList () {
      this.getUserList()
    },
    // 搜索用户
    searchUser () {
      this.getUserList()
    },
    handleSizeChange (val) {
      console.log(`每页${val}条`)
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      console.log(`当前页：${val}`)
      this.pagenum = val
      this.getUserList()
    },
    // 获取用户列表的请求
    async getUserList () {
      // query 查询参数 可以为空
      // pagenum 当前页码 不能为空
      // pagesize 每页显示条数  不能为空
      // 需要授权的API，必须在请求头中使用 Authorization 字段提供 token 令牌
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      console.log(this.pagenum)
      console.log(this.pagesize)
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      )
      console.log(res)
      const {
        meta: { status, msg },
        data: { users, total }
      } = res.data
      if (status === 200) {
        //   1.给表格数据赋值
        this.userlist = users
        // 2.给total赋值
        this.total = total
        // 3.提示
        this.$message.success(msg)
      } else {
        // 提示
        this.$message.warning(msg)
      }
    }
  }
}
</script>
<style lang="less">
.box-card {
  height: 100%;
  .searchRow {
    margin-top: 20px;
    .input-with-select {
      width: 300px;
    }
  }
}
</style>
