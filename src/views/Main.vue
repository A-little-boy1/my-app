<template>
  <div>
    <el-container>
        <el-aside width="auto">
            <common-aside></common-aside>
        </el-aside>
        <el-container>
          <el-header>
            <CommonHeader>header</CommonHeader>
          </el-header>
          <div>
            <CommonTag></CommonTag>
          </div>
          <el-main>
            <!--内容位置 -->
              <router-view></router-view>
          </el-main>
        </el-container>
    </el-container>
  </div>
</template>
<script>
import CommonTag from '../components/CommonTag'
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
export default {
  name:'my-Main',
  components: { CommonAside, CommonHeader, CommonTag }
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
.el-menu {
  border-right: none;
}
</style>>
