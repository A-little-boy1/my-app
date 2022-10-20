import Cookie from "js-cookie"
export default {
    state:{
        isCollapse: false,
        tabsLsit:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon: 's-home',
                url:'home/Home'
            }
        ], // 面包屑数据
        menu:[]
    },
    actions: {

    },
    mutations:{
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包靴
        selectMenu(state,value) {
            // 首页不添加
            if(value.name !== 'home'){
                const index =  state.tabsLsit.findIndex(item=>item.name === value.name)
                if(index === -1){
                    state.tabsLsit.push(value)
                }
            }
        },
        //
        closeTag(state,item) {
           const index = state.tabsLsit.findIndex(val=>val.name === item.name)
           state.tabsLsit.splice(index,1)
        },
        // 设置menu数据
        setMenu(state,val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state,router) {
                // 判断缓存中是否有数据
                if(!Cookie.get('menu')) return
                const menu  =  JSON.parse(Cookie.get('menu'))
                state.menu = menu
                // 处理动态路由的数据
                const menuArray = []

                menu.forEach(item => {
                    console.log('@@', item);
                    if(item.children){
                       item.children = item.children.map(item=>{
                            item.component = () => import (`../views/${item.url}`)
                            return item
                        })
                        menuArray.push(...item.children)
                    }else {
                        item.component = () => import (`../views/${item.url}`)
                        menuArray.push(item)
                    }
                });
                //路由动态添加
            
                menuArray.forEach(item => {
                    router.addRoute('Main',item)
                })
                console.log('@@@@',menuArray);
        }
    }
}