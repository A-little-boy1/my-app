import Mock from "mockjs";
import homeApi from '../api/mockServeData/home'
import user from '../api/mockServeData/user'
import permission from '../api/mockServeData/permission'
Mock.mock('/api/home/getDate',homeApi. getStatisticalData)  


// 用户列表数据
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/del', 'post',user.deleteUser)
Mock.mock(/api\/user\/getUser/, user.getUserList)
Mock.mock(/api\/permission\/getMenu/, 'post', permission.getMenu)


