<template>
  <div>
    <el-form label-width="70px" :model="form" ref="form" :inline="true" :rules="rules" class="login_container">
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
    </el-form-item>
    </el-form>

  </div>
</template>

<script>
import Cookie from 'js-cookie'
import  {getMenu} from '../api'
export default {
  name: "my-Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
        // 将token信息存入
        this.$refs.form.validate(valid=>{
            if(valid){
                getMenu(this.form).then(({data})=> {
                    if(data.code === 20000){
                        console.log(data);
                        Cookie.set('token', data.data.token)
                        // 获取菜单数据  存入到store
                        this.$store.commit('setMenu',data.data.menu)
                        // 动态注册路由
                        this.$store.commit('addMenu',this.$router)
                        this.$router.push('/home')
                    }else{
                        this.$message.error(data.data.message);
                    }
                })
            }
        })
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
    width: 350px;
    padding: 35px 35px 15px 35px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    text-align: center;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .el-input{
        width: 198px;
    }

}
</style>>
