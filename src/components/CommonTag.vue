<template>
  <div class="tag">
    <el-tag
    class="el-tag"
    size="mini"
    v-for=" (item,index) in tags"
    :key="item.label"
    :closable="item.name !=='home' ? true:false"
    @click='changeMenu(item)'
    @close="handleClose(item,index)"
    :effect="$route.name ===item.name ? 'dark':'plain'">
    {{ item.label }}
  </el-tag>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
    name:'CommonTag',
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsLsit
        })

    },
    methods:{
        ...mapMutations(['closeTag']),
        changeMenu(item){
            this.$router.push({name:item.name})
        },
        handleClose(item,index){
            this.closeTag(item,index)
            const i = this.tags.length - 1
            this.$router.push({
                name:this.tags[i].name
            })
        }
    },
    mounted() {
        console.log(this.tags);
    }

}
</script>

<style lang="less" scoped>

.tag {
    padding: 20px;
    .el-tag{
        margin-left: 5px;
        cursor: pointer;
    }
}


</style>