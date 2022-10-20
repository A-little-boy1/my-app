<template>
  <div class="header-container">
    <div class="l-content">
        <el-button @click="isShowTab()" icon="el-icon-menu" size="mini"></el-button>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="tag in tags" :key="tag.path" :to="{ path:tag.path }">{{tag.label}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown @command="handleClick">
            <span class="el-dropdown-link">
                <img class="userAvator" src="../assets/images/user.png" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item command="cancel">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import {mapState} from 'vuex'
export default {
  name:'my-Header',
  methods:{
        isShowTab() {
            this.$store.commit('collapseMenu')
        },
        handleClick(command) {
           if(command=== 'cancel'){
            console.log('1');
            Cookie.remove('token')
            Cookie.remove('menu')
            this.$router.push('/login',()=>{},()=>{})
           }
           
        }
    },
    computed: {
        ...mapState({
           tags: state=>state.tab.tabsLsit  
        })
    },
    mounted (){
       
    }
}

</script>

<style lang="less" scoped>

.header-container{
    padding:0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text{
        color: #fff;
        font-size: 14px;
        margin-left: 20px;
    }
    .userAvator{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
.l-content {
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item {
        .el-breadcrumb__inner {
            font-weight: normal;
            &.is-link {
                color: #666
            }
        }
        &:last-child {
            .el-breadcrumb__inner {
                color: #fff
            }
        }
    }
}
</style>